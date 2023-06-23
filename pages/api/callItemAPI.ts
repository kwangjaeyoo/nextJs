import axios from 'axios'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const apiName = req.body.apiName
    const params = req.body.param
    const sendingParams = {
      authKey: global.userKey,
    }
    const url = global.site + '/MSmartShipItemApi/' + apiName

    const result = await axios({
      method: 'post',
      url: url,

      headers: {
        'Contnet-Type': 'application/json',
        // 'User-Agent': getUserAgent(), TODO
      },
      data: params,
      params: sendingParams,
      timeout: 10000,
    })

    return res.status(result.status).json(result.data)
  } catch (e: any) {
    return res.status(500).json('error ' + JSON.stringify(e))
  }
}
