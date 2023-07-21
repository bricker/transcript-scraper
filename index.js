const { testFuturama } = require('./src/futurama')
const { testSimpsons } = require('./src/simpsons')
const { testFamilyGuy } = require('./src/family-guy')
const { testIASIP } = require('./src/iasip')

const SHOWMAP = {
    iasip: testIASIP,
    'family-guy': testFamilyGuy,
    simpsons: testSimpsons,
    futurama: testFuturama,
}

const main = async (args) => {
    console.log()

    const { show } = args;
    let results
    let shows
    if (show) {
        shows = [SHOWMAP[show]]
    } else {
        shows = SHOWMAP.values
    }

    results = await Promise.all(shows.map(f => f(args)))

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

const args = {
    query: undefined,
    show: undefined,
    caseSensitive: false,
}

process.argv.forEach((arg, i, argv) => {
    switch (arg) {
        case '-q':
        case '--query':
            args.query = argv[i+1]
            break
        case '-s':
        case '--show':
            args.show = argv[i+1]
            break
        case '-c':
        case '--case-sensitive':
            args.caseSensitive = true
            break
    }
})

if (!args.query) {
    console.error('A query is required. Pass it with --query.')
    process.exit(1)
}

console.log(args)
main(args)
