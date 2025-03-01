import React from "react";

const StatCard = ({ title, value, increase, icon }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<div className="flex justify-between items-start">
				<div>
					<h3 className="text-gray-500 font-medium">{title}</h3>
					<p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
					<p className="text-sm text-green-500 mt-1">{increase} this month</p>
				</div>
				<div className="p-3 bg-orange-100 rounded-lg">{icon}</div>
			</div>
		</div>
	);
};
export default StatCard;
