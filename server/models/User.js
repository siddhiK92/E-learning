import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        _id: {type: String, required: true},
        name: {type: String, require: true},
        email: {type: String, require: true},
        imageUrl: {type: String, require: true},
        enrolledCourse: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ],
    }, {timestamps: true});

    const User = mongoose.model('User', userSchema);

    export default User