"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { api } from '../../api/api'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import LoadingSpinner from '../../components/loading-spinner'

type ProductInput = {
  name: string
  brand: string
  price: number
  color: string
  model: string
}

function AddProduct() {
  const route = useRouter()
  const { getValues, register, handleSubmit } = useForm<ProductInput>()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      route.push('/login')
    }

    const validateToken = async () => {
      try {const response = await api.post('/auth/token', { token })

      if (response.status !== 200) {
        route.push('/login')
      }

      } catch (error) {
        route.push('/login')
      }
    }

    validateToken()
  }, [route])

  const { data, mutate, isPending } = useMutation({
    mutationKey: ['addProduct'],
    mutationFn: async (data: { name: string, brand: string, price: number, color: string, model: string }) => {
      console.log('token', localStorage.getItem('token'))
      return api.post('/product', { ...data }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    }
  })

  console.log(data)

  if (data?.status === 201) route.push('/home')

  return (
    <section className="relative flex-col flex justify-center min-h-screen overflow-hidden bg-gray-200 text-gray-600 ">
      {isPending && <LoadingSpinner />}
      <div className={`rounded-lg border bg-card shadow-md max-w-lg mx-auto bg-gray-50 w-full ${isPending ? 'opacity-40' : ''}`}>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold whitespace-nowrap tracking-tight text-2xl">New Product</h3>
        <p className="text-sm text-muted-foreground">Enter the product details below</p>
      </div>
      <form onSubmit={handleSubmit(() => mutate(getValues()))}>
        <div className="p-6 grid gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm" htmlFor="name">
            Name
          </label>
          <input
            className="flex h-10 w-[460px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="name"
            placeholder="Enter the product name"
            {...register('name', { required: true })}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm" htmlFor="brand">
            Brand
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="brand"
            placeholder="Enter the brand"
            {...register('brand', { required: true })}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm" htmlFor="price">
            Price
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="price"
            placeholder="Enter the price"
            min="1"
            max="20000"
            {...register('price', { required: true })}
            required
            type="number"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm" htmlFor="color">
            Color
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="color"
            placeholder="Enter the color"
            {...register('color', { required: true })}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm" htmlFor="model">
            Model
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="model"
            placeholder="Enter the model"
            {...register('model', { required: true })}
            required
          />
        </div>
      </div>
      <div className="flex items-center p-6">
        <button className={`${isPending ? 'disabled' : ''}inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-300 hover:opacity-65 h-10 px-4 py-2 ml-auto`} type='submit'
        >
          Save
        </button>
      </div>
      </form>
      </div>
    </section>
  )
}

export default AddProduct