import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Input, Field, Label, Description, Textarea } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import request from '../../../utils/request';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Box from './components/box';
import HelmetHandler from "./../../../utils/helmetHandler"

const Levels = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [levels, setLevels] = useState([]);
  const { user } = useSelector(state => state.auth);

  const addNewLevelHandler = async () => {

    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('image', image);

    if (title.trim() === "" || image === "" || description.trim() === "") {
      return toast.error("برجاء ملئ جميع الحقول")
    }

    try {
      const { data } = await request.post("/api/level", form, {
        headers: {
          Authorization: user.token,
          "Content-Type": "multipart/form-data"
        }
      })

      setIsOpen(false)
      toast.success(data.message)

    } catch (error) {
      return toast.error(error)
    }

  }

  const handleDataLevels = async () => {
    const { data } = await request.get("/api/level");
    setLevels(data.data)
  }

  useEffect(() => {
    handleDataLevels()
  }, [levels])


  return (
    <>
      <HelmetHandler title="الصفوف الدراسية" />

      <div className='p-5 bg-gray-900 px-10 min-h-screen text-white'>
        <nav className='flex justify-between items-center'>
          <h1 className='text-2xl'>الصفوف</h1>
          <button onClick={() => { setIsOpen(true) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إضافة</button>
        </nav>

        <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-5">
          {
            levels.map((lev) => {
              return <Box level={lev} />
            })
          }

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
                      إضافه صف جديد
                    </DialogTitle>
                    <Field>
                      <Label className="text-sm/6 mr-1 font-medium text-white">العنوان</Label>
                      <Input value={title} onChange={(e) => { setTitle(e.target.value) }}
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>
                    <Field className="mt-3">
                      <Label className="text-sm/6 font-medium text-white">الصورة</Label>
                      <Input type='file' onChange={(e) => { setImage(e.target.files[0]) }}
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>
                    <Field className="mt-3">
                      <Label className="text-sm/6 font-medium text-white">الوصف</Label>
                      <Textarea rows={2} value={description} onChange={(e) => { setDescription(e.target.value) }}
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>


                    {/* <Input
                    className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  /> */}
                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                      <button onClick={addNewLevelHandler} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إضافة</button>
                      <button onClick={() => { setIsOpen(false) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إلغاء</button>
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

export default Levels