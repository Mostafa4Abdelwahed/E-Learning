import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Input, Field, Label, Description } from '@headlessui/react'
import { Fragment, useState } from 'react'
import request from '../../../../utils/request'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const order = ({ order }) => {
    const { user } = useSelector(state => state.auth)
    const [acceptIsOpen, setAcceptIsOpen] = useState(false)
    const [rejectIsOpen, setRejectIsOpen] = useState(false)
    const [viewIsOpen, setViewIsOpen] = useState(false)

    const actionOrderHandler = async (status) => {
        const CourseId = order.CourseId;
        const { data } = await request.put(`/api/order/${order._id}/${order.CourseId}`, {
            userId: order.UserId,
            Status: "Accepted"
        }, {
            headers: {
                Authorization: user.token
            }
        })
        toast.success(data.message);
        setAcceptIsOpen(false);
        setRejectIsOpen(false);
    }

    return (
        <Fragment>
            <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-white">{order.PaymentName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-white">{order.DescPay}</td>
                <td className="whitespace-nowrap px-4 py-2 text-white">{order.CourseName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-white">{order.Price}ج.م</td>
                <td className="whitespace-nowrap px-4 py-2 text-white">
                    <button onClick={() => { setViewIsOpen(true) }} className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white' target='_blank'>عرض الصورة</button>
                </td>

                {
                    order.Status === "Accepted" ?
                        <td className='px-4 py-2'>
                            <span className='inline-block w-full mt-2 text-center rounded bg-lime-500 px-4 py-2 text-xs font-medium text-white'>تم الدفع</span>
                        </td> : <>
                            {order.Status === "Rejected" ?
                                <td className='px-4 py-2'>
                                    <span className='inline-block w-full text-center rounded bg-red-600 px-4 py-2 text-xs font-medium text-white'>غير مقبول</span>
                                </td>
                                : <>
                                    {order.Status === "Pending" ?
                                        <td className="whitespace-nowrap px-4 py-2 text-white">
                                            <button onClick={() => { setAcceptIsOpen(true) }} className='inline-block rounded bg-indigo-600 px-5 py-2 mx-2 text-sm font-medium text-white transition hover:scale-105'>قبول</button>
                                            <button onClick={() => { setRejectIsOpen(true) }} className='inline-block rounded bg-indigo-600 px-5 py-2 mx-2 text-sm font-medium text-white transition hover:scale-105'>رفض</button>
                                        </td> : <> </>
                                    }
                                </>
                            }
                        </>
                }

            </tr>

            <Transition appear show={acceptIsOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => { setAcceptIsOpen(false) }}>
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
                                        هل انت متاكد ؟
                                    </DialogTitle>
                                    <Description className="text-gray-200">
                                        إذا قمت بالموافقه علي الطلب لايمكنك إلغائه مره اخري, إذا كنت متأكد من الموافقه قم بالضغط علي تأكيد
                                    </Description>
                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={() => { actionOrderHandler("Accepted") }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>تأكيد</button>
                                        <button onClick={() => { setAcceptIsOpen(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={rejectIsOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => { setRejectIsOpen(false) }}>
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
                                        هل انت متاكد ؟
                                    </DialogTitle>
                                    <Description className="text-gray-200">
                                        إذا قمت برفض الطلب لايمكنك الموافقه عليه مره اخري, إذا كنت متأكد من رفض الطلب قم بالضغط علي رفض
                                    </Description>
                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={() => { actionOrderHandler("Rejected") }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>رفض</button>
                                        <button onClick={() => { setRejectIsOpen(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={viewIsOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => { setViewIsOpen(false) }}>
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
                                    <img src={order.ImagePay.url} alt="ScreenShoot" />
                                    <div className="mt-7">
                                        <button onClick={() => { setViewIsOpen(false) }} className='w-full rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-95'>رجوع</button>
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

export default order