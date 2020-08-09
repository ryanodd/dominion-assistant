import axios, { AxiosRequestConfig } from 'axios'

export interface payload {
  money: number,
  buys: number,
  gains: number[],
  trashes: string[],
};

export interface deckTurnResponse {
  turnPayload: payload
}

// is this interface doing anything (necessary to use from the outside)?
// interface RequestServiceInterface {
//   deckTurnRequest(cardNameList: string[]): Promise<deckTurnResponse | any>
// }

export class RequestService {

  static async deckTurnRequest(cardNameList: string[]): Promise<deckTurnResponse | any> { // This return type is a hack

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:1993/',
      data: cardNameList
    }

    let response = await axios(config);
    console.log(response);
    return response;
  }
}
