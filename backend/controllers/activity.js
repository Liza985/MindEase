import Activity from "../models/activity.js";

export const getAllActivities = async (req, res) => {
	try {
		const activities = await Activity.find()
			.populate("userId")
			.populate("volunteerId");
		
		if (!activities) {
			return Response(res, 404, false, "No activities found");
		}

		Response(res, 200, true, "Activities retrieved successfully", activities);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getActivityById = async (req, res) => {
	try {
		const { id } = req.params;

		const activity = await Activity.findById(id)
			.populate("userId")
			.populate("volunteerId");

		if (!activity) {
			return Response(res, 404, false, "Activity not found");
		}

		Response(res, 200, true, "Activity retrieved successfully", activity);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
