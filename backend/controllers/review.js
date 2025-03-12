import Review from "../models/review";
import { message } from "../utils/message";
import { Response } from "../utils/response"

export const createReview=async(req,res)=>{
    try {
        const {id} =req.params;
        if(!id){
            return Response(res,400,false,message.idNotFound)
        }
        const {rating,review}=req.body;
        if(!rating ||!review){
            return Response(res,400,false,message.missingFieldMessage);
        }
        const newReview=await Review.create({
            userId:req.user._id,
            volunteerId:id,
            rating,
            review,
        })
        Response(res,201,true,message.createReviewMessage,newReview)
    } catch (error) {
        Response(res,500,false,error.message)
    }
}


export const getAllReviews=async(req,res)=>{
    try {
        const reviews=await Review.find();
        Response(res,200,true,message.reviewsFetchSuccessfulMessage,reviews)
        
    } catch (error) {
        Response(res,500,false,error.message)
    }
}


export const getReviewsByVolId=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return Response(res,400,false,message.idNotFound);
        }
        const reviews=await Review.find({volunteerId:id});
        Response(res,200,true,message.reviewsFetchSuccessfulMessage,reviews)
        
    } catch (error) {
        Response(res,500,false,error.message)
    }
}


export const getReviewsByUserId=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return Response(res,400,false,message.idNotFound);
        }
        const reviews=await Review.find({userId:id});
        Response(res,200,true,message.reviewsFetchSuccessfulMessage,reviews)
        
    } catch (error) {
        Response(res,500,false,error.message)
    }
}


export const getReviewByRating=async(req,res)=>{
    try {
        const {rating}=req.params;
        if(!rating){
            return Response(res,400,false,message.missingFieldMessage);
        }
        const reviews=await Review.find({rating});
        Response(res,200,true,message.reviewsFetchSuccessfulMessage,reviews)
    } catch (error) {
        Response(res,500,false,error.message)
    }
}

