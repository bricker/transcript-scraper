const { testFuturama } = require('./src/futurama')
const { testSimpsons } = require('./src/simpsons')
const { testFamilyGuy } = require('./src/family-guy')

const main = async ({ query }) => {
    console.log()

    const results = await Promise.all([
        // testFuturama({ query }),
        // testSimpsons({ query }),
        testFamilyGuy({ query }),
    ]);

    console.log()
    console.log(`OK, I'm done searching.`)

    if (!results.some(r => r.results.length > 0)) {
        console.log(`I couldn't find any matching transcripts. Try a different query.`)
        return
    }

    results.forEach((r) => {
        const len = r.results.length
        console.log(`I found ${len} matching result${len === 1 ? '' : 's'} in ${r.showName} transcripts.`)
    })

}

let query

process.argv.forEach((arg, i, argv) => {
    switch (arg) {
        case '-q':
        case '--query':
            query = argv[i+1]
            break
    }
})

if (!query) {
    console.error('A query is required. Pass it with --query.')
    process.exit(1)
}

console.log(`Your query is: ${query}`)
main({ query })
