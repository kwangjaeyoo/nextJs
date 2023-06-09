import axios from 'axios'

axios.defaults.withCredentials = true

export async function callMobileSmartShipApi(apiName: string, params: any) {
  try {
    const url =
      global.openApiUrl +
      'GMKT.INC.GLPS.mobileApiService/MobileSmartShipService.qapi/' +
      apiName

    console.log('callMobileSmartShipApi =>' + url)
    const request = await axios({
      method: 'post',
      url: url,

      headers: {
        'Contnet-Type': 'application/json',
        'User-Agent': global.userAgent,
        key: 'QXAPIV1_g_1_j57yq9dc6sylKn_g_2_BNqhnDfEK213xJ7b',
      },

      data: params,
      timeout: 10000,
      withCredentials: true, // 쿠키 cors 통신 설정
    })

    return request
  } catch (error) {
    showLog(apiName, error)
  }
}

export async function callMSmartShipAPI(apiName: string, params: any) {
  let sendingParams: any = {}

  sendingParams.authKey = global.userKey

  console.log(global.site + '/MSmartShipApi/' + apiName)

  try {
    return await axios.request<any, any>({
      method: 'post',
      url: global.site + '/MSmartShipApi/' + apiName,

      headers: {
        'Contnet-Type': 'application/json',
        // 'User-Agent': global.userAgent,
      },
      data: params,
      params: sendingParams,
      timeout: 10000,
      withCredentials: true, // 쿠키 cors 통신 설정
    })
  } catch (error) {
    showLog(apiName, error)
  }
}

const showLog = async (funtionName: string, error: any) => {
  let mode = process.env.NODE_ENV
  let developer = mode === 'development' ? true : false

  if (developer) {
    console.log(funtionName + ' api error !!!!')
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('request')
      console.log(error)
      //   console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
  }
}
