import * as mongoose from 'mongoose'

export const verifyAccountSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    verificationCode:{
        type:Number,
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

export interface VerifyAccount extends mongoose.Document{
    _id: string,
    userId: string,
    verficationCode: number,
    isVerified: boolean,
}