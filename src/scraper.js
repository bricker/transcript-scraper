const Promise = require('bluebird')
const cheerio = require('cheerio')
const superagent = require('superagent')

const getStatelessMatcher = (query) => {
    return new RegExp(query, 'gi')
}

const getTranscriptUrls = async ({
    transcriptIndexUrl,
    transcriptLinkTextMatcher,
}) => {

    let text
    let transcriptUrls = []

    try {
        const response = await superagent.get(transcriptIndexUrl).retry(2)
        text = response.text
    } catch {
        console.error(`Error downloading document: ${transcriptIndexUrl}`)
        return transcriptUrls
    }

    const $ = cheerio.load(text)

    $('a').each((_, link) => {
        const $link = $(link)
        const href = $link.attr('href')
        const text = $link.text()

        if (transcriptLinkTextMatcher.test(text)) {
            transcriptUrls.push(href)
        }
    })

    return transcriptUrls
}

const defaultProcessor = (text) => {
    return text.replace(/\s+/g, ' ').replace(/\[.+?\]/g, '')
}

const getMatches = async ({ transcriptUrls, query, ...rest}) => {
    const statelessSearchMatcher = getStatelessMatcher(query)

    const results = await Promise.map(transcriptUrls, (transcriptUrl) => {
        return findTextInTranscript({ transcriptUrl, statelessSearchMatcher, ...rest })
    }, { concurrency: 5 })

    return results.flat()
}

const findTextInTranscript = async ({
    transcriptUrl,
    statelessSearchMatcher,
    contextLength = 30,
    documentProcessor = defaultProcessor
}) => {

    let text
    const output = []

    try {
        const response = await superagent.get(transcriptUrl).retry(2)
        text = response.text
    } catch {
        console.error(`Error downloading document: ${transcriptUrl}`)
        return output;
    }

    const contents = documentProcessor(cheerio.load(text).text())

    const statefulMatcher = new RegExp(statelessSearchMatcher)
    let currentMatch
    do {
        currentMatch = statefulMatcher.exec(contents)

        if (currentMatch) {
            const idx = currentMatch.index
            const context = contents.substring(idx - contextLength, idx + contextLength)
            output.push({ transcriptUrl, context })
        }
    } while (currentMatch !== null);

    return output
}

const printResults = ({ results, showName }) => {
    console.log(`Results for ${showName}:`)
    console.table(results)
}

module.exports = {
    getStatelessMatcher,
    getTranscriptUrls,
    defaultProcessor,
    getMatches,
    findTextInTranscript,
    printResults,
}