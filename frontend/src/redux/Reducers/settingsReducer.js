const initialState = {
	settings: null,
	loading: false,
	error: null,
	message: null,
};

export const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_SETTINGS_REQUEST":
		case "UPDATE_SETTINGS_REQUEST":
			return {
				...state,
				loading: true,
			};

		case "GET_SETTINGS_SUCCESS":
			return {
				...state,
				loading: false,
				settings: action.payload.settings,
				error: null,
			};

		case "UPDATE_SETTINGS_SUCCESS":
			return {
				...state,
				loading: false,
				settings: action.payload.settings,
				message: action.payload.message,
				error: null,
			};

		case "GET_SETTINGS_FAILURE":
		case "UPDATE_SETTINGS_FAILURE":
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case "CLEAR_SETTINGS_MESSAGE":
			return {
				...state,
				message: null,
			};

		case "CLEAR_SETTINGS_ERROR":
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
