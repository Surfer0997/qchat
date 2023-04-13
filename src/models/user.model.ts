import mongoose from "mongoose";
import createModel from "../lib/mongoDB/createModel";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


interface UserInput {
  nickname: String;
  password: String;
  date: Date;
  
}
interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  fullName(): string;
  fullName2(): string;
  comparePassword(candidatePassword: string): boolean;
  generateAuthToken(): string;
}
// interface IUserMethods {
//   fullName(): string;
//   comparePassword(candidatePassword: string): boolean;
//   generateAuthToken(): string;
//   nicknameTaken(nickname: string): boolean;
// }
// type UserModel = Model<UserInput, {}, IUserMethods>;

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    maxLength: 100,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Bro... Just how I have to do it without password?"],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.method("fullName", function fullName() {
  return this.nickname + " " + this.password;
});
userSchema.virtual("fullName2").get(function fullName(this:UserDocument) {
  return this.nickname + " " + this.password;
});
userSchema.method(
  "comparePassword",
  async function (this: UserDocument, candidatePassword: string) {
    // candidatePassword - unhashed password
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match as boolean;
  }
);
userSchema.method("generateAuthToken", function generateAuthToken(this:UserDocument) {
  const user = this;
  const userObj = { sub: user._id, nickname: user.nickname };
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "1d" });
  return token;
});



userSchema.pre("save", async function (this: UserDocument, next) {
  const user = this;
  // @ts-ignore
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

// @ts-ignore
export default createModel<UserDocument>("User", userSchema);
