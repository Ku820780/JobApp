import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/EndPoints";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const navigate = useNavigate()
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", input.fullname);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("password", input.password);
    formdata.append("role", input.role);
    if(input.file){
      formdata.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      });
      console.log(res.data)
      if(res.data.success){
        
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      dispatch(setLoading(false))
    }
  };

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl max-auto ml-60">
        <form
          onSubmit={handleChange}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter name"
              onChange={changeEventHandler}
              value={input.fullname}
              name="fullname"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="manish@gmail.com"
              onChange={changeEventHandler}
              value={input.email}
              name="email"
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="1234556"
              onChange={changeEventHandler}
              value={input.phoneNumber}
              name="phoneNumber"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="*******"
              onChange={changeEventHandler}
              value={input.password}
              name="password"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2 ">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                name="file"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 animate-spin w-full my-4" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
