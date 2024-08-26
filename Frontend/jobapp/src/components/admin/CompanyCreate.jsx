import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from "../ui/input"
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/EndPoints'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

function CompanyCreate() {
    const navigate = useNavigate()

    const [companyName, setCompanyName] = useState('')
    const dispatch = useDispatch();

    const handleAddCompany = async() => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/companyregister`, {companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            console.log(res.data)
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companysetup/${companyId}`);
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Your Company</h1>
                <p className='text-gray-500'>What would you like your company name? you can change this later</p>
            </div>
            <Label>
                Company Name
            </Label>
            <Input type="text" className="my-2" placeholder="Micro Technology etc."
            value={companyName}
            onChange={(e)=>setCompanyName(e.target.value)}/>
            <div className='flex items-center gap-2 my-10'>
                <Button variant="outline" className="" onClick={()=>navigate('/admin/companies')}>Cancel</Button>
                <Button onClick={handleAddCompany}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CompanyCreate