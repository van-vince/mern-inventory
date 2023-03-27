import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Dashboard, Invoice, Products, Customers, Users, Warehouse, ColorPicker, } from './pages';

import { useStateContext } from './contexts/ContextProvider';

import './App.css'


function App() {
  const {activeMenu} = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className='flex related dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4' style={{zIndex: '1000'}}>
            <div>
              <button
              type='button'
              style={{ background:'blue', borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </div>
          </div>
          {activeMenu ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg" >
              <Sidebar />
            </div>
          )}
          <div className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
              <Navbar />
            </div>

            <div>
              <Routes>
                {/* main  */}
                <Route path="/" element={<Dashboard />}  />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* sales  */}
                <Route path="/invoice" element={<Invoice/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/customers" element={<Customers/>} />
                <Route path="/users" element={<Users/>} />

                {/* store  */}
                <Route path="/warehouse" element={<Warehouse/>} />
                {/* <Route path="/editor" element={<Edit/>}  /> */}
                <Route path="/stores" element={<Warehouse/>} />
                <Route path="/color-picker" element={<ColorPicker/>} />

                {/* charts */}
                {/* <Route path="/line" element={<Line/>} />
                <Route path="/area" element={<Area/>} />
                <Route path="/bar" element={<Bar/>} />
                <Route path="/pie" element={<Pie/>} />
                <Route path="/financial" element={<Financial/>} />
                <Route path="/color-mapping" element={<ColorMapping/>} />
                <Route path="/pyramid" element={<Pyramid/>} />
                <Route path="/stacked" element={<Stacked/>} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
