"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

function Index() {
  const route = useRouter()

  route.push('/home')
  return (
    <div></div>
  )
}

export default Index