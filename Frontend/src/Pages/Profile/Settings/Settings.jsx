import React, { useEffect, useState } from 'react'
import HelmetHandler from '../../../utils/helmetHandler';
import { useSelector } from 'react-redux';
import request from '../../../utils/request';
import { toast } from 'react-toastify';
import SkeletonSetting from './skeletonSetting';

const Settings = () => {
  const { user } = useSelector(state => state.auth);
  const [profile, setProfile] = useState({});

  // Link Inputs
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const getUserProfile = async () => {
    const { data } = await request.get(`/api/auth/users/${user.id}`, {
      headers: {
        "Authorization": user.token
      }
    })
    setProfile(data.data)
    setEmail(profile.email)
    setPhone(profile.phoneNumber)
    setPassword(profile.password)
    setConPassword(profile.password)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== conPassword) {
      return toast.error("كلمه السر غير متطابقه")
    }

    const { data } = await request.put(`/api/auth/${user.id}`, {
      phoneNumber: phone,
      email: email,
      password: password
    }, {
      headers: {
        Authorization: user.token
      }
    }
    )

    toast.success(data.messgae)
  }
  useEffect(() => {
    getUserProfile();
  }, [])
  return (
    <div>
      <HelmetHandler title="الإعدادات" />

      <h1 className='text-2xl mb-5'>الإعدادات</h1>
      <div className='bg-slate-100 pb-16 mt-5'>
        {
          profile.id ?
            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input disabled value={profile.firstName} type="text" placeholder="الاسم الاول" className="w-full bg-transparent pb-3  border-b border-gray-500 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                </div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input disabled value={profile.lastName} type="text" placeholder="الاسم الاخير" className="w-full bg-transparent pb-3  border-b border-gray-500 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                </div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input type="text" onChange={(e) => { setPhone(e.target.value) }} placeholder={`0${profile.phoneNumber}`} className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                </div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input disabled value={`0${profile.dadPhone}`} type="text" placeholder="رقم ولي الامر" className="w-full bg-transparent pb-3  border-b border-gray-500 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                </div>
                <div className="relativebefore:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <select disabled className="w-full bg-transparent pb-3  border-b border-gray-500 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition">
                    <option disabled selected>{profile.region}</option>
                    <option value="">الشرقية</option>
                    <option value="">الشرقية</option>
                    <option value="">الشرقية</option>
                    <option value="">الشرقية</option>
                  </select>
                </div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <select disabled className="w-full bg-transparent pb-3  border-b border-gray-500 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition">
                    <option disabled selected>{profile.level}</option>
                    <option value="">الشرقية</option>
                    <option value="">الشرقية</option>
                    <option value="">الشرقية</option>
                    <option value="">الشرقية</option>
                  </select>
                </div>
              </div>
              <div className="relative mt-5 before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder={profile.email} className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative mt-5 before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="كلمه السر" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                </div>
                <div className="relative mt-5 before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input type="password" onChange={(e) => { setConPassword(e.target.value) }} placeholder="تأكيد كلمه السر" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button type='submit' className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform border-gray-700 border-2 hover:text-gray-700 hover:bg-white bg-gray-700 rounded-md focus:outline-none">تحديث الحساب</button>
              </div>

            </form>
            :
            <SkeletonSetting />
        }
      </div>
    </div>
  )
}

export default Settings
