"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { api } from '../../api/api'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

type RegisterInput = {
    name: string
    email: string
    password: string
}

function Register() {
  const router = useRouter()
  const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm<RegisterInput>()
  const { data, mutate } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: { email: string, password: string }) => {
      return api.post('/auth/', { ...data })
    }
  })

    // if (data?.status === 201) {
    //     router.push('/login')
    // }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-200">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-gray-700 underline">
                   Sign Up
                </h1>
                <form className="mt-6" onSubmit={handleSubmit(() => mutate(getValues()))}>
                  <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            required
                            {...register('name')}
                        />
                    </div>
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
                            required
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
                            required
                            {...register('password', {
                                minLength: {
                                    value: 8,
                                    message: 'Password must have at least 8 characters',
                                },
                                validate: (value: string) => {
                                    if (!value.match(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/)) {
                                        return "Your password must contain at least one special character";
                                    }
                                    if (!value.match(/[A-Z]/)) {
                                        return "Your password must contain at least one uppercase letter";
                                    }
                                    if (!value.match(/[a-z]/)) {
                                        return "Your password must contain at least one lowercase letter";
                                    }
                                    if (!value.match(/[0-9]/)) {
                                        return "Your password must contain at least one number"; 
                                    }
                                }
                            })}
                        />
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" type='submit'>
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-medium text-gray-600 hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
  )
}

export default Register