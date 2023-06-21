import axios from 'axios'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    if (req.method === 'POST') {
      const apiName = req.body.apiName
      const params = req.body.param
      const sendingParams = {
        authKey: global.userKey,
      }

      const result = await axios.request<any, any>({
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

      return res.status(result.status).json(result.data)
    } else {
      return res.status(500).json('Not POST')
    }
  } catch (e: any) {
    return res.status(500).json('error ' + JSON.stringify(e))
  }
}
