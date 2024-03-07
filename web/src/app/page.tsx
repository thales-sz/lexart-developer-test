"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Index() {
  const route = useRouter()

  useEffect(() => {
    route.push('/home')
  }, [route])
  
  return (
    <div></div>
  )
}

export default Index