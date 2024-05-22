import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import HelmetHandler from '../../../utils/helmetHandler';
import request from '../../../utils/request';
import Box from "./components/box"

const Courses = () => {
  const { user } = useSelector(state => state.auth);
  const [courses, setCourses] = useState([]);
  const getCoursesUser = async () => {
    const { data } = await request.get(`/api/auth/users/${user.id}`, {
      headers: {
        "Authorization": user.token
      }
    })
    const courses = data.data.courses;
    setCourses(courses);
  }
  useEffect(() => {
    getCoursesUser();
  }, [])
  return (
    <div className='min-h-screen'>
      <HelmetHandler title="كورساتي" />
      <h1 className='text-2xl'>كورساتي</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-10">
        {
          courses.map((course)=>{
            return <Box course={course} />
          })
        }
        
      </div>
    </div>
  )
}

export default Courses
