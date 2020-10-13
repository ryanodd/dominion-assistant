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
      url: process.env.REACT_APP_IS_PROD ? 'https://councilroombackend.herokuapp.com/logParser' : 'http://localhost:3993/logParser',
      headers: {'Content-Type': 'application/json'},
      data: {'logStr': gameLog}
    }

    let response = await axios(config);
    return response.data;
  }
}
