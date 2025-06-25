const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        trim: true,
        minlength: 3 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
})

//Hash Password
userSchema.pre('save', async function(){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
})

//Compare password with hash password
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);