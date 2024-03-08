"use client"

import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://lexartdeveloper.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})