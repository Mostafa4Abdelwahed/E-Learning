import HelmetHandler from "./../../../utils/helmetHandler"
import Nav from "./components/nav"
import Table from "./components/table"

const Users = () => {

  return (
    <>
      <HelmetHandler title="المستخدمين" />

      <div className='p-5 bg-gray-900 px-10 min-h-screen text-white'>
        <Nav />
        <Table />
      </div>
    </>

  )
}

export default Users