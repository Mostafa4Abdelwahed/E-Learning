import React from 'react'

const skeletonDetails = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-8 gap-5'>
        <div className='bg-slate-200 animate-pulse col-span-1 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-7 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-1 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-7 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-1 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-7 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-1 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-7 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-1 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-7 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-1 h-6 rounded'/>
        <div className='bg-slate-200 animate-pulse col-span-7 h-6 rounded'/>
    </div>
  )
}

export default skeletonDetails