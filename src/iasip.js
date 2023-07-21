const { runForeverDreaming } = require('./foreverdreaming-adapter')
const scraper = require('./scraper')

const showName = "It's Always Sunny in Philadelphia"
const forumId = '104'

const testIASIP = async (args) => {
    const results = await runForeverDreaming({ forumId, ...args })

    const out = { showName, results }
    scraper.printResults(out)
    return out
}

module.exports = {
    testIASIP,
}
