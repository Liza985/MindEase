// import React from "react";
import {
    CircularProgressbarWithChildren,
    buildStyles,
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  
  const getColor = (value) => {
    if (value < 35) return "#1cc88a";     // Green for Low
    if (value < 70) return "#f6c23e";     // Yellow for Moderate
    return "#e74a3b";                     // Red for High/Severe
  };
  
  const getLabel = (value) => {
    if (value < 35) return "Low";
    if (value < 70) return "Moderate";
    if (value < 85) return "High";
    return "Critical";
  };
  
  const RiskGauge = ({ percentage }) => {
    const color = getColor(percentage);
    const label = getLabel(percentage);
  
    return (
      <div style={{ width: 200, height: 100 }}>
        <CircularProgressbarWithChildren
          value={percentage}
          maxValue={100}
          circleRatio={0.5}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: "round",
            trailColor: "#eee",
            pathColor: color,
          })}
        >
          <div style={{ marginTop: -5 }}>
            <strong style={{ fontSize: 20 }}>{percentage.toFixed(0)}%</strong>
            <div style={{ fontSize: 14, color }}>{label} Risk</div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    );
  };
  
  export default RiskGauge;
  
