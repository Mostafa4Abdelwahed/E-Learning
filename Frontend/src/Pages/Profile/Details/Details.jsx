import React, { useEffect, useState } from 'react'
import request from "../../../utils/request"
import { useSelector } from 'react-redux';
import SkeletonDetails from './skeletonDetails';

const Details = () => {
  const { user } = useSelector(state => state.auth);
  const [profile, setProfile] = useState({});
  const [fullName, setfullName] = useState("");
  const getUserProfile = async () => {
    const { data } = await request.get(`/api/auth/users/${user.id}`, {
      headers: {
        "Authorization": user.token
      }
    })
    setProfile(data.data)
    setfullName(data.data.firstName + " " + data.data.lastName)
  }
  useEffect(() => {
    getUserProfile();
  }, [])


  return (
    <section className="max-w-screen-xl min-h-[53vh] mx-auto">
      {
        profile.id ?
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-300 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">الاسم</dt>
                <dd className="text-gray-700 sm:col-span-2">{fullName}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">المرحله</dt>
                <dd className="text-gray-700 sm:col-span-2">{profile.level}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">رقم الهاتف</dt>
                <dd className="text-gray-700 sm:col-span-2">{profile.phoneNumber}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">البريد الالكتروني</dt>
                <dd className="text-gray-700 sm:col-span-2">{profile.email}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">رقم ولي الامر</dt>
                <dd className="text-gray-700 sm:col-span-2">{profile.dadPhone}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">المنطقه</dt>
                <dd className="text-gray-700 sm:col-span-2">{profile.region}</dd>
              </div>

            </dl>
          </div>
          :
          <SkeletonDetails />
      }
    </section>
  )
}

export default Details
