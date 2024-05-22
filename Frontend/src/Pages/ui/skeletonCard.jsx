import React from 'react'

const skeletonCourse = () => {
  return (
    <div className='grid p-5 rounded-lg gap-3 bg-slate-400 animate-pulse'>
        <div className='w-full rounded h-44 bg-slate-200 animate-pulse'/>
        <div className='w-full rounded h-9 bg-slate-200 animate-pulse'/>
        <div className='w-full rounded h-6 bg-slate-200 animate-pulse'/>
        <div className='w-full rounded h-10 bg-slate-200 animate-pulse'/>
        <div className='w-full rounded h-10 bg-slate-200 animate-pulse'/>

    </div>
  )
}

export default skeletonCourse