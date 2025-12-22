import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async (req, res) => {
    // res.send('hello from create user');
    const { username, email, password } =  req.body;
    // console.log(username, email, password);

    // validation
    if(!username || !email || !password) {
        res.status(500).json({ message: 'Please fill all the fields' });
    }

    const userExists = await User.findOne({ email });// for checking existing user's email

    if(userExists) {// if user already exists
        res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);// generating salt for hashing password
    const hashedPassword = await bcrypt.hash(password, salt);// hashing password

    // create new user
    const newUser = new User({username, email, password: hashedPassword});// creating new user instance with hashed password

    try {
        await newUser.save();// saving new user to database
        createToken(res, newUser._id);// creating token for the new user

        res.status(201).json({
            _id: newUser._id, 
            username: newUser.username, 
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    }
    catch(error) {
        res.status(400).json({ message: 'Invalid user data' });
    }

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    // validation
    if(existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        // check if password is valid
        if(isPasswordValid) {
            createToken(res, existingUser._id);// creating token for the logged in user

            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            });
            return;// exit the function after sending the response
        }
    }

});

const logoutCurrentUser = asyncHandler(async (req, res) => {
    // clear the cookie
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});// fetch all users from database
    res.status(200).json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(!user) {
        res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(req.user);
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(!user) {
        res.status(404).json({ message: 'User not found' });
    }
    else{
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();
    
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        res.status(404).json({ message: 'User not found' });
    }

    if(user.isAdmin) {
        res.status(400).json({ message: 'Cannot delete admin user' });
    }
    await user.deleteOne({_id: user._id});
    res.status(200).json({ message: 'User deleted successfully' });
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(!user) {
        res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(404).json({ message: 'User not found' });
    }
    else{
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
});

export { createUser,
    loginUser, 
    logoutCurrentUser, 
    getAllUsers,
    getCurrentUserProfile, 
    updateCurrentUserProfile, 
    deleteUserById, 
    getUserById,
    updateUserById
};