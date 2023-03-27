import React from 'react'
import { Button, TableList } from '../components'

const Invoice = () => {
  return (
    <div>
      <div className='uppercase font-semibold text-2xl text-gray-500 ml-10'>
      <h1>Invoice</h1>
      </div>
      <div className='flex justify-between bg-whiite h-10 m-5 p-4 mb-10'>
        <div className='flex'>
          <div>
            <input type="Date" placeholder='start date' className='p-3 m-2 w-60 rounded-2xl'/>
          </div>
          <div>
            <input type="Date" placeholder='start date' className='p-3 m-2 w-60 rounded-2xl'/>
          </div>
        </div>
         <div className='mr-5'>
         <Button
              color="white"
              bgColor='green'
              text="Add New"
              borderRadius="10px"
              size='md'
            />
         </div>
        </div>
      <div className=" dark:text-gray-200 dark:bg-secondary-dark-bg m-5 p-2  md:w-850 justify-center">
        <TableList />
      </div>

    </div>
  )
}

export default Invoice