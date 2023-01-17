import { useEffect, useState } from 'react'

function isTouchDevice() {
  if (typeof window === 'undefined') return false
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  function mq(query:string) {
    return typeof window !== 'undefined' && window.matchMedia(query).matches
  }
  // @ts-ignore
  if ('ontouchstart' in window || (window?.DocumentTouch && document instanceof DocumentTouch)) return true
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('') // include the 'heartz' - https://git.io/vznFH
  return mq(query)
}

export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    // const { isAndroid, isIos , isOpera, isWindows,osName,osVersion  } = require('react-device-detect')
    // console.log('osVersion: ', osVersion);
    // console.log('osName: ', osName);
    // setIsTouch(isAndroid || isIos || isOpera || isWindows)
    const { isIPad13, isIPhone13, isWinPhone, isMobileSafari, isTablet } = require('react-device-detect')
    setIsTouch(isTouch || isIPad13 || isIPhone13 || isWinPhone || isMobileSafari || isTablet || isTouchDevice())
  }, [])

  return isTouch
}