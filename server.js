const express = require('express')
const bodyParser = require('body-parser')
const gdal = require('gdal')
const pjson = require('./package.json')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// App
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(`node-gdal-docker v${pjson.version}`)
})

// curl -H "Content-Type: application/json" -d '{"query":[1,2,3,4,5]}' 127.0.0.1:8080
app.post('/', (req, res) => {

  // Convert EPSG to SRS
  const ret = req.body.query.map(q => {
    try {
      const SRS = gdal.SpatialReference.fromEPSG(Number(q))
      const error = SRS.validate()
      if (error) {
        return ({ error })
      } else {
        return ({
          code: q,
          name: `${SRS.getAttrValue('PROJCS') || SRS.getAttrValue('GEOGCS')}`,
          proj4: SRS.toWKT()
        })
      }
    } catch (e) {
      return ({ error: e.message })
    }
  })

  res.json(ret)
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
