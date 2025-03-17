import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

///backend_url imported from constants
const url = BACKEND_URL + "api/v1/review";

export const createReview = (details) => async (dispatch) => {
	try {
		dispatch({
			type:"CREATE_REVIEW_REQUEST"
		})

		const {data}=await axios.post(`${url}/create`,details,{
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		})
		dispatch({
			type:"CREATE_REVIEW_SUCCESS",
			payload:{
				message:data.message,
				data:data.data
			}
		})
	} catch (error) {
		dispatch({
			type:"CREATE_REVIEW_FAILURE",
			payload: error.response?.data?.message|| "Something went wrong",
		})
	}
};

export const getAllReviews = () => async (dispatch) => {
	try {
		dispatch({
			type:"GET_ALL_REVIEWS_REQUEST"
		})

		const {data}=await axios.get(`${url}/all`,{
			withCredentials:true
		})

		dispatch({
			type:"GET_ALL_REVIEWS_SUCCESS",
			payload:{
				message:data.message,
				data:data.data
			}
		})
	} catch (error) {
		dispatch({
			type:"GET_ALL_REVIEWS_FAILURE",
			payload: error.response?.data?.message|| "Something went wrong",
		})
	}
};

export const getReviewsByVolId = () => async (dispatch) => {
	try {
		dispatch({
			type:"GET_REVIEWS_BY_VOL_ID_REQUEST"
		})

		const {data}=await axios.get(`${url}/volunteer`,{
			withCredentials:true
		})

		dispatch({
			type:"GET_REVIEWS_BY_VOL_ID_SUCCESS",
			payload:{
				message:data.message,
				data:data.data
			}
		})
	} catch (error) {
		dispatch({
			type:"GET_REVIEWS_BY_VOL_ID_FAILURE",
			payload: error.response?.data?.message|| "Something went wrong",
		})
	}
};

export const getReviewsByUserId = () => async (dispatch) => {
	try {
		dispatch({
			type:"GET_REVIEWS_BY_USER_REQUEST"
		})

		const {data}=await axios.get(`${url}/user`,{
			withCredentials:true,
		})
		dispatch({
			type:"GET_REVIEWS_BY_USER_SUCCESS",
			payload:{
				message:data.message,
				data:data.data,
			}
		})
	} catch (error) {
		dispatch({
			type:"GET_REVIEWS_BY_USER_FAILURE",
			payload: error.response?.data?.message|| "Something went wrong",
		})
	}
};

export const getReviewByRating = (rating) => async (dispatch) => {
	try {

		dispatch({
			type:"GET_REVIEW_BY_RATING_REQUEST"
		})

		const {data}=await axios.get(`${url}/${rating}`,{
			withCredentials:true,
		})
		dispatch({
			type:"GET_REVIEW_BY_RATING_SUCCESS",
			payload:{
				message:data.message,
				data:data.data
			}
		})
	} catch (error) {
		dispatch({
			type:"GET_REVIEW_BY_RATING_FAILURE",
			payload: error.response?.data?.message|| "Something went wrong",
		})
	}
};
