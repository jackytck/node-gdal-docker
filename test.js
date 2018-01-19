const request = require('supertest')
const app = require('./app')

describe('Test /version', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/version')
    expect(response.statusCode).toBe(200)
  })
})

describe('Test /4429', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/4429')
    expect(response.statusCode).toBe(200)
    const { code, name, proj4, error } = response.body
    expect(code).toBe(4429)
    expect(name).toBe('NAD83 / BLM 9N (ftUS)')
    expect(proj4).toBe('PROJCS["NAD83 / BLM 9N (ftUS)",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",-129],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",1640416.67],PARAMETER["false_northing",0],UNIT["US survey foot",0.3048006096012192,AUTHORITY["EPSG","9003"]],AXIS["X",EAST],AXIS["Y",NORTH],AUTHORITY["EPSG","4429"]]')
		expect(error).toBe(undefined)
  })
})
