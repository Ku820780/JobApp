import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/EndPoints'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllapplicants } from '@/redux/applicantsSlice'

function Applicants() {
  const params = useParams()
  const dispatch = useDispatch()
  console.log("Job ID:", params.id) // For debugging
  const { allapplicants } = useSelector((store) => store.applicantion) // Corrected the state selection
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/getapplicant`, { withCredentials: true }) // Added await
        console.log("Response data:", res.data) // For debugging
        if (res.data.success) {
          dispatch(setAllapplicants(res.data.job))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApplicants()
  }, [params.id, dispatch]) // Added params.id and dispatch to the dependency array

  

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold'>Applicants {allapplicants?.applications?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants
