import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const unverifiedUserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

unverifiedUserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

unverifiedUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

export const UnverifiedUser = mongoose.model(
    "UnverifiedUser",
    unverifiedUserSchema
);
