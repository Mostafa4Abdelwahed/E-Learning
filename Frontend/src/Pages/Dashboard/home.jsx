import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import request from "./../../utils/request"
import { HiOutlineSaveAs } from 'react-icons/hi';
import { LuUsers } from 'react-icons/lu';
import { FaPhotoVideo } from 'react-icons/fa';
import SkeletonHome from './skeletonHome';
import HelmetHandler from "./../../utils/helmetHandler"

const home = () => {
    const [orders, setOrders] = useState([]);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const { user } = useSelector(state => state.auth)

    // Data Table
    const topUsers = users.slice(1, 6)
    const topOrders = orders.slice(1, 6)

    const fetchUsers = async () => {
        const { data } = await request.get("/api/auth/users", {
            headers: {
                Authorization: user.token
            }
        });
        setUsers(data.data);
    };

    const fetchOrders = async () => {
        const { data } = await request.get("/api/order", {
            headers: {
                Authorization: user.token,
            }
        });
        setOrders(data.data);
    };

    const fetchCourses = async () => {
        const { data } = await request.get("/api/course", {
            headers: {
                Authorization: user.token,
            }
        });
        setCourses(data.data);
    };

    useEffect(() => {
        fetchUsers();
        fetchOrders();
        fetchCourses();
    }, []);

    return (
        <>
            <HelmetHandler title="لوحه التحكم" />

            <div className="p-5 bg-gray-900 min-h-screen">
                {
                    users.length >= 1 ?
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4">

                                <div class="rounded-xl bg-card text-card-foreground text-white bg-indigo-600">
                                    <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                        <h3 class="tracking-tight text-sm font-medium">المستخدمين</h3>
                                        <LuUsers />
                                    </div>
                                    <div class="p-6 pt-0">
                                        <div class="text-2xl font-bold">{users.length}</div>
                                        <p class="text-xs text-white text-muted-foreground">العدد الكلي للمستخدمين</p>
                                    </div>
                                </div>

                                <div class="rounded-xl bg-card text-card-foreground text-white bg-indigo-600">
                                    <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                        <h3 class="tracking-tight text-sm font-medium">الكورسات</h3>
                                        <FaPhotoVideo />
                                    </div>

                                    <div class="p-6 pt-0">
                                        <div class="text-2xl font-bold">{courses.length}</div>
                                        <p class="text-xs text-white text-muted-foreground">العدد الكلي للكورسات</p>
                                    </div>
                                </div>

                                <div class="rounded-xl text-card-foreground text-white bg-indigo-600">
                                    <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                        <h3 class="tracking-tight text-sm font-medium">الطلبات</h3>
                                        <HiOutlineSaveAs />
                                    </div>
                                    <div class="p-6 pt-0">
                                        <div class="text-2xl font-bold">{orders.length}</div>
                                        <p class="text-xs text-white text-muted-foreground">العدد الكلي للطلبات</p>
                                    </div>
                                </div>

                            </div>
                            <div className="grid mt-8 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                                <div>
                                    <h1 className="text-2xl text-white mr-3 mb-2">اخر 5 طلبات</h1>
                                    <div className="overflow-x-auto table-users text-right border-spacing-x-5 rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y-2 divide-gray-200 text-white text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الإسم</th>
                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">رقم الهاتف</th>
                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الكورس</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y table-users divide-gray-200">
                                                {
                                                    topOrders.map((order) => {
                                                        return (
                                                            <tr>
                                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-white">{order?.UserId?.firstName}</td>
                                                                <td className="whitespace-nowrap px-4 py-2 text-white">{order?.UserId?.phoneNumber}</td>
                                                                <td className="whitespace-nowrap px-4 py-2 text-white">{order?.CourseName}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mt-3 md:mt-0">
                                    <h1 className="text-2xl text-white mr-3 mb-2">المستخدمين الجدد</h1>
                                    <div className="overflow-x-auto table-users text-right border-spacing-x-5 rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y-2 divide-gray-200 text-white text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الإسم</th>
                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الإيميل</th>
                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">رقم الهاتف</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y table-users divide-gray-200">
                                                {
                                                    topUsers.map((user) => {
                                                        return (
                                                            <tr>
                                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-white">{user.firstName}</td>
                                                                <td className="whitespace-nowrap px-4 py-2 text-white">{user.email}</td>
                                                                <td className="whitespace-nowrap px-4 py-2 text-white">{user.phoneNumber}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        :
                        <SkeletonHome />

                }
            </div>
        </>

    )
}

export default home