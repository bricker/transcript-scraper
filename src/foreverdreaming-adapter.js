const scraper = require('./scraper')

const rootUrl = 'https://transcripts.foreverdreaming.org';
const transcriptIndexUrl = `${rootUrl}/viewforum.php?f=FORUM_ID&start=`
const transcriptLinkTextMatcher = /^\d\dx\d\d/

const cleanPaths = path => `${rootUrl}${path.replace(/^\./, '')}`

const runForeverDreaming = async ({ forumId, ...args }) => {
    let results = []
    let pageLength = 0
    let start = 0

    do {
        const transcriptPaths = await scraper.getTranscriptUrls({
            transcriptIndexUrl: `${transcriptIndexUrl.replace('FORUM_ID', forumId)}${start}`,
            transcriptLinkTextMatcher,
        })

        pageLength = transcriptPaths.length
        start += 25

        const transcriptUrls =  transcriptPaths.map(cleanPaths)
        const pageMatches = await scraper.getMatches({
            transcriptUrls,
            ...args,
        })

        results = results.concat(pageMatches)
    } while (pageLength >= 25)

    return results
}

module.exports = {
    runForeverDreaming,
};
