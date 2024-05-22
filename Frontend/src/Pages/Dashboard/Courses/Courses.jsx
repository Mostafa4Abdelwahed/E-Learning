import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Input, Field, Label, Select } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Box from './components/box'
import request from "./../../../utils/request"
import Pagination from '../components/pagination'
import HelmetHandler from "./../../../utils/helmetHandler"

const Courses = () => {
  let [isOpen, setIsOpen] = useState(false)
  let [levels, setLevels] = useState([])
  let [courses, setCourses] = useState([]);
  let [title, setTitle] = useState("");
  let [price, setPrice] = useState();
  let [image, setImage] = useState("");
  let [levelId, setLevelId] = useState("");
  const [totalPages, setTotalPages] = useState(5);
  const { user } = useSelector(state => state.auth)

  const getPage = async (pageNumber) => {
    const { data } = await request.get(`/api/course?pageNumber=${pageNumber}`);
    setCourses(data.data);
    setTotalPages(data.Total_Pages)
  }

  const handleDataLevels = async () => {
    const { data } = await request.get("/api/level");
    setLevels(data.data)
  }

  const addNewCourseHandler = async () => {
    const form = new FormData();
    form.append('title', title);
    form.append('price', price);
    form.append('image', image);
    form.append('levelId', levelId);

    if (title.trim() === "" || image === "" || levelId.trim() === "") {
      return toast.error("برجاء ملئ جميع الحقول")
    }

    try {
      const { data } = await request.post("/api/course", form, {
        headers: {
          Authorization: user.token,
          "Content-Type": "multipart/form-data"
        }
      })

      setTitle("");
      setPrice("");
      setLevelId("")
      setIsOpen(false)
      return toast.success(data.message)

    } catch (error) {
      return toast.error(error)
    }

  }

  useEffect(() => {
    handleDataLevels()
    getPage(1)
  }, [])


  return (
    <>
      <HelmetHandler title="الكورسات" />

      <div className='p-5 bg-gray-900 px-10 min-h-screen text-white'>
        <nav className='flex justify-between items-center'>
          <h1 className='text-2xl'>الكورسات</h1>
          <button onClick={() => { setIsOpen(true) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إضافة</button>
        </nav>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {
            courses.map((course) => {
              return (
                <Box course={course} />
              )
            })
          }
        </div>
        {
          courses.length === 0 ?
            <></>
            :
            <Pagination getPage={getPage} totalPages={totalPages} />
        }


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
                      إضافه كورس جديد
                    </DialogTitle>
                    <Field>
                      <Label className="text-sm/6 mr-1 font-medium text-white">العنوان</Label>
                      <Input value={title} onChange={(e) => { setTitle(e.target.value) }}
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>
                    <Field className="mt-3">
                      <Label className="text-sm/6 font-medium text-white">السعر</Label>
                      <Input value={price} onChange={(e) => { setPrice(e.target.value) }} type='number'
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>

                    <Field className="mt-3">
                      <Label className="text-sm/6 font-medium text-white">الصورة</Label>
                      <Input onChange={(e) => { setImage(e.target.files[0]) }} type='file'
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>

                    <Field className="mt-3">
                      <Label className="text-sm/6 font-medium text-white">الصف</Label>
                      <select onChange={(e) => { setLevelId(e.target.value) }}
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      >
                        <option disabled selected value="" className='text-black'>قم باختيار الصف الدراسي</option>
                        {
                          levels.map((level) => {
                            return <option className='text-black' value={level._id}>{level.title}</option>
                          })
                        }
                      </select>
                    </Field>



                    <div className="mt-7">
                      <button onClick={addNewCourseHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إضافة</button>
                      <button onClick={() => { setIsOpen(false) }} className='inline-block rounded bg-indigo-600 mr-5 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>

      </div>
    </>
  )
}

export default Courses