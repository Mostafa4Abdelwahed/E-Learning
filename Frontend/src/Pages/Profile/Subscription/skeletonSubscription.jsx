import React from 'react'

const skeletonSubscription = () => {
  return (
    <div>
        <div className="bg-slate-200 animate-pulse h-8 w-1/6" />
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
  )
}

export default skeletonSubscription