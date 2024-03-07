/* eslint-disable @next/next/no-img-element */
"use client"

import { useMutation } from "@tanstack/react-query"
import React from "react"
import Link from "next/link"
import { MouseEventHandler, useEffect, useState } from "react"
import { api } from "../../api/api"
import SkeletonLoading from "../../components/skeleton-loading"
import { Product } from "../../types/products.type"
import { getRandomImage } from "../../utils/get-random-image"
import { SubmitHandler, useForm } from "react-hook-form"
import { AxiosError } from "axios"

type ProductResponse = {
  items: Product[]
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

type FilterQueryInputs = { 
  brand?: string,
  minPrice?: string,
  maxPrice?: string,
  color?: string,
  price?: string,
  currentPage: string,
  itemsPerPage: string
}

const initialState = {
  itemsPerPage: '20',
  currentPage: '1',
}

export default function Component() {
  const [filtersVisible, setFiltersVisible] = useState(false)
  const { register, setValue, getValues } = useForm<FilterQueryInputs>({
    defaultValues: {
      currentPage: '1',
      itemsPerPage: '20'
    },
  })
  const [order, setOrder] = useState<string>('')

  const { data, isPending, mutate, error } = useMutation({
    mutationKey: ['products'],
    mutationFn: async ({ itemsPerPage, currentPage, color, brand, maxPrice, minPrice, price }: FilterQueryInputs) => {
      if (price !== undefined && price?.includes('to')) {
        const [min, max] = price.split('to')
        minPrice = min
        maxPrice = max
      } else if (price === 'over5000'){
        minPrice = '5000'
        maxPrice = '9000000'
      }

      return api.get<ProductResponse>(`/product?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}${color ? `&color=${color}`: ''}${brand ? `&brand=${brand}`: ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}${minPrice ? `&minPrice=${minPrice}` : ''}`)
    },
  })

  useEffect(() => {
    mutate(initialState)
  }, [mutate])

  const products = data?.data.items.sort((a: Product, b: Product) => {
    if (order === 'lowest') {
      return a.price - b.price
    } else if (order === 'highest') {
      return b.price - a.price
    }
    return 0
  })

  const handleButtonClick = (color: string) => {
    setValue('color', color)
    mutate(getValues())
  }

  return (
    <section className={`${filtersVisible ? '' : 'grid'} md:grid-cols-[240px_1fr] items-start px-4 md:px-6 bg-gray-100 text-gray-500`}>
      <aside className={`flex flex-col gap-4 items-start w-full bg-gradient-to-l from-gray-300 to-gray-100 h-full min-h-screen ${filtersVisible ? 'hidden' : null}`}>
        <form>
          <div className="grid gap-1 pt-20">
            <h1 className="font-semibold text-2xl">
              Brand
            </h1> 
            <div className="flex gap-2" >
              <input type="radio" value="iphone" className="accent-slate-500" {...register('brand', { onChange: () => mutate(getValues()) })} />
              <label htmlFor="iphone">
                Iphone
              </label>
            </div>
            <div className="flex gap-2" >
              <input type="radio" value="xiaomi" className="accent-slate-500" {...register('brand', { onChange: () => mutate(getValues()) })} />
              <label htmlFor="xiaomi">
                Xiaomi
              </label>
            </div>
          </div>

          <hr className="h-px my-3 border-0 bg-gray-600 w-[90%]"/>

          <div className="grid gap-1">
            <h1 className="font-semibold text-2xl">
              Price Range
            </h1> 
            <div className="flex gap-2">
              <input type="radio" value="0to1000" className="accent-slate-500" {...register('price', { onChange: () => mutate(getValues()) })}/>
              <label htmlFor="0to500">
                $0 - $1000
              </label>
            </div>
            <div className="flex gap-2">
              <input type="radio" value="1000to2000" className="accent-slate-500" {...register('price', { onChange: () => mutate(getValues()) })} />
              <label  htmlFor="samsung">
                $1000 - $2000
              </label>
            </div>
            <div className="flex gap-2">
              <input type="radio"  value="2000to3000" className="accent-slate-500" {...register('price', { onChange: () => mutate(getValues()) })} />
              <label  htmlFor="2000to3000">
                $2000 - $3000
              </label>
            </div>
            <div className="flex gap-2">
              <input type="radio"  value="3000to4000" className="accent-slate-500" {...register('price', { onChange: () => mutate(getValues()) })} />
              <label  htmlFor="4000to5000">
                $3000 - $4000
              </label>
            </div>
            <div className="flex gap-2">
              <input type="radio"  value="over4000" className="accent-slate-500" {...register('price', { onChange: () => mutate(getValues()) })} />
              <label  htmlFor="over4000">
                Over $4000
              </label>
            </div>
          </div>

          <hr className="h-px my-3 border-0 bg-gray-600 w-[90%]"/>
          
          <div className="grid gap-1">
            <h1 className="font-semibold text-2xl pb-2">
              Color
            </h1> 
            <div className="grid grid-cols-4 gap-5 w-[80%]">
              <button className="text-center items-center flex-col justify-center w-fit" id="red" type='button' onClick={() => handleButtonClick('red')} >
                <div className="w-8 h-8 rounded-full bg-red-700 border border-gray-300"></div>
                <span className="text-sm">Red</span>
              </button>
              <button className="text-center items-center flex-col justify-center w-fit" id="purple" type='button' onClick={() => handleButtonClick('purple')} >
                <div className="w-8 h-8 rounded-full bg-purple-800 border border-gray-300"></div>
                <span className="text-sm">Purple</span>
              </button>
              <button className="text-center items-center flex-col justify-center w-fit" id="black" type='button' onClick={() => handleButtonClick('black')} >
                <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-300"></div>
                <span className="text-sm">Black</span>
              </button>
              <button className="text-center items-center flex-col justify-center w-fit" id="gold" type='button' onClick={() => handleButtonClick('gold')} >
                <div className="w-8 h-8 rounded-full bg-amber-400 border border-gray-300"></div>
                <span className="text-sm">Gold</span>
              </button>
              <button className="text-center items-center flex-col justify-center w-fit" id="silver" type='button' onClick={() => handleButtonClick('silver')} >
                <div className="w-8 h-8 rounded-full bg-slate-300 border border-gray-300"></div>
                <span className="text-sm">Silver</span>
              </button>
              <button className="text-center items-center flex-col justify-center w-fit" id="blue" type='button' onClick={() => handleButtonClick('blue')} >
                <div className="w-8 h-8 rounded-full bg-blue-900 border border-gray-300"></div>
                <span className="text-sm">Blue</span>
              </button>
              <button className="text-center items-center flex-col justify-center w-fit" id="green" type='button' onClick={() => handleButtonClick('green')} >
                <div className="w-8 h-8 rounded-full bg-green-700 border border-gray-300"></div>
                <span className="text-sm">Green</span>
              </button>
              <button className="text-center items-center flex-col justify-center w-fit" id="white" type='button' onClick={() => handleButtonClick('white')}>
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-300"></div>
                <span className="text-sm">White</span>
              </button>
            </div>
          </div>
          
          <hr className="h-px my-3 border-0 bg-gray-600 w-[90%]"/>
          </form>
      </aside>

      <div className="grid gap-6 md:gap-8 p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 justify-between">
          <div className="grid gap-1">
            <h1 className="text-4xl font-bold tracking-tight">Lexart Phones</h1>
            <p className="text-gray-500">Browse our latest smartphones</p>
          </div>
          <div className="flex items-center justify-around w-1/3 gap-1">
            <div className="flex">
              <Link className="rounded-lg bg-gray-300 p-2 text-gray-600 hover:opacity-70 border-gray-300" href="/add">Add Products</Link>
            </div>
            <button className="flex gap-2" onClick={() => setFiltersVisible(!filtersVisible)}>
              <span className="">{`${!filtersVisible ? 'Hide ' : 'Show '}`}Filters</span>
              <svg aria-hidden="true" className="icon-filter-ds" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                <path stroke="currentColor" strokeWidth="1.5" d="M21 8.25H10m-5.25 0H3"></path>
                <path stroke="currentColor" strokeWidth="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
                <path stroke="currentColor" strokeWidth="1.5" d="M3 15.75h10.75m5 0H21"></path>
                <path stroke="currentColor" strokeWidth="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path></svg>
            </button>
            <div className="flex items-center">
              <div className="relative">
                <select
                  aria-label="Sort by"
                  className="appearance-none bg-transparent pl-4 pr-8 py-2 rounded-lg text-center cursor-pointer focus:outline-none focus:ring-0 focus:ring-gray-200 focus:border-transparent"
                  defaultValue={''}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value={''} hidden>Sort By</option>
                  <option value={'lowest'}>Lowest Price</option>
                  <option value={'highest'}>Highest Price</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ArrowUpDownIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(error as AxiosError)?.response?.status === 404 && <h1 className="text-3xl w-full text center" >Sorry, we couldn&apos;t find phones for these filters.</h1>}
          {isPending ? (
            <>
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </>
          ) : (
            products?.map((product: Product) => (
              <div className="relative group" key={product.id}>
               <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Cover image"
                className="rounded-lg w-full object-cover aspect-square group-hover:opacity-50 transition-opacity"
                src={getRandomImage()}
              />
              <div className="flex-1 py-4">
                <h3 className="font-bold tracking-tight text-2xl">{product.name}</h3>
                <h4 >${product.price}</h4>
                <span>{product.color.charAt(0).toUpperCase() + product.color.slice(1)}</span>
              </div>
            </div>
            )))}
        </div>
      </div>
    </section>
  )
}

function ArrowUpDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  )
}
