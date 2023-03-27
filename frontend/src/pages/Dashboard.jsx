import React from 'react'
import { Button, Featured, Chart, TableList } from '../components';
import { earningData,} from '../data/dummy';
// import { useStateContext } from '../contexts/ContextProvider';

const Dashboard = () => {
  return (
    <div className='mt-2'>
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
          </div>
          <div className='mt-6'>
          <Button
              color="white"
              bgColor='#ff8080'
              text="Download"
              borderRadius="10px"
              size='md'
            />
          </div>
        </div>

        <div  className="flex m-3 flex-wrap justify-center gap-1 items-center">
            {earningData.map((item)=> (
              <div 
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl"
              >
                <button key='button'
                style={{color: item.iconColor, backgroundColor:item.iconBg}}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                >
                  {item.icon}
                </button>
                    <p className="mt-3">
                    <span className="text-lg font-semibold">{item.amount}</span>
                    <span className={`text-sm text-${item.pcColor} ml-2`}>
                      {item.percentage}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400  mt-1">{item.title}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-1 justify-center m-3 overflow-hidden">
          {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 flex" ></div> */}
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-2/5 justify-center">
              <div className='h-65 justify-center'>
                 <Featured />
              </div>
            </div >

            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl w-full justify-center ">
              <Chart title="Last 6 Months (Revenue)" aspect={2 / 1}  />
            </div>

        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-5 p-4 rounded-2xl md:w-850 justify-center" >
          <TableList />
        </div>

    </div>
  )
}

export default Dashboard