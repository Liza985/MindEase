const toastOptions = {
	position: "bottom-center",
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: "light",
	style: { background: "white", color: "black" },
};

// Special styling for success
export const successToastOptions = {
	...toastOptions,
	className: "custom-toast-success",
	progressStyle: { background: "orange !important" },
};

export default toastOptions;
