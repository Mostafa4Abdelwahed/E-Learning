import React from 'react'

const skeletonSetting = () => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
                <div className='bg-slate-200 animate-pulse w-full h-10' />
            </div>
            <div className='w-40 h-10 bg-slate-200 rounded mr-auto mt-5'/>
        </div>
    )
}

export default skeletonSetting