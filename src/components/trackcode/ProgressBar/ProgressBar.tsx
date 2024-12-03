import React from "react";


type Step = {
    label: string;
    date?: string;
    isActive: boolean;
  };
  
  interface ProgressBarProps {
    steps: Step[];
  }
  
  const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
    return (
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step.isActive ? "bg-blue-600 text-white" : "bg-gray-300"
                }`}
              >
                {step.isActive && <div className="w-3 h-3 bg-white rounded-full"></div>}
              </div>
              <span
                className={`text-sm ${
                  step.isActive ? "text-blue-600" : "text-gray-500"
                } mt-1`}
              >
                {step.date || ""}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-grow ${
                  steps[index + 1].isActive ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  export default ProgressBar;