import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/EndPoints";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // const user = false;
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between max-auto max-w-7xl h-16 mx-auto mt-5">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#FB3002]">Portal</span>
          </h1>
        </div>
        <div className="flex gap-12 items-center">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <li>Companies</li>
                </Link>
                <Link to="/admin/jobs">
                  <li>Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/jobs">
                  <li>Jobs</li>
                </Link>
                <Link to="/browse">
                  <li>Browse</li>
                </Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                {" "}
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="curser-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="curser-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="my-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 curser-pointer">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link">View Profile</Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 curser-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
