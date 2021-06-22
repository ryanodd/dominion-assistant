import axios, { AxiosRequestConfig } from 'axios'
import sampleResponse from '../sampleResponses/sampleResponse'

export interface logPasteResponsePayload {
  deck1List: string[]
  deck2List: string[]
}

export interface logPasteResponse {
  payload: logPasteResponsePayload
}

export class RequestService {

  static async logPasteRequest(gameLog: string): Promise<logPasteResponse | any> { // This return type is a hack
    console.log
    if (window.location.hostname === 'localhost'){
      return sampleResponse
    } else {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: 'https://1qyb0hokg3.execute-api.us-east-2.amazonaws.com/dominionLogAnalyzer',
        headers: {'Content-Type': 'application/json'},
        data: {'logStr': gameLog}
      }
      const response = await axios(config)
      return response.data
    }
  }
}
