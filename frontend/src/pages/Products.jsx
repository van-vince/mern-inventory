import React from 'react'
import { Button, Datatable } from '../components'

const Products = () => {
  return (
    <div className='mt-2'>
      <div >
        <div className='uppercase font-semibold text-2xl text-gray-500 ml-10'>
          <h1>Products</h1>
        </div>
        <div className='flex justify-between bg-whiite h-10 m-5 p-4'>
          <div>
            <input type="search" placeholder='Search' className='p-3 m-2 w-60 rounded-2xl'/>
          </div>
         <div className='mr-5'>
         <Button
              color="white"
              bgColor='blue'
              text="Add New"
              borderRadius="10px"
              size='md'
            />
         </div>
        </div>

        <div className='m-10 bg-white'>
          <Datatable />
        </div>
      </div>

    </div>
  )
};

export default Products