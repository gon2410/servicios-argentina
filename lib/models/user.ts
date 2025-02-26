import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        emailVerified: {type: Boolean, default: false},
        image: {type: String},
        password: {type: String},
        ocupation: {type: String},
        location: {type: String},
        bio: {type: String}
    },
    {
        timestamps: true
    }
);

const User = models.User || model("User", UserSchema);

export default User;