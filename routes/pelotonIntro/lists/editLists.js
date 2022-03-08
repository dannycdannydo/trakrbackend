var express = require('express');
var router = express.Router();
const fs = require('fs');
const _ = require('lodash')
const path = require("path");

router.post('/pelotonIntro/lists/editLists', async function(req, res, next) {
  console.log(req.body)
  if (req.body.add) {
    for (const [key, value] of Object.entries(req.body.add)) {
      if (value[0]) {
        let list = require(`../../../public/pelotonIntro/Objs/${key}.json`)
        let tempList = _.cloneDeep(list)
        for (var i in value) {
          tempList.push({ value: value[i], text: value[i] })
        }
        fs.writeFileSync(path.resolve(__dirname, `../../../public/pelotonIntro/Objs/${key}.json`), JSON.stringify(tempList))
      }
    }
  }
  if (req.body.remove) {
    for (const [key, value] of Object.entries(req.body.remove)) {
      if (value[0]) {
        let list = require(`../../../public/pelotonIntro/Objs/${key}.json`)
        let tempList = _.cloneDeep(list)
        for (var i in list) {
          for (var j in value) {
            if(list[i].value == value[j] || list[i].text == value[j]) {
              tempList.splice(i*1, 1)
            }
          }
        }
        fs.writeFileSync(path.resolve(__dirname, `../../../public/pelotonIntro/Objs/${key}.json`), JSON.stringify(tempList))
      }
    }
  }
  res.send('Success')
})

module.exports = router;