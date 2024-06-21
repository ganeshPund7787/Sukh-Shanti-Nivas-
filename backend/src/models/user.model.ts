import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcryptjs.hashSync(this.password, 10);
  }
  next();
});

export const User = mongoose.model<UserType>("User", userSchema);
