import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import request from '../../../utils/request';

const DetailsUserCourse = () => {
    const params = useParams();
    const location = useLocation();
    const { pathname } = location;
    
    const [sessions, setSessions] = useState([]);
    const [course, setCourse] = useState({});


    const dataHandler = async ()=>{
        const { data } = await request.get(`/api/course/one/${params.id}`);
        setCourse(data.data)
        setSessions(data.data.sessions)
    }

    useEffect(() => {
        dataHandler();
        console.log(sessions);
    }, [sessions])


    return (
        <div className='text-2xl  min-h-screen'>
            <h1>{course.title}</h1>

            <div className="overflow-x-auto custom-scroll mt-5 rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">العنوان</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">الوصف</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">اخري</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            sessions.map((session)=>{
                                return (
                                    <tr>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{session.title}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{session.shortDescription}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <Link to={`${pathname}/${session._id}`} className='inline-block rounded bg-yellow-500 px-4 py-2 text-xs font-medium text-white hover:bg-yellow-600 transition-all'>مشاهدة</Link>
                                    </td>
                                </tr>
        
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DetailsUserCourse
