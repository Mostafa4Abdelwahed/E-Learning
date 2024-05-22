import React, { useEffect, useState } from 'react'
import Payments from './payments'
import Recive from './recive'
import { useParams } from 'react-router-dom'
import request from '../../utils/request'


const Checkout = () => {
    let [isOpen, setIsOpen] = useState(false)
    const [course, setCourse] = useState({})
    const [payments, setPayments] = useState([]);
    const params = useParams();
    const CourseHandler = async ()=>{
        const { data } = await request.get(`/api/course/${params.CourseSlug}`);
        setCourse(data.data)
    }

    const PaymentsHandler = async () => {
        const { data } = await request.get("/api/payment");
        setPayments(data.data);
    }

    useEffect(() => {
        CourseHandler();
        PaymentsHandler();
    }, [course, payments])
    
    return (
        <div>
            <Recive title={course.title} price={course.price}/>
            <span className="flex items-center mt-5">
            <span className="h-1 border-[#ccc] border-t border-b flex-1 bg-gray-200"></span>
                <span className="shrink-0 px-6 text-xl">طرق الدفع</span>
                <span className="h-1 border-[#ccc] border-t border-b flex-1 bg-gray-200"></span>
            </span>
            <Payments payments={payments} course={course} />
        </div>
    )
}

export default Checkout
