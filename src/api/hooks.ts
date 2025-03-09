import ky, { KyRequest, KyResponse, NormalizedOptions } from "ky";

export const api = ky.create({
  prefixUrl:'',
  headers:{
    'Content-Type':'Application/json'
  },
  hooks:{
    beforeRequest:[()=>{}],
    afterResponse:[(request: KyRequest, options: NormalizedOptions, response: KyResponse)=>{}]
  }
})