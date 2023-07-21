const scraper = require('./scraper')

const showName = 'Futurama'
const rootUrl = 'https://theinfosphere.org';
const transcriptIndexUrl = `${rootUrl}/Episode_Transcript_Listing`
const transcriptLinkTextMatcher = /^Transcript:/

const testFuturama = async (args) => {
    const transcriptPaths = await scraper.getTranscriptUrls({ transcriptIndexUrl, transcriptLinkTextMatcher })
    const transcriptUrls =  transcriptPaths.map(path => `${rootUrl}${path}`)
    const results = await scraper.getMatches({ transcriptUrls, ...args })

    const out = { showName, results }
    scraper.printResults(out)
    return out
}

module.exports = {
    testFuturama,
}
