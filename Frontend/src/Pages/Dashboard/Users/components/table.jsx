import { useEffect, useState } from 'react';
import Row from './row'
import request from '../../../../utils/request';
import { useSelector } from 'react-redux';
import Pagination from "./../../components/pagination"

const table = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const { user } = useSelector(state => state.auth)

    const getPage = async (pageNumber)=>{
        const res = await request.get(`/api/auth/users?pageNumber=${pageNumber}`, {
            headers: {
                Authorization: user.token
            }
        });
        setUsers(res.data.data);
        setTotalPages(res.data.Total_Pages);
    }
    
    useEffect(() => {
        getPage(1);
    }, [])
    
    return (
        <>        
        <div className="overflow-x-auto mt-5 table-users text-right border-spacing-x-5 rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 text-white text-sm">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الإسم</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الإيميل</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">رقم الهاتف</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">الصلاحيات</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white">اخرى</th>
                    </tr>
                </thead>

                <tbody className="divide-y table-users divide-gray-200">
                    {
                        users.map((user)=>{
                            return <Row userOnly={user} />
                        })
                    }
                </tbody>
            </table>
        </div>
        <Pagination getPage={getPage} totalPages={totalPages} />
        </>
    )
}

export default table