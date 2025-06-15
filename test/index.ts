import { getDataByUrl, searchAddress } from "../src"

async function testGetUrlData() {
  // const url = "https://maps.app.goo.gl/c17dx6XJYHhbS3pq9"
  const url =
    "https://www.google.com/maps/place/Rabbani+Leadies+Tailor/@19.910945,72.994643,17z/data=!4m12!1m5!3m4!2zMTnCsDU0JzM5LjQiTiA3MsKwNTknNDAuNyJF!8m2!3d19.910945!4d72.994643!3m5!1s0x3be73fb138212503:0x8daba1a0f98964b5!8m2!3d19.9126277!4d72.9940646!16s%2Fg%2F11plgb25m0?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D"

  try {
    const urldata = await getDataByUrl(url)
    const searchResult = await searchAddress("rudra")
    console.log("urldata", urldata)
    console.log("searchResult", searchResult)
  } catch (error) {
    console.error("Error:", error)
  }
}

testGetUrlData()
