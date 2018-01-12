const express = require('express')
const bodyParser = require('body-parser')
const gdal = require('gdal')
const pjson = require('./package.json')

// App
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/version', (req, res) => {
  res.send(`node-gdal-docker v${pjson.version}`)
})

// Convert EPSG GCS or PCS code to name and WKT format.
const convert = input => {
  const code = Number(input)
  try {
    const ref = gdal.SpatialReference.fromEPSG(code)
    const name = ref.getAttrValue('PROJCS') || ref.getAttrValue('GEOCCS') || ref.getAttrValue('GEOGCS')
    const proj4 = ref.toWKT()
    return {
      code,
      name,
      proj4
    }
  } catch (error) {
    return {
      code,
      error: error.message
    }
  }
}

// curl 127.0.0.1:8080/4479 | jq
app.get('/:code', (req, res) => {
  return res.json(convert(req.params.code))
})

// curl -H "Content-Type: application/json" -d '{"query":4479}' 127.0.0.1:8080 | jq
app.post('/', (req, res) => {
  return res.json(convert(req.body.data))
})

module.exports = app
