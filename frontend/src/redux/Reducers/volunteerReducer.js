import { createAction, createReducer } from "@reduxjs/toolkit";
import { buildGetDefaultMiddleware } from './../../../node_modules/@reduxjs/toolkit/src/getDefaultMiddleware';
const initialState = {};

const volunteerLoginRequest = createAction("VOLUNTEER_LOGIN_REQUEST");
const volunteerLoginSuccess = createAction("VOLUNTEER_LOGIN_SUCCESS");
const volunteerLoginFailure = createAction("VOLUNTEER_LOGIN_FAILURE");

const volunteerRegisterRequest = createAction("VOLUNTEER_REGISTER_REQUEST");
const volunteerRegisterSuccess = createAction("VOLUNTEER_REGISTER_SUCCESS");
const volunteerRegisterFailure = createAction("VOLUNTEER_REGISTER_FAILURE");

const volunteerRegisterOtpRequest = createAction("VOLUNTEER_REGISTER_OTP_REQUEST");
const volunteerRegisterOtpSuccess = createAction("VOLUNTEER_REGISTER_OTP_SUCCESS");
const volunteerRegisterOtpFailure = createAction("VOLUNTEER_REGISTER_OTP_FAILURE");

const ResendRegisterOtpRequest = createAction("RESEND_REGISTER_OTP_REQUEST");
const ResendRegisterOtpSuccess = createAction("RESEND_REGISTER_OTP_SUCCESS");
const ResendRegisterOtpFailure = createAction("RESEND_REGISTER_OTP_FAILURE");

const loadVolunteerRequest = createAction("LOAD_VOLUNTEER_REQUEST");
const loadVolunteerSuccess = createAction("LOAD_VOLUNTEER_SUCCESS");
const loadVolunteerFailure = createAction("LOAD_VOLUNTEER_FAILURE");

const volunteerLoginOtpRequest = createAction("VOLUNTEER_LOGIN_OTP_REQUEST");
const volunteerLoginOtpSuccess = createAction("VOLUNTEER_LOGIN_OTP_SUCCESS");
const volunteerLoginOtpFailure = createAction("VOLUNTEER_LOGIN_OTP_FAILURE");


const ResendLoginOtpRequest = createAction("RESEND_LOGIN_OTP_REQUEST");
const ResendLoginOtpSuccess = createAction("RESEND_LOGIN_OTP_SUCCESS");
const ResendLoginOtpFailure = createAction("RESEND_LOGIN_OTP_FAILURE");


const forgotVolunteerPasswordRequest = createAction("FORGOT_VOLUNTEER_PASSWORD_REQUEST");
const forgotVolunteerPasswordSuccess = createAction("FORGOT_VOLUNTEER_PASSWORD_SUCCESS");
const forgotVolunteerPasswordFailure = createAction("FORGOT_VOLUNTEER_PASSWORD_FAILURE");


const resetVolunteerPasswordRequest = createAction("RESET_VOLUNTEER_PASSWORD_REQUEST");
const resetVolunteerPasswordSuccess = createAction("RESET_VOLUNTEER_PASSWORD_SUCCESS");
const resetVolunteerPasswordFailure = createAction("RESET_VOLUNTEER_PASSWORD_FAILURE");


const changeVolunteerPasswordRequest = createAction("CHANGE_VOLUNTEER_PASSWORD_REQUEST");
const changeVolunteerPasswordSuccess = createAction("CHANGE_VOLUNTEER_PASSWORD_SUCCESS");
const changeVolunteerPasswordFailure = createAction("CHANGE_VOLUNTEER_PASSWORD_FAILURE");


const logoutVolunteerRequest=createAction("LOGOUT_VOLUNTEER_REQUEST");
const logoutVolunteerSuccess = createAction("LOGOUT_VOLUNTEER_SUCCESS");
const logoutVolunteerFailure = createAction("LOGOUT_VOLUNTEER_FAILURE");



const clearError = createAction("CLEAR_ERROR");
const clearAuthError = createAction("CLEAR_AUTH_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");


export const volunteerReducer=createReducer(initialState,(builder)=>{
    builder
        .addCase(volunteerLoginRequest,(state)=>{
            state.vLoading=true;
        })
        .addCase(volunteerLoginSuccess,(state,action)=>{
            state.vLoading=false;
            state.message=action.payload.message;
            state.id=action.payload.id;
        })
        .addCase(volunteerLoginFailure,(state,action)=>{
            state.vLoading=false;
            state.error=action.payload
        })


        
})