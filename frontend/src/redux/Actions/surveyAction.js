import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

///backend_url imported from constants
const URL = BACKEND_URL + "api/v1/survey";

export const createSurvey = (details) => async (dispatch) => {      
    try {
        dispatch({
            type: "CREATE_SURVEY_REQUEST",
        });

        const { data } = await axios.post(`${URL}`, details, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        dispatch({
            type: "CREATE_SURVEY_SUCCESS",
            payload: {
                message: data.message,
                data: data.data,
            },
        });
    } catch (error) {
        dispatch({
            type: "CREATE_SURVEY_FAILURE",
            payload: error?.response?.data?.message,
        });
    }
}

export const getAllSurveys = () => async (dispatch) => {
    try {
        dispatch({
            type: "GET_ALL_SURVEYS_REQUEST",
        });

        const { data } = await axios.get(`${URL}/all`, {
            withCredentials: true,
        });

        dispatch({
            type: "GET_ALL_SURVEYS_SUCCESS",
            payload: {
                message: data.message,
                data: data.data,
            },
        });
    } catch (error) {
        dispatch({
            type: "GET_ALL_SURVEYS_FAILURE",
            payload: error?.response?.data?.message,
        });
    }
}

export const getSurveyById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_SURVEY_BY_ID_REQUEST",
        });

        const { data } = await axios.get(`${URL}/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "GET_SURVEY_BY_ID_SUCCESS",
            payload: {
                message: data.message,
                data: data.data,
            },
        });
    } catch (error) {
        dispatch({
            type: "GET_SURVEY_BY_ID_FAILURE",
            payload: error?.response?.data?.message,
        });
    }
}   

export const getSurveyByUserId = () => async (dispatch) => {
    try {
        dispatch({
            type: "GET_SURVEY_BY_USER_ID_REQUEST",
        });

        const { data } = await axios.get(`${URL}/user`, {
            withCredentials: true,
        });

        dispatch({
            type: "GET_SURVEY_BY_USER_ID_SUCCESS",
            payload: {
                message: data.message,
                data: data.data,
            },
        });
    } catch (error) {
        dispatch({
            type: "GET_SURVEY_BY_USER_ID_FAILURE",
            payload: error?.response?.data?.message,
        });
    }
}

