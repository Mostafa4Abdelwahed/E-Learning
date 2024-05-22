import { Fragment, useState } from 'react'
import { RiImageEditLine } from "react-icons/ri";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Input, Field, Label, Description } from '@headlessui/react'
import { Link } from 'react-router-dom'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const box = ({ course }) => {
    let [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(course.title);
    const [price, setPrice] = useState(course.price);
    const { user } = useSelector(state => state.auth)

    const updateCourseHandler = async () => {
        const { data } = await request.put(`/api/course/${course._id}`, {
            title: title,
            price: price
        }, {
            headers: {
                Authorization: user.token
            }
        }).then(() => { return toast.success("تم تحديث الكورس بنجاح") }).then(() => { setIsOpen(false) })
    }

    return (
        <Fragment>
            <div className="block relative rounded-lg p-4 shadow-sm bg-gray-800 shadow-gray-300">
                {/* <label htmlFor="thumbnail" className="absolute bg-indigo-500 -right-1 -top-1 p-3 cursor-pointer text-center text-3xl rounded-full">
                   <span><RiImageEditLine /></span>
                   <input name='thumbnail' id='thumbnail' type="file" className='hidden' />
                </label> */}
                <img
                    alt=""
                    src={course?.thumbnail?.url}
                    className="h-auto w-full rounded-md object-cover"
                />
                <h1 className='my-2 bg-indigo-500 text-white rounded py-2 text-center'><span>{course?.price}</span> جنيه مصري</h1>
                <div>
                    <div>
                        <dd className="font-medium text-xl">{course?.title}</dd>
                    </div>
                    <div className="grid grid-cols-1 shrink-0 justify-between items-center gap-2 mt-4">
                        <Link to={`/dashboard/courses/${course?.id}`} className='hover:bg-indigo-500 text-center hover:text-white transition-all border-indigo-600 border-2 text-gtay-900 rounded-full text-base py-2 px-5 space-x-2 space-x-reverse'>عرض الكورس</Link>
                        <Link onClick={() => { setIsOpen(true) }} className='bg-indigo-500 text-center text-slate-100 rounded-full text-base  py-2 px-5 space-x-2 space-x-reverse'>تحديث للكورس</Link>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-8 text-xs">
                    <div className="inline-flex shrink-0 items-center gap-2">
                        <span className="text-xl"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m11.17 8l-.59-.59L9.17 6H4v12h16V8zM14 10h2v2h2v2h-2v2h-2v-2h-2v-2h2z" opacity=".3"></path><path fill="currentColor" d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m0 12H4V6h5.17l1.41 1.41l.59.59H20zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"></path></svg></span>                                    <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-300">تاريخ الانشاء</p>
                            <p className="font-medium">{course?.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => { setIsOpen(false) }}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="w-full max-w-lg rounded-xl shadow-2xl border border-white bg-gray-900 p-6">
                                    <DialogTitle as="h1" className="font-bold text-xl mb-5 text-white">
                                        تحديث الكورس
                                    </DialogTitle>
                                    <Field>
                                        <Label className="text-sm/6 mr-1 font-medium text-white">العنوان</Label>
                                        <Input value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder={course.title}
                                            className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        />
                                    </Field>
                                    <Field className="mt-3">
                                        <Label className="text-sm/6 font-medium text-white">السعر</Label>
                                        <Input value={price} onChange={(e) => { setPrice(e.target.value) }} type='number' placeholder={course.price}
                                            className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        />
                                    </Field>



                                    <div className="mt-7">
                                        <button onClick={updateCourseHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>تحديث</button>
                                        <button onClick={() => { setIsOpen(false) }} className='inline-block rounded bg-indigo-600 mr-5 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </Fragment>

    )
}

export default box