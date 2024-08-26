import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useDispatch } from "react-redux";
import {  setSearchQuery } from "@/redux/jobSlice";


const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Noida", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Java Developer",
      "MERN Stack Developer"
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "10-50k", "1lakh to 5lakh"],
  },
];
function FilterCards() {
  const dispatch = useDispatch()
 const [selectedValue, setSelectedValue] = useState("")
 const handleFilterData = (value) => {
    setSelectedValue(value)
 }
  
 useEffect(()=>{
    dispatch(setSearchQuery(selectedValue))
 },[selectedValue])

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup  value={selectedValue} onValueChange={handleFilterData}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`
              return (
                <div  className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId}/>
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCards;
