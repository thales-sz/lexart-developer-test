"use client"

import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://35.215.198.88:9999',
  headers: {
    'Content-Type': 'application/json',
  },
})