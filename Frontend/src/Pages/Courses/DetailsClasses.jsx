import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import request from '../../utils/request';
import HelmetHandler from "../../utils/helmetHandler"

const DetailsClasses = () => {
    const params = useParams();
    const [courses, setCourses] = useState([]);
    const [level, setLevel] = useState({});
    const getCoursesClassOnly = async () => {
        const { data } = await request.get(`/api/level/${params.slug}`)
        const Courses = data.data.courses;
        setLevel(data.data)
        setCourses(Courses)
    }
    useEffect(() => {
        getCoursesClassOnly();
    }, [])

    return (
        <>
            <HelmetHandler title={`كورسات ${level.title}`} />
            <div className='bg-cyan-900 min-h-[53vh]'>
                <div className='max-w-screen-xl p-5 md:p-10 mx-auto'>
                    <h1 className='text-3xl text-center text-white font-bold'>{level.title}</h1>

                    {
                        courses.length > 0 ?
                            <div className="grid mt-10 grid-cols-1 md:grid-cols-3 gap-8 bg-transparent md:bg-gray-100 rounded-xl p-0 md:p-8">
                                {
                                    courses.map((c) => {
                                        return (
                                            <div className="block relative rounded-lg p-4 shadow-sm bg-white shadow-gray-300">
                                                <img
                                                    alt=""
                                                    src={c.thumbnail.url}
                                                    className="h-auto w-full rounded-md object-cover"
                                                />
                                                <h1 className='my-2 bg-teal-500 text-white rounded py-2 text-center'><span>{c.price}</span> جنيه مصري</h1>
                                                <div>
                                                    <div>
                                                        <dd className="font-medium text-xl">{c.title}</dd>
                                                        {/* <p className='mt-2 text-gray-500'>عباره عن 4 اسابيع (مراجعه عن الكيمياء العضوية والعناصر الانتقاليه والتحليل الكيميائى - شرح وحل)</p> */}
                                                    </div>
                                                    <div className="grid grid-cols-1 shrink-0 justify-between items-center gap-2 mt-4">
                                                        <Link to={`/class/${level.slug}/${c.slug}/checkout`} className='hover:bg-teal-500 text-center hover:text-white transition-all border-teal-500 border-2 text-gtay-900 rounded-full text-base py-2 px-5 space-x-2 space-x-reverse'>اشترك الان!</Link>
                                                        <Link to={`/class/${level.slug}/${c.slug}`} className='bg-teal-500 text-center text-slate-100 rounded-full text-base  py-2 px-5 space-x-2 space-x-reverse'>الدخول للكورس</Link>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex items-center gap-8 text-xs">
                                                    <div className="inline-flex shrink-0 items-center gap-2">
                                                        <span class="text-xl"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m11.17 8l-.59-.59L9.17 6H4v12h16V8zM14 10h2v2h2v2h-2v2h-2v-2h-2v-2h2z" opacity=".3"></path><path fill="currentColor" d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m0 12H4V6h5.17l1.41 1.41l.59.59H20zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"></path></svg></span>                                    <div className="mt-1.5 sm:mt-0">
                                                            <p className="text-gray-500">تاريخ الانشاء</p>

                                                            <p className="font-medium">{c.createdAt}</p>
                                                        </div>
                                                    </div>

                                                    {/* <div className="inline-flex shrink-0 items-center gap-2">
                                                <span className='text-xl'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--icon-park-twotone" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><defs><mask id="iconifyReact35"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#555" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20"></path><path d="M33.542 27c-1.274 4.057-5.064 7-9.542 7c-4.477 0-8.268-2.943-9.542-7v6m19.084-18v6c-1.274-4.057-5.064-7-9.542-7c-4.477 0-8.268 2.943-9.542 7"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#iconifyReact35)"></path></svg></span>
                                                <div className="mt-1.5 sm:mt-0">
                                                    <p className="text-gray-500">اخر نحديث</p>
                                                    
                                                    <p className="font-medium">{c.updatedAt}</p>
                                                </div>
                                            </div> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            :
                            <h1 className='text-center text-2xl text-white font-bold mt-20'> جاري التحميل </h1>
                    }

                </div>
            </div>
        </>
    )
}

export default DetailsClasses
