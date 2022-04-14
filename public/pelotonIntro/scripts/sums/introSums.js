const { netinitialyield } = require('../../../trakr/scripts/calculations/niy')

const introSums = async function introSums (data) {
    return new Promise(function (resolve, reject) {
        const sums = {
            intros: data.length,
            price: { avg: 0, sum: 0, count: 0 },
            rent: { avg: 0, sum: 0, count: 0 },
            yield: { avg: 0, sum: 0, count: 0 },
        }
        const portfolios = []
        for (var d in data) {
            if (data[d].asset.price && data[d].asset.price * 1 > 10000 && data[d].asset.price * 1 < 1000000000) {
                sums.price.sum = sums.price.sum + data[d].asset.price * 1
                sums.price.count++
            }
            if (data[d].asset.rent && data[d].asset.rent * 1 > 100 && data[d].asset.rent * 1 < 20000000) {
                sums.rent.sum = sums.rent.sum + data[d].asset.rent * 1
                sums.rent.count++
            }
            if (data[d].asset.price && data[d].asset.price * 1 > 10000 && data[d].asset.price * 1 < 1000000000 &&
                data[d].asset.rent && data[d].asset.rent * 1 > 100 && data[d].asset.rent * 1 < 1000000000 &&
                data[d].asset.yield && data[d].asset.yield * 1 > 2 && data[d].asset.yield * 1 < 30) {
                sums.yield.sum = sums.yield.sum + data[d].asset.yield * 1
                sums.yield.count++
            }
        }
        let sectors = {}
        let pots = {}
        let agencies = {}
        for (var d in data) {
            if (data[d].asset.sectors) {
                for (var s in data[d].asset.sectors) {
                    if (isEmpty(sectors) || !sectors[data[d].asset.sectors[s]] || !sectors[data[d].asset.sectors[s]].total) {
                        sectors[data[d].asset.sectors[s]] = { total: 1 }
                        if (data[d].asset.price) {
                            sectors[data[d].asset.sectors[s]].value = (data[d].asset.price * 1)
                        } else {
                            sectors[data[d].asset.sectors[s]].value = [0, 0]
                        }
                        if (data[d].asset.price && data[d].asset.price * 1 > 10000 && data[d].asset.price * 1 < 1000000000 &&
                            data[d].asset.rent && data[d].asset.rent * 1 > 100 && data[d].asset.rent * 1 < 1000000000) {
                            sectors[data[d].asset.sectors[s]].yield = [data[d].asset.rent * 1, data[d].asset.price * 1]
                        } else {
                            sectors[data[d].asset.sectors[s]].yield = [0, 0]
                        }
                    } else {
                        sectors[data[d].asset.sectors[s]].total = sectors[data[d].asset.sectors[s]].total + 1
                        if (data[d].asset.price) {
                            sectors[data[d].asset.sectors[s]].value = (sectors[data[d].asset.sectors[s]].value * 1) + (data[d].asset.price * 1)
                        }
                        if (data[d].asset.price && data[d].asset.price * 1 > 10000 && data[d].asset.price * 1 < 1000000000 &&
                            data[d].asset.rent && data[d].asset.rent * 1 > 100 && data[d].asset.rent * 1 < 1000000000 &&
                            sectors[data[d].asset.sectors[s]].yield) {
                                sectors[data[d].asset.sectors[s]].yield = [sectors[data[d].asset.sectors[s]].yield[0] + (data[d].asset.rent * 1), sectors[data[d].asset.sectors[s]].yield[1] + (data[d].asset.price * 1)]
                            }
                    }
                }
            }
            if (data[d].asset.pots) {
                for (var s in data[d].asset.pots) {
                    if (isEmpty(pots) || !pots[data[d].asset.pots[s]] || !pots[data[d].asset.pots[s]].total) {
                        pots[data[d].asset.pots[s]] = { total: 1 }
                        if (data[d].asset.price) {
                            pots[data[d].asset.pots[s]].value = (data[d].asset.price * 1)
                        } else {
                            pots[data[d].asset.pots[s]].value = [0, 0]
                        }
                        if (data[d].asset.price && data[d].asset.price * 1 > 10000 && data[d].asset.price * 1 < 1000000000 &&
                            data[d].asset.rent && data[d].asset.rent * 1 > 100 && data[d].asset.rent * 1 < 1000000000) {
                                pots[data[d].asset.pots[s]].yield = [data[d].asset.rent * 1, data[d].asset.price * 1]
                        } else {
                            pots[data[d].asset.pots[s]].yield = [0, 0]
                        }
                    } else {
                        pots[data[d].asset.pots[s]].total = pots[data[d].asset.pots[s]].total + 1
                        if (data[d].asset.price) {
                            pots[data[d].asset.pots[s]].value = (pots[data[d].asset.pots[s]].value * 1) + (data[d].asset.price * 1)
                        }
                        if (data[d].asset.price && data[d].asset.price * 1 > 10000 && data[d].asset.price * 1 < 1000000000 &&
                            data[d].asset.rent && data[d].asset.rent * 1 > 100 && data[d].asset.rent * 1 < 1000000000 &&
                            pots[data[d].asset.pots[s]].yield) {
                                pots[data[d].asset.pots[s]].yield = [pots[data[d].asset.pots[s]].yield[0] + (data[d].asset.rent * 1), pots[data[d].asset.pots[s]].yield[1] + (data[d].asset.price * 1)]
                            }
                    }
                }
            }
            if (data[d].intros[0]) {
                for (var i in data[d].intros) {
                    if (data[d].intros[i].agencies && data[d].intros[i].agencies[0]) {
                        for (var s in data[d].intros[i].agencies) {
                            if (isEmpty(agencies) || !agencies[data[d].intros[i].agencies[s]] || !agencies[data[d].intros[i].agencies[s]].total) {
                                agencies[data[d].intros[i].agencies[s]] = { total: 1 }
                                if (data[d].asset.price) {
                                    agencies[data[d].intros[i].agencies[s]].value = (data[d].asset.price * 1)
                                } else {
                                    agencies[data[d].intros[i].agencies].value = [0, 0]
                                }
                                if (data[d].asset.price && data[d].asset.price * 1 > 10000 && data[d].asset.price * 1 < 1000000000 &&
                                    data[d].asset.rent && data[d].asset.rent * 1 > 100 && data[d].asset.rent * 1 < 1000000000) {
                                        agencies[data[d].intros[i].agencies[s]].yield = [data[d].asset.rent * 1, data[d].asset.price * 1]
                                } else {
                                    agencies[data[d].intros[i].agencies[s]].yield = [0, 0]
                                }
                            } else {
                                agencies[data[d].intros[i].agencies[s]].total = agencies[data[d].intros[i].agencies[s]].total + 1
                                if (data[d].asset.price) {
                                    agencies[data[d].intros[i].agencies[s]].value = (agencies[data[d].intros[i].agencies[s]].value * 1) + (data[d].asset.price * 1)
                                }
                                if (data[d].asset.price && data[d].asset.price * 1 > 10000 && data[d].asset.price * 1 < 1000000000 &&
                                    data[d].asset.rent && data[d].asset.rent * 1 > 100 && data[d].asset.rent * 1 < 1000000000 &&
                                    agencies[data[d].intros[i].agencies[s]].yield) {
                                        agencies[data[d].intros[i].agencies[s]].yield = [agencies[data[d].intros[i].agencies[s]].yield[0] + (data[d].asset.rent * 1), agencies[data[d].intros[i].agencies[s]].yield[1] + (data[d].asset.price * 1)]
                                    }
                            }
                        }
                    }
                }
            }
        }
        let sectorsTotal = { total: 0, value: 0}
        for (var i in sectors) {
            sectorsTotal.total = sectorsTotal.total + sectors[i].total
            sectorsTotal.value = sectorsTotal.value + sectors[i].value
            if( sectors[i].yield && sectors[i].yield[0] && sectors[i].yield[0] > 0 && sectors[i].yield && sectors[i].yield[1] && sectors[i].yield[1] > 0 ) {
                sectors[i].yield = (netinitialyield({ rent: sectors[i].yield[0], price: sectors[i].yield[1] })).result.yield
            } else {
                sectors[i].yield = 0
            }
        }
        sectors.total = sectorsTotal
        let potsTotal = { total: 0, value: 0}
        for (var i in pots) {
            potsTotal.total = potsTotal.total + pots[i].total
            potsTotal.value = potsTotal.value + pots[i].value
            if( pots[i].yield && pots[i].yield[0] && pots[i].yield[0] > 0 && pots[i].yield && pots[i].yield[1] && pots[i].yield[1] > 0 ) {
                pots[i].yield = (netinitialyield({ rent: pots[i].yield[0], price: pots[i].yield[1] })).result.yield
            } else {
                pots[i].yield = 0
            }
        }
        pots.total = potsTotal
        let agenciesTotal = { total: 0, value: 0}
        for (var i in agencies) {
            agenciesTotal.total = agenciesTotal.total + agencies[i].total
            agenciesTotal.value = agenciesTotal.value + agencies[i].value
            if( agencies[i].yield && agencies[i].yield[0] && agencies[i].yield[0] > 0 && agencies[i].yield && agencies[i].yield[1] && agencies[i].yield[1] > 0 ) {
                agencies[i].yield = (netinitialyield({ rent: agencies[i].yield[0], price: agencies[i].yield[1] })).result.yield
            } else {
                agencies[i].yield = 0
            }
        }
        agencies.total = agenciesTotal
        sums.sectorSums = sectors
        sums.potsSums = pots
        sums.agenciesSums = agencies
        sums.price.avg = sums.price.sum / sums.price.count
        sums.rent.avg = sums.rent.sum / sums.rent.count
        sums.yield.avg = sums.yield.sum / sums.yield.count
        resolve(sums)
    })
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports.introSums = introSums
