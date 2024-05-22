import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const LayoutDash = () => {
  return (
    <div>
      <Sidebar />
      <div className="pr-0 lg:pr-[300px] bg-gray-900 min-h-screen pt-[57px] lg:pt-0"><Outlet /></div>
    </div>
  )
}

export default LayoutDash