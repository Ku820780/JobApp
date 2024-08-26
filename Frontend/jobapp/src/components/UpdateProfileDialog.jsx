import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/EndPoints";
import { setLoading } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfileDialog({ open, setOpen }) {
  // const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate()

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const changeFileHandler = (e) => {
    setInput({...input, file:e.target.files?.[0]})
  }

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleUpdate = async(e) => {
    e.preventDefault()
    const formdata = new FormData();
    formdata.append("fullname", input.fullname);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("bio", input.bio);
    formdata.append("skills", input.skills);
    if(input.file){
      formdata.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formdata, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate('/profile')
        toast.success(res.data.message)
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(event) => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="col-span-3"
                  value={input.fullname}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="col-span-3"
                  value={input.email}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  className="col-span-3"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  className="col-span-3"
                  value={input.bio}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  className="col-span-3"
                  value={input.skills}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                  onChange={changeFileHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button>
                  <Loader2 className="mr-2 h-4 animate-spin w-full my-4" />
                  Please Wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
          <Button
            type="submit"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
