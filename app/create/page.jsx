"use client";
import React, { useState } from "react";
import SelectOptions from "./_components/SelectOptions";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";


function Create() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {user} = useUser();

  const handleUserInput = (fieldName, fieldValue) => {

    setFormData(prev=>({
      ...prev,
      [fieldName]: fieldValue
    }))

    console.log(formData);
  };

  // this method save user input and to generate the course Layout
  // const GenerateCourseOutline = async ()=>{
  //   const courseId = uuidv4();
  //   const result = await axios.post('/api/generate-course-outline',{
  //     courseId: courseId,
  //     ...formData,
  //     createdBy:user?.primaryEmailAddress?.emailAddress
  //   })

  //   console.log(result);
  // }

  const GenerateCourseOutline = async () => {
    try {
      const courseId = uuidv4();
      setLoading(true);
      const result = await axios.post('/api/generate-course-outline', {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setLoading(false);
      router.replace('/dashboard');
      console.log(result.data.result.resp);
    } catch (error) {
      console.error('Error generating course outline:', error.response?.data || error.message);
    }
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
            selectedStudyType={(value) => handleUserInput("courseType", value)}
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
          <Button onClick={GenerateCourseOutline} disabled={loading}>{loading?<Loader className="animate-spin"/>:"Generate"}</Button>
        )}
      </div>
    </div>
  );
}

export default Create;
