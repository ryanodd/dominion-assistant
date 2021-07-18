import { DeckReportModel } from './types'
import { SET_GAME_LOG, SET_DECK_REPORTS, SET_ERROR, SET_REQUESTING, SET_RETURN_PAYLOAD, Action } from './actions'

export type LogAnalyzerState = {
  deckReports: DeckReportModel[]
  gameLog: string | null
  returnPayload: Record<string, unknown> | null
  requesting: boolean
  error: string | null
}

const initialState: LogAnalyzerState = {
  deckReports: [],
  gameLog: null,
  returnPayload: null,
  requesting: false,
  error: null,
}

// Use the initialState as a default value
export default function appReducer(state = initialState, action: Action): LogAnalyzerState {
  switch (action.type) {
  case SET_REQUESTING: {
    return { ...state, requesting: action.payload }
  }
  case SET_GAME_LOG: {
    return { ...state, gameLog: action.payload }
  }
  case SET_DECK_REPORTS: {
    return { ...state, deckReports: action.payload }
  }
  case SET_ERROR: {
    return { ...state, error: action.payload }
  }
  case SET_RETURN_PAYLOAD: {
    return { ...state, returnPayload: action.payload }
  }
  default:
    return state
  }
}
