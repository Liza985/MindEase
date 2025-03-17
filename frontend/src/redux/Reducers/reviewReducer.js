import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const createReviewRequest = createAction("CREATE_REVIEW_REQUEST");
const createReviewSuccess = createAction("CREATE_REVIEW_SUCCESS");
const createReviewFailure = createAction("CREATE_REVIEW_FAILURE");

const getAllReviewsRequest = createAction("GET_ALL_REVIEWS_REQUEST");
const getAllReviewsSuccess = createAction("GET_ALL_REVIEWS_SUCCESS");
const getAllReviewsFailure = createAction("GET_ALL_REVIEWS_FAILURE");

const getReviewsByVolIdRequest = createAction("GET_REVIEWS_BY_VOL_ID_REQUEST");
const getReviewsByVolIdSuccess = createAction("GET_REVIEWS_BY_VOL_ID_SUCCESS");
const getReviewsByVolIdFailure = createAction("GET_REVIEWS_BY_VOL_ID_FAILURE");

const getReviewsByUserIdRequest = createAction("GET_REVIEWS_BY_USER_REQUEST");
const getReviewsByUserIdSuccess = createAction("GET_REVIEWS_BY_USER_SUCCESS");
const getReviewsByUserIdFailure = createAction("GET_REVIEWS_BY_USER_FAILURE");

const getReviewByRatingRequest = createAction("GET_REVIEW_BY_RATING_REQUEST");
const getReviewByRatingSuccess = createAction("GET_REVIEW_BY_RATING_SUCCESS");
const getReviewByRatingFailure = createAction("GET_REVIEW_BY_RATING_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const reviewReducer  = createReducer(initialState, (builder) => {
	builder
		.addCase(createReviewRequest, (state) => {
			state.loading = true;
		})
		.addCase(createReviewSuccess, (state,action) => {
			state.loading = false;
			state.review = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(createReviewFailure, (state,action) => {
			state.loading = false;
			state.error = action.payload;
		})


		.addCase(getAllReviewsRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllReviewsSuccess, (state,action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.reviews = action.payload.data;
		})
		.addCase(getAllReviewsFailure, (state,action) => {
			state.loading = false;
			state.error = action.payload;
		})


                .addCase(getReviewsByVolIdRequest,(state)=>{
                        state.loading = true;
                })
                .addCase(getReviewsByVolIdSuccess,(state,action)=>{
                        state.loading=false;
                        state.message=action.payload.message;
                        state.volReview=action.payload.data;
                })
                .addCase(getReviewsByVolIdFailure,(state,action)=>{
                        state.loading = false;
			state.error = action.payload;
                })


                .addCase(getReviewsByUserIdRequest,(state)=>{
                        state.loading = true;
                })
                .addCase(getReviewsByUserIdSuccess,(state,action)=>{
                        state.loading=false;
                        state.message=action.payload.message;
                        state.review=action.payload.data;
                })
                .addCase(getReviewsByUserIdFailure,(state,action)=>{
                        state.loading = false;
			state.error = action.payload;
                })



                .addCase(getReviewByRatingRequest,(state)=>{
                        state.loading = true;
                })
                .addCase(getReviewByRatingSuccess,(state,action)=>{
                        state.loading=false;
                        state.message=action.payload.message;
                        state.rateReview=action.payload.data;
                })
                .addCase(getReviewByRatingFailure,(state,action)=>{
                        state.loading = false;
			state.error = action.payload;
                })


                .addCase(clearError, (state) => {
                        state.error = null;
                    })
                    .addCase(clearMessage, (state) => {
                        state.message = null;
                    })
});
