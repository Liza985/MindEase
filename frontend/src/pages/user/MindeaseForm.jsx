import React, { useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';

const MindeaseForm = () => {
  const [formData, setFormData] = useState({
    Sleep: "", Appetite: "", Interest: "", Fatigue: "",
    Worthlessness: "", Concentration: "", Agitation: "", SuicidalIdeation: "",
    SleepDisturbance: "", Aggression: "", PanicAttacks: "", Hopelessness: "",
    Restlessness: "", LowEnergy: "",
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [validationError, setValidationError] = useState(false);

  const sections = [
    { title: "Sleep & Energy", fields: ["Sleep", "SleepDisturbance", "Fatigue", "LowEnergy"] },
    { title: "Mood & Emotions", fields: ["Worthlessness", "Hopelessness", "Aggression", "Interest"] },
    { title: "Physical Symptoms", fields: ["Appetite", "Agitation", "Restlessness", "PanicAttacks"] },
    { title: "Cognition & Thoughts", fields: ["Concentration", "SuicidalIdeation"] },
  ];

  const frequencyOptions = [
    { value: "1", label: "Never" },
    { value: "2", label: "Rarely" },
    { value: "3", label: "Sometimes" },
    { value: "4", label: "Often" },
    { value: "5", label: "Always" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateSection = () => {
    const currentFields = sections[currentSection].fields;
    for (let field of currentFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  const nextSection = () => {
    if (validateSection()) {
      setValidationError(false);
      setCurrentSection(prev => prev + 1);
    } else {
      setValidationError(true);
    }
  };

  const prevSection = () => {
    setValidationError(false);
    setCurrentSection(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAllFields()) {
      alert("Assessment submitted successfully!");
    } else {
      alert("Please complete all sections before submitting.");
    }
  };

  const validateAllFields = () => {
    for (let section of sections) {
      for (let field of section.fields) {
        if (!formData[field]) {
          return false;
        }
      }
    }
    return true;
  };

  const renderRadioGroup = (name, label, options) => {
    return (
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2 text-gray-700">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {options.map((option) => (
            <div key={`${name}-${option.value}`} className="relative">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={formData[name] === option.value}
                onChange={handleChange}
                className="hidden"
                required
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className={`block py-2 px-4 text-sm rounded-full border-2 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-sm ${formData[name] === option.value ? 'border-blue-400 bg-blue-400 text-white font-medium' : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-100'}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-orange-50 to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-orange-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">MindEase Assessment</h1>
            <p className="text-orange-50 mt-1">Please answer all questions honestly.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-7 py-3 mb-5">
            {validationError && alert("Please answer all questions in this section before proceeding.")}
            <h2 className="text-xl font-semibold text-blue-600">{sections[currentSection].title}</h2>
            {sections[currentSection].fields.map(field => renderRadioGroup(field, field.replace(/([A-Z])/g, ' $1').trim(), frequencyOptions))}

            <div className="mt-8 flex justify-between">
              {currentSection > 0 && (
                <button type="button" onClick={prevSection} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md">Previous</button>
              )}
              {currentSection < sections.length - 1 ? (
                <button type="button" onClick={nextSection} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md">Next</button>
              ) : (
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md">Submit</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MindeaseForm;