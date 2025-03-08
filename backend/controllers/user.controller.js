import { User } from "../models/user.model.js";

// Register
export const register = async (req, res) => {
    try {
        const { name, email, password, role, gender, phone, address } = req.body;

        if (!name || !email || !password || !role || !gender || !phone || !address) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await User.hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            gender,
            phone,
            address
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to register",
            success: false
        });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const token = user.Authtoken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error while logging in",
            success: false
        });
    }
};

//Update profile

export const updateProfile = async (req, res) => {
    try {
        const{name,  password, gender, phone, address} = req.body;

        const UserId = req.id
        const user = await User.findById(UserId)
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        if(name) user.name = name
        // if(email) user.email = email
        if(gender) user.gender = gender
        if (password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(password, saltRounds);
        }
        if(phone) user.phone = phone
        if(address) user.address = address
        await user.save()
        res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update profile",
            success: false
        });
    }
}


// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
        });

        res.status(200).json({
            message: "User logged out successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error while logging out",
            success: false
        });
    }
};
