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

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://councilroombackend.herokuapp.com:3993/logParser',
      headers: {'Content-Type': 'application/json'},
      data: {'logStr': gameLog}
    }

    let response = await axios(config);
    return response.data;
  }
}
