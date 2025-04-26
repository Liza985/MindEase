import mongoose from "mongoose";

const surveySchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		questions: {
			type: Object,
			required: true,
		},
		result: {
			prediction: {
				type: String,
				required: true,
			},
			confidence: {
				type: Number,
				required: true,
			},
			categoryScores: {
				type: Object,
				required: true,
			},
			overallPercentage: {
				type: Number,
				required: true,
			},
		},
	},
	{
		timestamps: true,
	},
);

const Survey = mongoose.model("Survey", surveySchema);
export default Survey;
