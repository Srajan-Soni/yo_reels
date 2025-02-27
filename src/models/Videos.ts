import mongoose,{ Schema,model,models } from "mongoose";

export const VIDEO_DIMENTION = {
    width: 1080, 
    height: 1920
} as const;

export interface IVideos extends mongoose.Document {

    title: string;
    description: string;
    videoUrl: string;
    _id: mongoose.Types.ObjectId;
    thumbnailsUrl: string;
    controls: boolean;
    transformation : {
        height: number;
        width: number;
        quality?: number;
    }
    createdAt: Date;
    updatedAt: Date;
}

const videoSchema = new Schema<IVideos>({
    title: {
        type: String,   
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailsUrl: {
        type: String,
        required: true
    },
    controls: {
        type: Boolean,
        required: true
    },
    transformation: {
        type: {
            height: {
                type: Number,
                default : VIDEO_DIMENTION.height
            },
            width: {
                type: Number,
                default : VIDEO_DIMENTION.width
            },
            quality: {
                type: Number,
                min: 1,
                max: 100
            }
        },
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


const Video = models?.Video || model<IVideos>("Video", videoSchema);

export default Video;