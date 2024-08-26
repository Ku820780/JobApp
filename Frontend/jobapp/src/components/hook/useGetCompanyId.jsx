import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/EndPoints'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetCompanyId(companyId) {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchSingleCompany = async() =>{
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/getdatabyid/${companyId}`, {withCredentials:true})
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchSingleCompany()
  },[companyId, dispatch])
}

export default useGetCompanyId