import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetAllAdminJobs from '../hook/useGetAllAdminJobs'
import AdminJobsTables from './AdminJobsTables'
import { setSearchJobsByText } from '@/redux/jobSlice'

function AdminJobs() {
  useGetAllAdminJobs()
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(setSearchJobsByText(input))
  },[input])

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input className="w-fit" placeholder="Filter By Name, Role" onChange={(e)=>setInput(e.target.value)}/>
          <Button onClick={()=>navigate('/admin/jobs/create')}>New Jobs</Button>
        </div>
       <AdminJobsTables />
      </div>
    </div>
  )
}

export default AdminJobs