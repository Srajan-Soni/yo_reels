import bcrypt from "bcryptjs";
import mongoose,{model,models} from "mongoose";

export interface IUser extends mongoose.Document {
    email: string;  
    password: string;
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updtatedAt: Date;

} 

const UserSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updtatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;