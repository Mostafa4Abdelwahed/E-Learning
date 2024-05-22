import React, { useEffect, useState } from 'react'
import HelmetHandler from './../../utils/helmetHandler'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { registerUser } from '../../redux/apiCalls/authApiCall';
import data from "./../../utils/regions.json"
import request from '../../utils/request';

const register = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [dPhone, setDphone] = useState("");
  const [regin, setRegin] = useState("");
  const [level, setLevel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  // Static Data
  const [regions, setRegions]= useState([]);
  const [levels, setLevels]= useState([]);

  const dispatch = useDispatch();

  const getLevelsHandler = async ()=>{
    const { data } = await request.get("/api/level");
    setLevels(data.data)
  }

  useEffect(() => {
    setRegions(data);
    getLevelsHandler();
  }, [levels])
  

  const submitHandler = (e) => {
    e.preventDefault();

    // Manual Validation
    if (fName.trim() === "" || lName.trim() === ""
      || phone.trim() === "" || dPhone.trim() === ""
      || regin.trim() === "" || level.trim() === ""
      || email.trim() === "" || password.trim() === ""
      || repassword.trim() === "") {
      return toast.error("برجاء ملئ جميع الحقول")
    } else if (password !== repassword) {
      return toast.error("كلمه السر غير متطابقه")
    }

    dispatch(registerUser({ fName, lName, phone, dPhone, regin, level, email, password }))
  }
  return (
    <>
      <HelmetHandler title="انشاء حساب" />
      <div className='bg-slate-100 py-16'>
        <section className="max-w-xl p-6 mx-auto bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">تسجيل الدخول</h2>
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input value={fName} onChange={(e) => { setFname(e.target.value) }} type="text" placeholder="الاسم الاول" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
              </div>
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input value={lName} onChange={(e) => { setLname(e.target.value) }} type="text" placeholder="الاسم الاخير" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
              </div>
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="text" placeholder="رقم الهاتف" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
              </div>
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input value={dPhone} onChange={(e) => { setDphone(e.target.value) }} type="text" placeholder="رقم ولي الامر" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
              </div>
              <div className="relativebefore:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <select value={regin} onChange={(e) => { setRegin(e.target.value) }} className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition">
                  <option value="" disabled selected>اختر محافظتك</option>
                  {
                    regions.map((reg)=>{
                      return <option value={reg.governorate_name_ar}>{reg.governorate_name_ar}</option>
                    })
                  }
                </select>
              </div>
              <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <select value={level} onChange={(e) => { setLevel(e.target.value) }} className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition">
                  <option value="" selected disabled>اختر الصف الدراسي</option>
                  {
                    levels.map((lev)=>{
                      return <option value={lev.title}>{lev.title}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="relative mt-5 before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
              <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="البريد الالكتروني" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative mt-5 before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="كلمة السر" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
              </div>
              <div className="relative mt-5 before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input value={repassword} onChange={(e) => { setRepassword(e.target.value) }} type="password" placeholder="تأكيد كلمة السر" className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button type='submit' className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform border-gray-700 border-2 hover:text-gray-700 bg-gray-700 rounded-md hover:bg-white focus:outline-none focus:bg-gray-600">انشئ الحساب</button>
            </div>
            <div className="flex justify-right mt-6">
              <p>يوجد لديك حساب بالفعل؟ <Link to="/login" className='underline text-yellow-500 text-right'>ادخل الي حسابك الان</Link></p>
            </div>

          </form>
        </section>
      </div>
    </>
  )
}

export default register
