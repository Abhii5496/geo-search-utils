import { getFullUrl } from "../src"

async function testGetFullUrl() {
  const result = await getFullUrl("https://maps.app.goo.gl/1yHoMqAp4h5a6aae7")
  console.log(result)
}

testGetFullUrl()
