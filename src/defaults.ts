import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers//headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'applocation/json, text/plain, */*'
    }
  },

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWidthData = ['post', 'put', 'patch']

methodsWidthData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
