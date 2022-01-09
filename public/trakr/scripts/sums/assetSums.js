const assetSums = async function assetSums (data) {
    return new Promise(function (resolve, reject) {
        const sums = {
            assets: 0,
            price: { avg: 0, sum: 0, count: 0 },
            rent: { avg: 0, sum: 0, count: 0 },
            yield: { avg: 0, sum: 0, count: 0 },
        }
        const portfolios = []
        for (var d in data) {
            if (portfolios.includes(data[d].base.filename.slice(0, data[d].base.filename.indexOf('portcount')))) {
                continue
            }
            if (data[d].base.portfolio === 1) {
                portfolios.push(data[d].base.filename.slice(0, data[d].base.filename.indexOf('portcount')))
            }
            sums.assets++
            if (data[d].figures.price && data[d].figures.price * 1 > 10000 && data[d].figures.price * 1 < 1000000000) {
                sums.price.sum = sums.price.sum + data[d].figures.price * 1
                sums.price.count++
            }
            if (data[d].figures.rent && data[d].figures.rent * 1 > 100 && data[d].figures.rent * 1 < 1000000000) {
                sums.rent.sum = sums.rent.sum + data[d].figures.rent * 1
                sums.rent.count++
            }
            if (data[d].figures.price && data[d].figures.price * 1 > 10000 && data[d].figures.price * 1 < 1000000000 &&
                data[d].figures.rent && data[d].figures.rent * 1 > 100 && data[d].figures.rent * 1 < 1000000000 &&
                data[d].figures.yield && data[d].figures.yield * 1 > 2 && data[d].figures.yield * 1 < 30) {
                sums.yield.sum = sums.yield.sum + data[d].figures.yield * 1
                sums.yield.count++
            }
        }
        sums.price.avg = sums.price.sum / sums.price.count
        sums.rent.avg = sums.rent.sum / sums.rent.count
        sums.yield.avg = sums.yield.sum / sums.yield.count
        resolve(sums)
    })
}

module.exports.assetSums = assetSums
