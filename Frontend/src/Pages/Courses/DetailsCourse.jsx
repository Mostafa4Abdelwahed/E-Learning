import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import request from '../../utils/request';
import { Item } from "./faq"
import SkeletonDetailsCourse from "./skeletonDetailsCourse"
import HelmetHandler from '../../utils/helmetHandler';

const DetailsClasses = () => {
    const params = useParams();
    const location = useLocation();
    const { pathname } = location;
    const [course, setCourse] = useState({});
    const [sessions, setSessions] = useState([]);
    const getCourseOnly = async () => {
        const { data } = await request.get(`/api/course/${params.CourseSlug}`)
        setCourse(data.data)
        setSessions(data.data.sessions)
    }
    useEffect(() => {
        getCourseOnly();
    }, [course, sessions])

    return (
        <>
            <HelmetHandler title={`${course.title}`} />
            <div className='bg-cyan-900'>
                {
                    course.id ?
                        <div className='max-w-screen-xl p-0 md:p-10 mx-auto'>
                            <div className="flex flex-col-reverse items-center justify-center md:flex-row gap-0 md:gap-10">
                                <div className="md:basis-2/3 p-5 md:p-0">
                                    <img className='rounded-2xl' src={course?.thumbnail?.url} alt="Thumbnail" />
                                </div>
                                <div className="md:basis-1/3 p-5 md:p-0">
                                    <div className="block relative rounded-lg p-4 shadow-sm bg-white shadow-gray-300">
                                        <img
                                            alt=""
                                            src={course?.thumbnail?.url}
                                            className="h-auto w-full rounded-md object-cover"
                                        />
                                        <h1 className='my-2 bg-teal-500 text-white rounded py-2 text-center'><span>{course?.price}</span> جنيه مصري</h1>
                                        <div>
                                            <div>
                                                <dd className="font-medium text-xl mt-4">{course?.title}</dd>
                                            </div>
                                            <div className="grid grid-cols-1 shrink-0 justify-between items-center gap-2 mt-4">
                                                <Link to={`${pathname + "/checkout"}`} className='bg-teal-500 text-center text-white transition-all border-teal-500 border-2 text-gtay-900 rounded-full text-base py-2 px-5 space-x-2 space-x-reverse'>اشترك الان!</Link>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-8 text-xs">
                                            <div className="inline-flex shrink-0 items-center gap-2">
                                                <span class="text-xl"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m11.17 8l-.59-.59L9.17 6H4v12h16V8zM14 10h2v2h2v2h-2v2h-2v-2h-2v-2h2z" opacity=".3"></path><path fill="currentColor" d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m0 12H4V6h5.17l1.41 1.41l.59.59H20zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"></path></svg></span>                                    <div className="mt-1.5 sm:mt-0">
                                                    <p className="text-gray-500">تاريخ الانشاء</p>

                                                    <p className="font-medium">{course?.createdAt}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <span className="flex items-center mt-7">
                                <span className="h-px flex-1 bg-white"></span>
                                <span className="shrink-0 px-6 text-white text-2xl">محتوي الكورس</span>
                                <span className="h-px flex-1 bg-white"></span>
                            </span>

                            {
                                sessions.map((s) => {
                                    return (
                                        <Item title={s?.title}>
                                            <h1>{s?.shortDescription}</h1>
                                        </Item>
                                    )
                                })
                            }
                        </div>

                        :
                        <SkeletonDetailsCourse />

                }
            </div>
        </>
    )
}

export default DetailsClasses
