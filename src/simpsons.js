const { runForeverDreaming } = require('./foreverdreaming-adapter')
const scraper = require('./scraper')

const showName = 'The Simpsons'
const forumId = '431'

const testSimpsons = async ({ query }) => {
    const results = await runForeverDreaming({ query, forumId })

    const out = { showName, results }
    scraper.printResults(out)
    return out
}

module.exports = {
    testSimpsons,
}
