const calcCrow = require('../geography/calcCrow')

async function groupIntros(intros){
    for (var i in intros) {
        for(var j in intros) {
            let distance = calcCrow.calcCrow(intros[i].coordinates[0], intros[i].coordinates[1], intros[j].coordinates[0], intros[j].coordinates[1])
            let days = Math.abs(datediff(intros[i].dateSent, intros[j].dateSent))
            if(distance < 0.1 && days < 60) {
                intros[j].group = intros[i]._id.toString()
            }
        }
    }
    result = intros.reduce(function (r, a) {
        r[a.group] = r[a.group] || [];
        r[a.group].push(a);
        return r;
    }, Object.create(null));
    return result
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

module.exports.groupIntros = groupIntros