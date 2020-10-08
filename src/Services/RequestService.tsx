import axios, { AxiosRequestConfig } from 'axios'

export interface logPasteResponsePayload {
  deck1List: string[]
  deck2List: string[]
};

export interface logPasteResponse {
  payload: logPasteResponsePayload
}

// is this interface doing anything (necessary to use from the outside)?
// interface RequestServiceInterface {
//   deckTurnRequest(cardNameList: string[]): Promise<deckTurnResponse | any>
// }

export class RequestService {

  static async logPasteRequest(gameLog: string): Promise<logPasteResponse | any> { // This return type is a hack

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:3000/logParser',
      headers: {'Content-Type': 'application/json'},
      data: {'logStr': gameLog}
    }

    let response = await axios(config);
    console.log(response);
    return response;
  }
}
