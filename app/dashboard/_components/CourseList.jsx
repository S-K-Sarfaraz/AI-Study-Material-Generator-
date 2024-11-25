'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCareItem from './CourseCareItem';

function CourseList() {
    const {user} = useUser();
    const [courseList, setCourseList] = useState([]);

    useEffect(()=>{
        user && GetCourseList();
    },[user])

    const GetCourseList = async () => {
        const result = await axios.post('/api/cources',{
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        console.log(result);
        setCourseList(result.data.result);
    }
  return (
    <div className='mt-10'>
        <h2 className='text-2xl font-bold'>Your Study Materials</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList.map((course,index)=>(
            <CourseCareItem course={course} key={index} />
        ))}
        </div>
    </div>
  )
}

export default CourseList