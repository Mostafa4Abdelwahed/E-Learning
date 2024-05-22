import React from 'react'

const skeletonHome = () => {
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="box bg-slate-200 animate-pulse rounded-lg w-full h-[130px]"></div>
            <div className="box bg-slate-200 animate-pulse rounded-lg w-full h-[130px]"></div>
            <div className="box bg-slate-200 animate-pulse rounded-lg w-full h-[130px]"></div>
        </div>
        <div className="bg-slate-200 mt-8 animate-pulse h-8 w-1/6" />
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <div className="grid overflow-hidden bg-slate-200 w-full animate-pulse h-screen mt-3">
            <div className="grid grid-cols-4 gap-60 p-6">
            <div className="bg-slate-400 animate-pulse h-6"></div>
            <div className="bg-slate-400 animate-pulse h-6"></div>
            <div className="bg-slate-400 animate-pulse h-6"></div>
            <div className="bg-slate-400 animate-pulse h-6"></div>
            </div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
        </div>
        <div className="grid overflow-hidden bg-slate-200 w-full animate-pulse h-screen mt-3">
            <div className="grid grid-cols-4 gap-60 p-6">
            <div className="bg-slate-400 animate-pulse h-6"></div>
            <div className="bg-slate-400 animate-pulse h-6"></div>
            <div className="bg-slate-400 animate-pulse h-6"></div>
            <div className="bg-slate-400 animate-pulse h-6"></div>
            </div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
            <div className="bg-slate-400 animate-pulse h-8 w-full"></div>
        </div>

        </div>
    </div>
  )
}

export default skeletonHome