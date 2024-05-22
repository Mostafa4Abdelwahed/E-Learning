import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Input, Field, Label, Description, Textarea } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import request from "./../../../utils/request"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Editor from 'react-simple-wysiwyg';
import swal from 'sweetalert';


const courseOnly = () => {
    const [title, setTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState('<b>اكتب وصف الفيديو هنا و اي روابط.</b>');
    let [isOpen, setIsOpen] = useState(false);
    let [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmImage, setConfirmImage] = useState(false);
    let [sessions, setSessions] = useState([]);
    let [course, setCourse] = useState({});
    const { user } = useSelector(state => state.auth);
    const params = useParams();


    const handleDataCourses = async () => {
        const { data } = await request.get(`/api/course/one/${params.id}`);
        setCourse(data.data);
        setSessions(data.data.sessions)
    }

    const addNewSessionHandler = async () => {
        const { data } = await request.post("/api/session", {
            title: title,
            shortDescription: shortDesc,
            description: description,
            videoUrl: videoUrl,
            courseId: params.id
        }, {
            headers: {
                Authorization: user.token,
            }
        })

        setTitle("");
        setVideoUrl("");
        setDescription("");
        setShortDesc("");
        setIsOpen(false);
        toast.success(data.message)
    }

    const deleteSessionHandler = async (sessionId) => {
        const res = await request.delete(`/api/session/${sessionId}`, {
            headers: {
                Authorization: user.token
            }
        }).then(() => { return toast.success("تم حذف الفيديو بنجاح") })
    }

    const deleteCourseHandler = async () => {
        const res = await request.delete(`/api/course/${params.id}`, {
            headers: {
                Authorization: user.token
            }
        });
        swal({
            title: "تم حذف الكورس بنجاح",
            icon: "success"
        });
    }

    const updateCourseImage = async () => {
        const form = new FormData();
        form.append('image', image);

        const { data } = await request.put(`/api/course/one/${params.id}`, form, {
            headers: {
                Authorization: user.token
            }
        });
        toast.success(data.message);
        setConfirmImage(false);
    }

    useEffect(() => {
        handleDataCourses()
    }, [course])


    return (
        <div className='p-5 bg-gray-900 px-10 min-h-screen text-white'>
            <nav className='flex justify-between items-center'>
                <h1 className='text-2xl'>الفيديوهات</h1>
                <button onClick={() => { setIsOpen(true) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إضافة</button>
            </nav>


            <div className="overflow-x-auto mt-5 table-users text-right border-spacing-x-5 rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 text-white text-sm">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">العنوان</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الوصف</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الفيديو</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-white">اخرى</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y table-users divide-gray-200">
                        {
                            sessions.map((session) => {
                                return (
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-white">{session.title}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-white">{session.shortDescription}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-white">
                                            <a href={session.videoUrl} className='text-blue-500 underline' target='_blank'>عرض الفيديو</a>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-white">
                                            <button onClick={() => { deleteSessionHandler(session._id) }} className='inline-block rounded bg-indigo-600 px-5 py-2 mx-2 text-sm font-medium text-white transition hover:scale-105'>حذف</button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <button onClick={() => { setConfirmImage(true) }} className='hover:border-indigo-500 bg-transparent hover:bg-indigo-600 text-center hover:text-white transition-all border-indigo-600 border-2 text-gtay-900 rounded-md w-full mt-5 text-base py-2 px-5 space-x-2 space-x-reverse'>تحديث الصورة</button>
            <button onClick={() => { setConfirmOpen(true) }} className='hover:border-indigo-500 border-indigo-700 hover:bg-transparent text-center hover:text-white transition-all bg-indigo-600 border-2 text-gtay-900 rounded-md w-full mt-5 text-base py-2 px-5 space-x-2 space-x-reverse'>حذف الكورس</button>


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
                                <DialogPanel className="w-full max-w-2xl rounded-xl shadow-2xl border border-white bg-gray-900 p-6">
                                    <DialogTitle as="h1" className="font-bold text-xl mb-5 text-white">
                                        إضافه فيديو جديد
                                    </DialogTitle>
                                    <Field>
                                        <Label className="text-sm/6 mr-1 font-medium text-white">العنوان</Label>
                                        <Input value={title} onChange={(e) => { setTitle(e.target.value) }}
                                            className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        />
                                    </Field>
                                    <Field className="mt-3">
                                        <Label className="text-sm/6 font-medium text-white">رابط الفيديو</Label>
                                        <Input value={videoUrl} onChange={(e) => { setVideoUrl(e.target.value) }}
                                            className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        />
                                    </Field>

                                    <Field className="mt-3">
                                        <Label className="text-sm/6 font-medium text-white">وصف قصير</Label>
                                        <Input value={shortDesc} onChange={(e) => { setShortDesc(e.target.value) }}
                                            className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        />
                                    </Field>


                                    <Field className="mt-3">
                                        <Label className="text-sm/6 font-medium text-white">الوصف الطويل</Label>
                                        <Editor value={description} containerProps={{ style: { marginTop: "10px", color: "white", resize: 'vertical', height: "250px", } }} onChange={(e) => { setDescription(e.target.value) }} />
                                    </Field>



                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={addNewSessionHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إضافة</button>
                                        <button onClick={() => { setIsOpen(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

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
                                        هل انت متاكد من حذف الكورس ؟
                                    </DialogTitle>
                                    <Description className="text-gray-200">
                                        إذا قمت بحذف الكورس لا يمكنك استرجاعه مره اخري, إذا كنت متأكد اضغط علي  نعم
                                    </Description>
                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={deleteCourseHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>نعم</button>
                                        <button onClick={() => { setConfirmOpen(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={confirmImage}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => { setConfirmImage(false) }}>
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
                                        تحديث صورة الكورس
                                    </DialogTitle>
                                    <Field>
                                        <Label className="text-sm/6 mr-1 font-medium text-white">الصوره</Label>
                                        <Input type='file' onChange={(e) => { setImage(e.target.files[0]) }}
                                            className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        />
                                    </Field>
                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={updateCourseImage} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>تحديث</button>
                                        <button onClick={() => { setConfirmImage(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>



        </div>
    )
}

export default courseOnly