import { useEffect, useState } from 'react'
import{useDispatch} from 'react-redux'
import authservice from './appwrite/auth';
import { login,logout } from './store/authslice';
import { Header,Footer } from './components/index';


import './App.css'

function App() {
  const [loading,setloading]=useState(false);
  const dispatch=useDispatch()
  console.log(import.meta.env.VITE_APPWRITE_URL)
  //below commented part is creating some problem related to appwrite
  // useEffect(()=>{
  //  const checksession=async()=>{
  //   try {
  //     const userdata = await authservice.getcurrentuser();
  //     if (userdata) {
  //         dispatch(login({ userdata }));
  //     } else {
  //         dispatch(logout());
  //     }
  // }
  //   catch(err){
  //     console.error('Error checking user session:', err);
  //     dispatch(logout());
  //   }
  //   finally{
  //     setloading('flase')}
  //   };
  //   checksession();
  // },[])
  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        {/* TODO:  <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
  
}

export default App
