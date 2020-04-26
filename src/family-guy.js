const { runForeverDreaming } = require('./foreverdreaming-adapter')
const scraper = require('./scraper')

const showName = 'Family Guy'
const forumId = '430'

const testFamilyGuy = async ({ query }) => {
    const results = await runForeverDreaming({ query, forumId })

    const out = { showName, results }
    scraper.printResults(out)
    return out
}

module.exports = {
    testFamilyGuy,
}
