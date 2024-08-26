import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const {allAppliedJob} = useSelector((store)=>store.job)
  console.log("date",allAppliedJob.job)
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJob.map((appliedjob, index) => (
            <TableRow key={appliedjob._id}>
              <TableCell className="font-medium">{appliedjob?.createdAt.split("T")[0]}</TableCell>
              <TableCell>{appliedjob?.job?.title}</TableCell>
              <TableCell>{appliedjob?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge className={`${appliedjob?.status === "rejected" ? 'bg-red-400' : appliedjob.status === "pending" ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedjob?.status.toUpperCase()}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
