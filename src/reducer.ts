import { DeckReportModel } from './types'
import { SET_GAME_LOG, SET_DECK_REPORTS, SET_ERROR, SET_REQUESTING, SET_RETURN_PAYLOAD, Action, SET_OVERLAY_ACTIVE_TAB } from './actions'
import { OverlayTabType } from './Components/overlay/OverlayTabs'

export type LogAnalyzerState = {
  deckReports: DeckReportModel[]
  gameLog: string | null
  returnPayload: Record<string, unknown> | null
  requesting: boolean
  error: string | null
  overlayActiveTab: OverlayTabType
}

const initialState: LogAnalyzerState = {
  deckReports: [],
  gameLog: null,
  returnPayload: null,
  requesting: false,
  error: null,
  overlayActiveTab: OverlayTabType.DECKLISTS,
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
  case SET_OVERLAY_ACTIVE_TAB: {
    return { ...state, overlayActiveTab: action.payload }
  }
  default:
    return state
  }
}
