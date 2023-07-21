const { runForeverDreaming } = require('./foreverdreaming-adapter')
const scraper = require('./scraper')

const showName = 'The Simpsons'
const forumId = '431'

const testSimpsons = async (args) => {
    const results = await runForeverDreaming({ forumId, ...args })

    const out = { showName, results }
    scraper.printResults(out)
    return out
}

module.exports = {
    testSimpsons,
}
