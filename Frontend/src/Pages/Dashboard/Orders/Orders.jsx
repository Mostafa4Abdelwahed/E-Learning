import React, { useEffect, useState } from 'react'
import request from "./../../../utils/request"
import { useSelector } from 'react-redux';
import Order from "./components/order"
import Pagination from "./../components/pagination"
import HelmetHandler from "./../../../utils/helmetHandler"

const Orders = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [orders, setOrders] = useState([]);
  const { user } = useSelector(state => state.auth)


  const getPage = async (pageNumber) => {
    const { data } = await request.get(`/api/order?pageNumber=${pageNumber}`, {
      headers: {
        Authorization: user.token
      }
    })
    setOrders(data.data)
    setTotalPages(data.Total_Pages)
  }

  useEffect(() => {
    getPage(1);
  }, [])

  return (
    <>
      <HelmetHandler title="الأوردرات" />

      <div className='p-5 bg-gray-900 px-10 min-h-screen text-white'>
        <nav>
          <h1 className='text-2xl'>الطلبات</h1>
        </nav>
        <div className="overflow-x-auto mt-5 table-users text-right border-spacing-x-5 rounded-lg border border-gray-200">
          <table className="min-w-full divide-y-2 divide-gray-200 text-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">طريقه الدفع</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">بيانات الدفع</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الكورس</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">السعر</th>
                {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-white">حالة الطلب</th> */}
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">اثبات الدفع</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-white">اخرى</th>
              </tr>
            </thead>

            <tbody className="divide-y table-users divide-gray-200">
              {
                orders.map((order) => {
                  return <Order order={order} />
                })
              }
            </tbody>
          </table>
        </div>
        <Pagination getPage={getPage} totalPages={totalPages} />
      </div>
    </>
  )
}

export default Orders