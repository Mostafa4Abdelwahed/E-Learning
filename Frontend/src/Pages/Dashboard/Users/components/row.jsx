import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Input, Field, Label, Description, Textarea, Select, Switch } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import request from "./../../../../utils/request"
import data from "../../../../utils/regions.json"
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const row = ({ userOnly }) => {
    const [fName, setFname] = useState(userOnly.firstName);
    const [lName, setLname] = useState(userOnly.lastName);
    const [phone, setPhone] = useState(userOnly.phoneNumber);
    const [dPhone, setDphone] = useState(userOnly.dadPhone);
    const [regin, setRegin] = useState(userOnly.region);
    const [level, setLevel] = useState(userOnly.level);
    const [email, setEmail] = useState(userOnly.email);
    const [password, setPassword] = useState(userOnly.password);
    const [classes, setClasses] = useState([]);
    const [regions, setRegions] = useState([]);
    const [enabled, setEnabled] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const { user } = useSelector(state => state.auth)

    const getLevelsData = async () => {
        const { data } = await request.get("/api/level");
        setClasses(data.data);
    }

    const deleteUserHandler = async () => {
        const { data } = await request.delete(`/api/auth/${userOnly._id}`, {
            headers: {
                Authorization: user.token
            }
        })
        setIsOpen(false)
        toast.success(data.messgae)
    }

    const editUserHandler = async () => {
        const { data } = await request.put(`/api/auth/${userOnly._id}`, {
            firstName: fName,
            lastName: lName,
            phoneNumber: phone,
            dadPhone: dPhone,
            region: regin,
            level: level,
            email: email,
            password: password,
            isAdmin: enabled
        }, {
            headers: {
                Authorization: user.token
            }
        })
        setIsOpenEdit(false);
        toast.success(data.messgae)
    }

    useEffect(() => {
        getLevelsData();
        setRegions(data);
    }, [classes])

    return (
        <Fragment>
            <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-white">{fName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-white">{email}</td>
                <td className="whitespace-nowrap px-4 py-2 text-white">{phone}</td>
                <td className="whitespace-nowrap px-4 py-2 text-white">{userOnly.isAdmin ? "ادمن" : "مستخدم"}</td>
                <td className="whitespace-nowrap px-4 py-2 text-white">
                    <button onClick={() => { setIsOpenEdit(true) }} className='inline-block rounded bg-indigo-600 px-5 py-2 mx-2 text-sm font-medium text-white transition hover:scale-105'>تعديل</button>
                    <button onClick={() => { setIsOpen(true) }} className='inline-block rounded bg-indigo-600 px-5 py-2 mx-2 text-sm font-medium text-white transition hover:scale-105'>حذف</button>
                </td>
            </tr>

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
                                        هل انت متاكد من حذف المستخدم ؟
                                    </DialogTitle>
                                    <Description className="text-gray-200">
                                        إذا قمت بحذف المستخدم لا يمكنك استرجاعه مره اخري, إذا كنت متأكد اضغط علي  نعم
                                    </Description>
                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={deleteUserHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>نعم</button>
                                        <button onClick={() => { setIsOpen(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isOpenEdit}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={() => { setIsOpenEdit(false) }}>
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
                                        تعديل المستخدم
                                    </DialogTitle>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Field>
                                            <Label className="text-sm/6 mr-1 font-medium text-white">الإسم الاول</Label>
                                            <Input value={fName} onChange={(e) => { setFname(e.target.value) }}
                                                className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                            />
                                        </Field>
                                        <Field >
                                            <Label className="text-sm/6 font-medium text-white">الإسم الثاني</Label>
                                            <Input value={lName} onChange={(e) => { setLname(e.target.value) }}
                                                className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                            />
                                        </Field>
                                    </div>

                                    <div className="grid mt-3 grid-cols-1 md:grid-cols-2 gap-3">
                                        <Field>
                                            <Label className="text-sm/6 font-medium text-white">رقم الهاتف</Label>
                                            <Input value={phone} onChange={(e) => { setPhone(e.target.value) }}
                                                className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                            />
                                        </Field>
                                        <Field>
                                            <Label className="text-sm/6 font-medium text-white">رقم هاتف الاب</Label>
                                            <Input value={dPhone} onChange={(e) => { setDphone(e.target.value) }}
                                                className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                            />
                                        </Field>
                                    </div>

                                    <div className="grid mt-3 grid-cols-1 md:grid-cols-2 gap-3">
                                        <Field>
                                            <Label className="text-sm/6 font-medium text-white">الإيميل</Label>
                                            <Input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }}
                                                className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                            />
                                        </Field>
                                        <Field>
                                            <Label className="text-sm/6 font-medium text-white">المنطقه</Label>
                                            <Select value={regin} onChange={(e) => { setRegin(e.target.value) }}
                                                className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                            >
                                                <option selected className='text-black' value={regin}>{regin}</option>
                                                {
                                                    regions.map((reg) => {
                                                        return <option className='text-black' value={reg.governorate_name_ar}>{reg.governorate_name_ar}</option>
                                                    })
                                                }
                                            </Select>
                                        </Field>
                                    </div>

                                    <Field className="mt-3">
                                        <Label className="text-sm/6 font-medium text-white">الصف الدراسي</Label>
                                        <Select value={level} onChange={(e) => { setLevel(e.target.value) }}
                                            className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                        >
                                            <option selected className="text-black" value={level}>{level}</option>
                                            {
                                                classes.map((level) => {
                                                    return <option className="text-black" value={level.title}>{level.title}</option>
                                                })
                                            }
                                        </Select>
                                    </Field>
                                    <div className='flex justify-between mt-5 text-white'>
                                        <h1>صلاحيات الادمن ؟</h1>
                                        <Switch dir='ltr'
                                            checked={enabled}
                                            onChange={setEnabled}
                                            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                                            />
                                        </Switch>

                                    </div>


                                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                                        <button onClick={editUserHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>تعديل</button>
                                        <button onClick={() => { setIsOpenEdit(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
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

export default row