import axios, { AxiosRequestConfig } from 'axios'

export interface logPasteResponsePayload {
  deck1List: string[]
  deck2List: string[]
};

export interface logPasteResponse {
  payload: logPasteResponsePayload
}

export class RequestService {

  static async logPasteRequest(gameLog: string): Promise<logPasteResponse | any> { // This return type is a hack
    console.log(process.env)
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://1qyb0hokg3.execute-api.us-east-2.amazonaws.com/dominionLogAnalyzer',
      headers: {'Content-Type': 'application/json'},
      data: {'logStr': gameLog}
    }

    let response = await axios(config);
    return response.data;
  }
}
