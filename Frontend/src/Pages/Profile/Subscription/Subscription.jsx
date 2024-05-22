import React, { useEffect, useState } from 'react'
import HelmetHandler from '../../../utils/helmetHandler';
import { useSelector } from 'react-redux';
import request from '../../../utils/request';
import SkeletonSubscription from './skeletonSubscription';

const Subscription = () => {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const getOrdersUser = async () => {
    const { data } = await request.get(`/api/auth/users/${user.id}`, {
      headers: {
        "Authorization": user.token
      }
    })
    const orders = data.data.orders;
    setOrders(orders);
  }
  useEffect(() => {
    getOrdersUser();
    console.log(orders);
  }, [])

  return (
    <div>
      <HelmetHandler title="طلبات الدفع" />
      {
        orders ?
          <>
            <h1 className='text-2xl'>طلبات الدفع</h1>
            <div className="overflow-x-auto min-h-screen custom-scroll mt-5 rounded-lg border border-gray-200">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">الكورس</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">طريقه الدفع</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">المبلغ</th>
                    {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">بيانات الدفع</th> */}
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">حاله الطلب</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {
                    orders.map((order) => {
                      return (
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{order.CourseName}</td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{order.PaymentName}</td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">{order.Price}ج.م</td>
                          {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{order.DescPay}</td> */}
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {
                              order.Status === "Accepted" ? <span className='inline-block rounded bg-lime-500 px-4 py-2 text-xs font-medium text-white'>تم الدفع</span> :
                                <>
                                  {order.Status === "Rejected" ? <span className='inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white'>غير مقبول</span> :
                                    <>
                                      {order.Status === "Pending" ? <span className='inline-block rounded bg-cyan-600 px-4 py-2 text-xs font-medium text-white'>جاري المعالجه</span> : <> </>}
                                    </>}
                                </>
                            }

                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </>
          :
          <SkeletonSubscription />
      }
    </div>
  )
}

export default Subscription
