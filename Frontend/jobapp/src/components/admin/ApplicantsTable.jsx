import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/EndPoints";

const statusOptions = ["Accepted", "Rejected"]; // Ensure these match backend expectations

function ApplicantsTable() {
  const { allapplicants } = useSelector((store) => store.applicantion);

  const handleStatusUpdate = async (status, id) => {

    console.log(`Status ${status} clicked for ID: ${id}`); // Debugging to see if the event fires
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
      console.log(res.data)
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while updating the status.");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of Applicants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allapplicants &&
            allapplicants?.applications?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      target="_blank"
                      href={item?.applicant?.profile?.resume}
                      className="text-blue-500 w-full hover:underline cursor-pointer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" /> {/* Ensure cursor shows it's clickable */}
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      {statusOptions.map((status, index) => (
                        <div
                          onClick={() => handleStatusUpdate(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
