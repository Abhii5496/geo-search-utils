import { getUrlData } from "../src"

async function testGetUrlData() {
  const result = await getUrlData("https://maps.app.goo.gl/1yHoMqAp4h5a6aae7")
  console.log(result)
}

testGetUrlData()
