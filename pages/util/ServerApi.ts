import axios from 'axios'

// const express = require('express')
// const app = express()
// const cors = require('cors')
// const bodyParser = require('body-parser')

// app.use(cors())

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
