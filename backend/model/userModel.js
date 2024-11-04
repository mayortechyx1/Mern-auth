import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

// (pre) before we save the details(create and update) , we ensure the password is hashed

userSchema.pre('save', async function(next) {
  // if the password hasn't been modified when user profile is updated then we continue
  if(!this.isModified('password')) {
    next();
  }  
  // then we hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// to validate password during login process
userSchema.methods.isPasswordCorrect = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
