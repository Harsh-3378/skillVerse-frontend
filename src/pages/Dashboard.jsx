import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {

  const {loading:authLoading} = useSelector((state)=>state.auth)
  const {loading:profileLoadig} = useSelector((state)=>state.profile)

  if(authLoading || profileLoadig){
    return (
      <div className="grid place-items-center min-h-[calc(100vh-3.5rem)]">
        <div className='spinner'></div>
      </div>
    );
  }

  return (
    <div className="flex flex-row relative min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="w-11/12 max-w-[1000px] mx-auto py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard
