import React from 'react'

function LoadingBar() {
  return (
   <div className="animate-pulse relative group h-full">
      <div className="h-2 bg-gray-600 rounded-full w-48"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingBar