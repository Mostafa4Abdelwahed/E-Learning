import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Input, Field, Label, Description, Textarea } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import request from "./../../../utils/request"
import Box from './components/box'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import HelmetHandler from "./../../../utils/helmetHandler"

const Payments = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [details, setDetails] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [payments, setPayments] = useState([]);
  const { user } = useSelector(state => state.auth)


  const paymentsDataHandler = async () => {
    const { data } = await request.get("/api/payment")
    setPayments(data.data)
  }

  const addNewPayment = async () => {
    const form = new FormData();

    form.append('name', name);
    form.append('image', logo);
    form.append('details', details);

    const { data } = await request.post("/api/payment", form, {
      headers: {
        Authorization: user.token
      }
    })
    toast.success(data.message)
    setName("");
    setDetails("");
    setIsOpen(false)
  }

  useEffect(() => {
    paymentsDataHandler();
  }, [payments])


  return (
    <>
      <HelmetHandler title="وسائل الدفع" />

      <div className='p-5 bg-gray-900 px-10 min-h-screen text-white'>
        <nav className='flex justify-between items-center'>
          <h1 className='text-2xl'>وسائل الدفع</h1>
          <button onClick={() => { setIsOpen(true) }} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إضافة</button>
        </nav>

        <div className="grid mt-10 grid-cols-1 md:grid-cols-3 gap-5">
          {
            payments.map((payment) => {
              return <Box payment={payment} />
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
                      إضافه وسيله دفع جديد
                    </DialogTitle>
                    <Field>
                      <Label className="text-sm/6 mr-1 font-medium text-white">الإسم</Label>
                      <Input value={name} onChange={(e) => { setName(e.target.value) }}
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>
                    <Field className="mt-3">
                      <Label className="text-sm/6 font-medium text-white">اللوجو</Label>
                      <Input type='file' onChange={(e) => { setLogo(e.target.files[0]) }}
                        className="mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>
                    <Field className="mt-3">
                      <Label className="text-sm/6 font-medium text-white">تفاصيل الدفع</Label>
                      <Textarea rows={3} value={details} onChange={(e) => { setDetails(e.target.value) }}
                        className="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </Field>

                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                      <button onClick={addNewPayment} className='inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105'>إضافة</button>
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

export default Payments