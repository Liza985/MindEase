import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

const url = `${BACKEND_URL}/api/v1/content`;


export const addContent = (details) => async (dispatch) => {
  try {
    dispatch({ 
      type: "ADD_CONTENT_REQUEST"
    });

    const { data } = await axios.post(`${url}/create`, details, {
      headers: { 
           "Content-Type": "application/json" 
      },
      withCredentials: true,
    });

    dispatch({
       type: "ADD_CONTENT_SUCCESS",
       payload: { 
            message: data.message,
            data: data.data
       }
      });
  } catch (error) {
    dispatch({ type: "ADD_CONTENT_FAILURE", payload: error.response?.data?.message || "Something went wrong",
    });
  }
};


export const deleteContent = (id) => async (dispatch) => {
  try {
    dispatch({ 
      type: "DELETE_CONTENT_REQUEST"
    });

    const{data} = await axios.delete(`${url}/delete/${id}`, {
       withCredentials: true,
    });

    dispatch({ 
      type: "DELETE_CONTENT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({ 
      type: "DELETE_CONTENT_FAILURE", 
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};


export const updateContent = (id, details) => async (dispatch) => {
  try {
    dispatch({
       type: "UPDATE_CONTENT_REQUEST"
      });

    const { data } = await axios.put(`${url}/update/${id}`, details, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({ 
      type: "UPDATE_CONTENT_SUCCESS",
      payload: { 
        message: data.message, 
        data: data.data
      },
    });
  } catch (error) {
    dispatch({ type: "UPDATE_CONTENT_FAILURE", payload: error.response?.data?.message || "Something went wrong",
     });
  }
};


export const getAllContent = () => async (dispatch) => {
  try {
    dispatch({ 
      type: "GET_ALL_CONTENT_REQUEST"
    });

    const { data } = await axios.get(`${url}/all`, { 
      withCredentials: true,
    });
    dispatch({ 
      type: "GET_ALL_CONTENT_SUCCESS", 
      payload: { 
        message: data.message,
				data: data.data,
      },
    });
  } catch (error) {
    dispatch({ 
      type: "GET_ALL_CONTENT_FAILURE", payload: error.response?.data?.message || "Something went wrong",
    });
  }
};


export const getContentById = (id) => async (dispatch) => {
  try {
    dispatch({
       type: "GET_CONTENT_BY_ID_REQUEST"
    });

    const { data } = await axios.get(`${url}/${id}`, {
       withCredentials: true,
      });
    dispatch({
       type: "GET_CONTENT_BY_ID_SUCCESS", 
       payload: {
				message: data.message,
				data: data.data,
			},
    });
  } catch (error) {
    dispatch({
      type: "GET_CONTENT_BY_ID_FAILURE", payload: error.response?.data?.message || "Something went wrong",
    });
  }
};


export const getContentByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_CONTENT_BY_CATEGORY_REQUEST"
    });

    const { data } = await axios.get(`${url}/category/${category}`, { 
      withCredentials: true,
    });

    dispatch({ 
      type: "GET_CONTENT_BY_CATEGORY_SUCCESS",
      payload: {
				message: data.message,
				data: data.data,
			},
    });
  } catch (error) {
    dispatch({ type: "GET_CONTENT_BY_CATEGORY_FAILURE", payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
