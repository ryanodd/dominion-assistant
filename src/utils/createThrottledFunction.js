/*
* Returns the given function (func), modified to only execute every (delay) ms.
* If the function has been called in the last (delay) ms,
* it is queued to execute a maximum of once, when (delay) is over (using the latest-supplied arguments).
* https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
*/

export function createThrottledFunction(callback, delay) {
  let timerId
  let latestArgs
  let willExecuteAfterTimeout = false
  return (...args) => {
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
