const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const schema = new mongoose.Schema({
    Username: { type: String, default: '' },
    email: String,
    password: String
},{
    timestamps:true
});

schema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', schema);
module.exports= User;