/*
* Returns the given function (func), modified to only execute every (delay) ms.
* If the function has been called in the last (delay) ms,
* it is queued to execute a maximum of once, when (delay) is over (using the latest-supplied arguments).
* https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
*/

// eslint-disable-next-line max-len
export function createThrottledFunction<Callback = (...args: any[]) => void>(callback: Callback, delay: number): Callback {
  let timerId
  let latestArgs
  let willExecuteAfterTimeout = false
  return (...args: Parameters<Callback>) => {
    latestArgs = args
    if (timerId) {
      willExecuteAfterTimeout = true
      return
    }
    callback(...latestArgs)
    timerId = setTimeout(() => {
      if (willExecuteAfterTimeout) {
        callback(...latestArgs)
      }
      timerId = undefined
      willExecuteAfterTimeout = false
    }, delay)
  }
}
