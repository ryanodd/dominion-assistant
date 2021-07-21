import { Dispatch } from 'redux'
import { SET_GAME_LOG } from '../actions'

// Listens for messages from the Dominion Tracker extension, containing game logs
export class MessageListenerService {

  dispatch: Dispatch<any> | null = null

  public setup = (dispatch: Dispatch<any>): void => {
    this.dispatch = dispatch
    window.addEventListener('message', this.handleMessageEvent)
  }

  public destroy = (): void => {
    window.removeEventListener('message', this.handleMessageEvent)
  }

  handleMessageEvent = (event: MessageEvent): void => {
    if (typeof event.data === 'string' && event.data.startsWith('Game #')) {
      this.dispatch?.({type: SET_GAME_LOG, payload: event.data})
    }
  }
}
