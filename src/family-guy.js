const { runForeverDreaming } = require('./foreverdreaming-adapter')
const scraper = require('./scraper')

const showName = 'Family Guy'
const forumId = '430'

const testFamilyGuy = async (args) => {
    const results = await runForeverDreaming({ forumId, ...args })

    const out = { showName, results }
    scraper.printResults(out)
    return out
}

module.exports = {
    testFamilyGuy,
}
