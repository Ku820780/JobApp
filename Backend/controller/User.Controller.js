
const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const getDataUri = require('../utils/datauri.js');
const cloudinary  = require('../utils/cloudinary.js');

const register = async (req, res)=>{
    try{
        const {fullname, email, phoneNumber, password, role} = req.body;
        console.log(fullname, email, phoneNumber, password, role)
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        };

        const file = req.file;
        console.log(file)
        const fileUri = getDataUri(file);
        const uploadResult = await cloudinary.uploader.upload(fileUri)

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:uploadResult.secure_url,
            }
        })

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    }catch(error){
        console.log(error)
    }
}

/// login api

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Email and Password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Email and Password",
                success: false
            });
        }

        // Check if the role is correct
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the correct role.",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const userInfo = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back ${userInfo.fullname}`,
                user: userInfo,
                success: true
            });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const logout = (req, res) =>{
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully.",
            success: true
        })
    }catch(error){
        console.log(error)
    }
}


const updateProfile = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, bio, skills } = req.body;
      const file = req.file;
      const fileUri = getDataUri(file);
      const uploadResult = await cloudinary.uploader.upload(fileUri)
      // Placeholder for file upload to Cloudinary or another service
  
      let skillsArray = [];
      if (skills) {
        skillsArray = skills.split(',').map(skill => skill.trim());
      }
  
      const userId = req.id; // Assuming this is set by middleware authentication
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({
          message: "User Not Found.",
          success: false
        });
      }
  
      // Update data
      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skills) user.profile.skills = skillsArray;
      
      //resume comes later here
      if (uploadResult) {
        user.profile.resume = uploadResult.secure_url; // Save the Cloudinary URL
        user.profile.resumeOriginalName = file.originalname; // Save the original name
    }
      // Save the updated user
      await user.save();
  
      const updatedUser = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
      };
  
      return res.status(200).json({
        message: "Profile updated successfully.",
        user: updatedUser,
        success: true
      });
  
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  };
  

module.exports = {register, login, logout, updateProfile}