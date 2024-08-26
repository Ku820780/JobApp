import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function AdminJobsTables() {
  const navigate = useNavigate()
  const {allAdminJobs, searchJobsByText} = useSelector((store) => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  useEffect(()=>{
    const filterdCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
      if(!searchJobsByText){
        return true
      };
      return job?.title?.toLowerCase().includes(searchJobsByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobsByText.toLowerCase());
    })
    setFilterJobs(filterdCompany)
    
  },[allAdminJobs, searchJobsByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Post Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover className="">
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={()=>navigate(`/admin/companysetup/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit mt-2 cursor-pointer">
                      <Eye className="w-6"/>
                      <span>Applicant</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTables;
