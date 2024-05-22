import React, { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Input, Field, Label, Description, Textarea } from '@headlessui/react'
import { Link } from 'react-router-dom'
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const box = ({ payment }) => {
    const [name, setName] = useState(payment.name);
    let [isOpen, setIsOpen] = useState(false);
    let [confirmOpen, setConfirmOpen] = useState(false);
    const [description, setDescription] = useState(payment.details);
    const { user } = useSelector(state => state.auth)

    const deletePaymentHandler = async () => {
        const { data } = await request.delete(`/api/payment/${payment._id}`, {
            headers: {
                Authorization: user.token
            }
        })
        toast.success(data.message);
        setConfirmOpen(false);
    }

    const updatePaymentHandler = async () => {
        const { data } = await request.put(`/api/payment/${payment._id}`, {
            name: name,
            details: description
        }, {
            headers: {
                Authorization: user.token
            }
        })
        toast.success(data.message);
        setIsOpen(false);
    }

    return (
        <Fragment>
            <div className="group rounded-lg relative block bg-black">
                <img
                    alt=""
                    src={payment.logo.url}
                    className="absolute rounded-lg inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />

                <div className="relative p-4 sm:p-3 lg:p-3">
                    <p className="text-xl text-center mt-3 font-bold text-white sm:text-2xl">{payment.name}</p>

                    <div className="mt-32 sm:mt-48 lg:mt-64">
                        <div
                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                        >
                            <div className="grid grid-cols-1 gap-3">
                                <Link onClick={() => { setIsOpen(true) }} className='hover:bg-gray-900 text-center hover:text-white transition-all border-gray-800 border-2 text-gtay-900 rounded-lg text-base py-2 px-5 space-x-2 space-x-reverse'>تعديل</Link>
                                <Link onClick={() => { setConfirmOpen(true) }} className='bg-gray-900 text-center text-slate-100 rounded-lg text-base  py-2 px-5 space-x-2 space-x-reverse'>حذف</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Transition appear show={confirmOpen}>
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
                                        هل انت متاكد من حذف وسيله الدفع ؟
                                    </DialogTitle>
                                    <Description className="text-gray-200">
                                        إذا قمت بحذف وسله الدفع لا يمكنك استرجاعها مره اخري, إذا كنت متأكد اضغط علي  نعم
                                    </Description>
                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={deletePaymentHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>نعم</button>
                                        <button onClick={() => { setConfirmOpen(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

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
                                        تعديل وسله الدفع
                                    </DialogTitle>
                                    <Field>
                                        <Label className="text-sm/6 mr-1 font-medium text-white">الإسم</Label>
                                        <Input
                                            value={name} onChange={(e) => { setName(e.target.value) }}
                                            className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        />
                                    </Field>


                                    <Field className="mt-3">
                                        <Label className="text-sm/6 font-medium text-white">الوصف</Label>
                                        <Textarea rows={2}
                                            value={description} onChange={(e) => { setDescription(e.target.value) }}
                                            className="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        />
                                    </Field>



                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={updatePaymentHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>تعديل</button>
                                        <button onClick={() => { setIsOpen(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
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