import React, { useEffect, useState } from 'react'
import request from "../../../utils/request"
import { Link } from 'react-router-dom';


const courses = () => {
    const [classes, setClasses] = useState([]);
    const handlerClasses = async () => {
        const { data } = await request.get("/api/level");
        setClasses(data.data)
    }
    useEffect(() => {
        handlerClasses();
    }, [classes])


    return (
        <>
            <div className="m-auto py-16 bg-slate-100 px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="mb-12 space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-cyan-600 md:text-4xl">الصفوف الدراسية</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto px-5 xl:container">
                    {
                        classes.map((c) => {
                            return (
                                <Link to={`class/${c.slug}`} className="p-3 rounded-3xl bg-white border border-gray-100 bg-opacity-50 shadow-2xl shadow-gray-600/10">
                                    <div className="relative overflow-hidden rounded-xl">
                                        <img src={c.thumbnail.url}
                                            alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                                    </div>
                                        <h3 className="text-2xl mt-5 font-semibold text-gray-800">{c.title}</h3>
                                        <p className="text-gray-600 my-3">{c.description}</p>
                                        <Link to={`class/${c.slug}`} className='inline-block w-full bg-cyan-600 text-white py-2 rounded text-center my-4'>عرض المزيد</Link>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default courses
