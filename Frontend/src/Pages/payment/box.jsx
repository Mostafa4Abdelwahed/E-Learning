import React, { useEffect, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import request from '../../utils/request'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { toast } from 'react-toastify'

const box = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [screen, setScreen] = useState("");
    const [phone, setPhone] = useState("");
    const params = useParams();
    const CourseSlug = params.CourseSlug;
    const { user } = useSelector(state => state.auth)



    const HandleData = async () => {
        const form = new FormData();

        form.append('CourseId', props.course._id);
        form.append('CourseName', props.course.title);
        form.append('PaymentName', props.payment.name);
        form.append('DescPay', phone);
        form.append('image', screen);
        form.append('Price', props.course.price);

        if(phone.trim() === "" || screen  === ""){
            return toast.error("برجاء ملئ جميع الحقول")
        }

        const { data } = await request.post(`/api/order/${user.id}`, form, {
            headers: {
                Authorization: user.token,
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(data);
        if(data.message === "Order Added Successfully"){
            return swal({
                title: "تم إرسال  طلبك بنجاح, برجاء الانتظار",
                icon: "success"
            }).then((isOk)=>{
                if(isOk){
                    setIsOpen(false)
                }
            })
        }else{
            return toast.error(data.message)
        }
    }

    return (
        <>
            <a onClick={() => setIsOpen(true)} className='p-5 cursor-pointer block rounded bg-neutral-100 border-neutral-100 border'>
                <img className='w-[80px] mx-auto rounded mt-[-30px]' src={props.payment.logo.url} alt="Icon" />
                <span className='block mt-[15px] font-bold text-black text-xl'>{props.payment.name}</span>
                {/* <span className='block mt-[15px] font-bold text-black text-xl'>{CourseSlug}</span> */}
            </a>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-[450px] shadow-xl space-y-4 rounded-xl border bg-slate-900 p-12">
                        <div className="logo"><img src={props.payment.logo.url} alt="Logo" className='w-16 -mb-3 rounded-xl mx-auto' /></div>
                        <h1 className='text-center font-bold text-white'>{props.payment.name}</h1>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white">رقم الحساب</Label>
                            <Description className="text-sm/6 text-white/50">هنا تقوم بكتابه رقم او ايميل الذي ارسلت  منه</Description>
                            <Input value={phone} onChange={(e) => { setPhone(e.target.value) }}
                                className={'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'}
                            />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white">اسكرين شوت لعملية التحويل</Label>
                            <Input type='file' onChange={(e) => { setScreen(e.target.files[0]) }}
                                className={'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'}
                            />
                        </Field>
                        <p className='text-white py-3'>{props.payment.details}</p>
                        {/* <p className='text-white pb-2'>المبلغ : {props.course.price} ج.م</p> */}
                        <div className="flex gap-4 text-white">
                            <button className='bg-slate-800 w-full py-3 rounded cursor-pointer hover:opacity-75 transition-all hover:translate-y-2' onClick={() => { HandleData() }}>التأكيد</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default box
