"use client";
import React, { useState } from "react";
import SelectOptions from "./_components/SelectOptions";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";

function Create() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);

  const handleUserInput = (fieldName, fieldValue) => {

    setFormData(prev=>({
      ...prev,
      [fieldName]: fieldValue
    }))

    console.log(formData);

  };
  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-4xl text-primary">
        Start Creating Your Personal Study Material
      </h2>
      <p className="text-gray-500 text-lg">
        Fill all details in order to generate your study material !!
      </p>
      <div className="mt-10">
        {step == 0 ? (
          <SelectOptions
            selectedStudyType={(value) => handleUserInput("studyType", value)}
          />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            setDifficultyLevel={(value) =>
              handleUserInput("difficultyLevel", value)
            }
          />
        )}
      </div>
      <div className="flex justify-between w-full mt-32">
        {step != 0 ? (
          <Button variant={"outline"} onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        ) : (
          "Click Next to generate all types of coursed"
        )}
        {step == 0 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button>Generate Course</Button>
        )}
      </div>
    </div>
  );
}

export default Create;
