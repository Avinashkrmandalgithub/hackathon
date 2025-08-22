import User from '../models/User.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';


// register user 

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findone({ email });

    if(existing) throw new ApiError(400, "Email already registered");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed, role });

    return res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
  } catch (error) {
    next(err);
  }

};


// login user 

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) throw new ApiError(401, "User not found");

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) throw new ApiError(401, "Invalid credentials");
    
    const token = jwt.sign({ id:user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: "7d"});

    return res.json(new ApiResponse(200, {token}, "login successful"));
  } catch (error) {
    next(err);
  }
};



export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if(!user ) throw new ApiError(404, 'User not found');

    return res.json(new ApiResponse(200, user, "profile fetched"));
  } catch (error) {
    next(err);
  }
}