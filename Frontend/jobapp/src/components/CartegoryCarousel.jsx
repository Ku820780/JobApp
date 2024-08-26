import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function CartegoryCarousel() {
  const category = [
    "Full Stack Developer",
    "Data Science",
    "Java Developer",
    "Fronted Developer",
    "DevOps Developer",
    "MERN Stack Developer",
  ];

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleQuery = (query) => {
    dispatch(setSearchQuery(query))
    navigate('/browse')
  }
  return (
    <div className="w-full max-w-xl mx-auto my-20">
      <Carousel>
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={()=>handleQuery(item)} variant="outline" className="rounded-full">
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CartegoryCarousel;
