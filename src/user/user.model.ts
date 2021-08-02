import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    gender : {
        type: String,
        required:true
    },
    password: {
        type: String
    },
    userType: {
        type: String,
        default: 'STANDARD'
    },
    createdDate: {
        type: Date,
        default: new Date(),
    },
    accountType: {
        type: String,
        required: true
    },
    accountStatus: {
        type: Number,
        default: 0
    }
})

export interface User extends mongoose.Document{
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    gender:string,
    password: string,
    userType: string,
    createdDate: Date,
    accountType: string,
    accountStatus: number,
}