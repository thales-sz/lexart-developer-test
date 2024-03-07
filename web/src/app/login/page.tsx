"use client"

import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { api } from '../../api/api';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type LoginInput = {
  email: string
  password: string
}

function Login() {
  const router = useRouter()
  const { register, handleSubmit, getValues } = useForm<LoginInput>()
  const { data, mutate } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: { email: string, password: string }) => {
      return api.post('/auth/signin', { ...data })
    }
  })

  if (data?.status === 200) {
    console.log('Authenticated')
    localStorage.setItem('token', data.data.token)
    router.push('/add')
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-200">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-gray-700 underline">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit(() => mutate(getValues()))}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register('email')}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register('password')}
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-gray-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" type='submit'>
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don&apos;t have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-gray-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
  )
}

export default Login