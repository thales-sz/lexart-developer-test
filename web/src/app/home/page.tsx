/* eslint-disable @next/next/no-img-element */
"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { api } from "../../api/api"
import SkeletonLoading from "../../components/skeleton-loading"
import { Product } from "../../types/products.type"
import { AxiosResponse } from "axios"

type ProductResponse = {
  items: Product[]
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export default function Component() {
  const { register, handleSubmit } = useForm()
  const [filtersVisible, setFiltersVisible] = useState(false)

  const { data, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return api.get<ProductResponse>("/product?currentPage=1&itemsPerPage=20")
    },
  })

  console.log(data?.data.items)

  console.log(filtersVisible)

  return (
    <section className={`${filtersVisible ? '' : 'grid'} md:grid-cols-[240px_1fr] items-start px-4 md:px-6 bg-gray-100 text-gray-500`}>
      <aside className={`flex flex-col gap-4 items-start w-full bg-gradient-to-l from-gray-300 to-gray-100 h-full min-h-screen ${filtersVisible ? 'hidden' : null}`}>

        <form>
        <div className="grid gap-1 pt-20">
          <h1 className="font-semibold text-2xl">
            Brand
          </h1> 
          <div className="flex gap-2">
            <input type="checkbox" id="apple" className="accent-slate-500" />
            <label htmlFor="apple">
              Apple
            </label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="samsung" className="accent-slate-500" />
            <label htmlFor="samsung">
              Samsung
            </label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="xiaomi" className="accent-slate-500" />
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
            <input type="checkbox" id="0to500" className="accent-slate-500" />
            <label htmlFor="0to500">
              $0 - $500
            </label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="500to1000" className="accent-slate-500" />
            <label  htmlFor="samsung">
              $500 - $1000
            </label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox"  id="1000to1500" className="accent-slate-500" />
            <label  htmlFor="1000to1500">
              $1000 - $1500
            </label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox"  id="over1500" className="accent-slate-500" />
            <label  htmlFor="over1500">
              Over $1500
            </label>
          </div>
        </div>

        <hr className="h-px my-3 border-0 bg-gray-600 w-[90%]"/>
        
        <div className="grid gap-1">
          <h1 className="font-semibold text-2xl pb-2">
            Color
          </h1> 
          <div className="grid grid-cols-4 gap-5 w-[80%]">
            <button className="text-center items-center flex-col justify-center w-fit">
              <div className="w-8 h-8 rounded-full bg-red-700 border border-gray-300"></div>
              <span className="text-sm">Red</span>
            </button>
            <button className="text-center items-center flex-col justify-center w-fit">
              <div className="w-8 h-8 rounded-full bg-purple-800 border border-gray-300"></div>
              <span className="text-sm">Purple</span>
            </button>
            <button className="text-center items-center flex-col justify-center w-fit">
              <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-300"></div>
              <span className="text-sm">Black</span>
            </button>
             <button className="text-center items-center flex-col justify-center w-fit">
              <div className="w-8 h-8 rounded-full bg-amber-400 border border-gray-300"></div>
              <span className="text-sm">Gold</span>
            </button>
             <button className="text-center items-center flex-col justify-center w-fit" >
              <div className="w-8 h-8 rounded-full bg-slate-300 border border-gray-300"></div>
              <span className="text-sm">Silver</span>
            </button>
            <button className="text-center items-center flex-col justify-center w-fit">
              <div className="w-8 h-8 rounded-full bg-blue-900 border border-gray-300"></div>
              <span className="text-sm">Blue</span>
            </button>
            <button className="text-center items-center flex-col justify-center w-fit">
              <div className="w-8 h-8 rounded-full bg-green-700 border border-gray-300"></div>
              <span className="text-sm">Green</span>
            </button>
            <button className="text-center items-center flex-col justify-center w-fit">
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
              <span className="">Hide Filters</span>
              <svg aria-hidden="true" className="icon-filter-ds" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                <path stroke="currentColor" stroke-width="1.5" d="M21 8.25H10m-5.25 0H3"></path>
                <path stroke="currentColor" stroke-width="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd"></path>
                <path stroke="currentColor" stroke-width="1.5" d="M3 15.75h10.75m5 0H21"></path>
                <path stroke="currentColor" stroke-width="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd"></path></svg>
            </button>
            <div className="flex items-center">
              <div className="relative">
                <select
                  aria-label="Sort by"
                  className="appearance-none bg-transparent pl-4 pr-8 py-2 rounded-lg text-center cursor-pointer focus:outline-none focus:ring-0 focus:ring-gray-200 focus:border-transparent"
                  defaultValue={''}
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
          { isFetching ? (
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
            data?.data.items.map((product: Product) => (
              <div className="relative group" key={product.id}>
               <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Cover image"
                className="rounded-lg w-full object-cover aspect-square group-hover:opacity-50 transition-opacity"
                src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone15pro-digitalmat-gallery-3-202309?wid=364&hei=333&fmt=png-alpha&.v=1693081542150"
              />
              <div className="flex-1 py-4">
                <h3 className="font-semibold tracking-tight">{product.name}</h3>
                <h4 >${product.price}</h4>
              </div>
            </div>
            ))
          //   <>
          // <div className="relative group">
          //   <Link className="absolute inset-0 z-10" href="#">
          //     <span className="sr-only">View</span>
          //   </Link>
          //   <img
          //     alt="Cover image"
          //     className="rounded-lg object-center w-full aspect-square group-hover:opacity-50 transition-opacity"
          //     height={200}
          //     width={200}
          //     src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone15pro-digitalmat-gallery-3-202309?wid=364&hei=333&fmt=png-alpha&.v=1693081542150"
          //   />
          //   <div className="flex-1 py-4">
          //     <h3 className="font-semibold tracking-tight">iPhone 14 Pro</h3>
          //     <h4 >$1199.99</h4>
          //   </div>
          // </div>
          // <div className="relative group">
          //   <Link className="absolute inset-0 z-10" href="#">
          //     <span className="sr-only">View</span>
          //   </Link>
          //   <img
          //     alt="Cover image"
          //     className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          //     height={200}
          //     src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone15pro-digitalmat-gallery-3-202309?wid=364&hei=333&fmt=png-alpha&.v=1693081542150"
          //     width={200}
          //   />
          //   <div className="flex-1 py-4">
          //     <h3 className="font-semibold tracking-tight">Pixel 7 Pro</h3>
          //     <h4 >$999.99</h4>
          //   </div>
          // </div>
          // <div className="relative group">
          //   <Link className="absolute inset-0 z-10" href="#">
          //     <span className="sr-only">View</span>
          //   </Link>
          //   <img
          //     alt="Cover image"
          //     className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          //     height={200}
          //     src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone15pro-digitalmat-gallery-3-202309?wid=364&hei=333&fmt=png-alpha&.v=1693081542150"
          //     width={200}
          //   />
          //   <div className="flex-1 py-4">
          //     <h3 className="font-semibold tracking-tight">OnePlus 10 Pro</h3>
          //     <h4 >$899.99</h4>
          //   </div>
          // </div>
          // <div className="relative group">
          //   <Link className="absolute inset-0 z-10" href="#">
          //     <span className="sr-only">View</span>
          //   </Link>
          //   <img
          //     alt="Cover image"
          //     className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          //     height={200}
          //     src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone15pro-digitalmat-gallery-3-202309?wid=364&hei=333&fmt=png-alpha&.v=1693081542150"
          //     width={200}
          //   />
          //   <div className="flex-1 py-4">
          //     <h3 className="font-semibold tracking-tight">OnePlus 10 Pro</h3>
          //     <h4 >$899.99</h4>
          //   </div>
          // </div>
          // <div className="relative group">
          //   <Link className="absolute inset-0 z-10" href="#">
          //     <span className="sr-only">View</span>
          //   </Link>
          //   <img
          //     alt="Cover image"
          //     className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          //     height={200}
          //     src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone15pro-digitalmat-gallery-3-202309?wid=364&hei=333&fmt=png-alpha&.v=1693081542150"
          //     width={200}
          //   />
          //   <div className="flex-1 py-4">
          //     <h3 className="font-semibold tracking-tight">OnePlus 10 Pro</h3>
          //     <h4 >$899.99</h4>
          //   </div>
          // </div>
          // <div className="relative group">
          //   <Link className="absolute inset-0 z-10" href="#">
          //     <span className="sr-only">View</span>
          //   </Link>
          //   <img
          //     alt="Cover image"
          //     className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
          //     height={200}
          //     src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone15pro-digitalmat-gallery-3-202309?wid=364&hei=333&fmt=png-alpha&.v=1693081542150"
          //     width={200}
          //   />
          //   <div className="flex-1 py-4">
          //     <h3 className="font-semibold tracking-tight">OnePlus 10 Pro</h3>
          //     <h4 >$899.99</h4>
          //   </div>
          // </div>
          // </>
          )}
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
