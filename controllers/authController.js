const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {username, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({
        success: false,
        message: 'Email already registerd'
    })

    const user = new User({username, email, password});
    await user.save();

    res.status(201).json({
        success: true,
        message: 'User registered successfully'
    })
};

exports.login = async (req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '1d'});
    res.json({
        success: true,
        message: 'Login Successfully',
        token
    });
}