import axios, { AxiosRequestConfig } from 'axios'
import { Dispatch } from 'redux'
import { SET_DECK_REPORTS, SET_ERROR, SET_REQUESTING, SET_RETURN_PAYLOAD } from '../actions'
import sampleResponse from '../sampleResponses/sampleResponse'

export class RequestService {

  static async logPasteRequest(gameLog: string, dispatch: Dispatch<any>) {
    dispatch({type: SET_REQUESTING, payload: true})
    if (window.location.hostname === 'localhost'){
      dispatch({type: SET_RETURN_PAYLOAD, payload: sampleResponse})
      dispatch({type: SET_DECK_REPORTS, payload: sampleResponse.deckReports})
      dispatch({type: SET_ERROR, payload: null})
      dispatch({type: SET_REQUESTING, payload: false})
      return sampleResponse
    } else {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: 'https://1qyb0hokg3.execute-api.us-east-2.amazonaws.com/dominionLogAnalyzer',
        headers: {'Content-Type': 'application/json'},
        data: {'logStr': gameLog}
      }
      const response = await axios(config)

      dispatch({type: SET_RETURN_PAYLOAD, payload: response.data})
      if (response.status === 200){
        dispatch({type: SET_DECK_REPORTS, payload: response.data.deckReports})
        dispatch({type: SET_ERROR, payload: null})
      } else {
        dispatch({type: SET_ERROR, payload: response.data})
      }
      dispatch({type: SET_REQUESTING, payload: false})
    }
  }
}
