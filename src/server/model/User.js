//DECLARATION
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//SCHEMA
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 7,
        validate: {
            validator: email => validator.isEmail(email),
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    vitelist: {
        invitation: {
            wedding: [{
                link: {
                    type: String,
                    required: true,
                    trim: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                groom: {
                    type: String,
                    required: true,
                },
                bride: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
                location: {
                    type: String,
                    required: true,
                }
            }]
        },
        greetings: {
            christmas: [{
                link: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                to: {
                    type: String,
                    required: true,
                },
                message: {
                    type: String,
                    required: true,
                },
            }]
        }
    }
});

//MONGODB MIDDLEWARE
UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(user.password, salt, (err, hashed) => {
            user.password = hashed;
            next();
        });
    });
});

//USER SCHEMA INSTANCE METHOD DECLARATION
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({ id: user._id.toHexString() }, 'vite').toString();

    user.tokens.push({ token, access });

    return user.save().then(() => token);
};

UserSchema.methods.logout = function(token) {
    for (var data in this.tokens) if (this.tokens[data].token === token) {
        this.tokens.splice(data, 1);
        break;
    }

    return this.save();
};

//USER SCHEMA STATIC METHOD DECLARATION
UserSchema.statics.findByCredentials = function ({ email, password }) {
    const User = this;

    return User.findOne({ $or: [ { email }, { username: email } ] }).then(user => {
        if (!user) return Promise.reject('User not found');
        
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) resolve(user);
                else reject('Password is not match');
            });
        });
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var id; 
    var apa;

    try {
        id = (apa = jwt.verify(token, 'vite')).id;
    } catch (e) {
        return Promise.reject('Token is not valid');
    }
    
    return User.findOne({ _id: id, 'tokens.token': token, 'tokens.access': 'auth' });
};

//MONGOOSE MODEL EXPORT
module.exports = mongoose.model('mantabsoul', UserSchema);