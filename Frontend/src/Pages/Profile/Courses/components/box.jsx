import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const box = ({course}) => {
    const location = useLocation();
    const { pathname } = location
    return (
        <div className="block relative rounded-lg p-4 shadow-sm bg-white shadow-gray-300">
            <img
                alt=""
                src={course.thumbnail.url}
                className="h-auto w-full rounded-md object-cover"
            />
            <div>
                <div>
                    <dd className="font-medium text-xl mt-4">{course.title}</dd>
                </div>
                <div className="grid grid-cols-1 justify-between items-center gap-2 mt-4">
                    <Link to={`${pathname}/${course._id}`} className='bg-teal-500 text-center text-white transition-all border-teal-500 border-2 text-gtay-900 rounded-full text-base py-2 px-5 space-x-2 space-x-reverse'>مشاهدة</Link>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-8 text-xs">
                <div className="inline-flex items-center gap-2">
                    <span class="text-xl"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m11.17 8l-.59-.59L9.17 6H4v12h16V8zM14 10h2v2h2v2h-2v2h-2v-2h-2v-2h2z" opacity=".3"></path><path fill="currentColor" d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m0 12H4V6h5.17l1.41 1.41l.59.59H20zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"></path></svg></span>                                    <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">تاريخ الانشاء</p>

                        <p className="font-medium">{course.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default box