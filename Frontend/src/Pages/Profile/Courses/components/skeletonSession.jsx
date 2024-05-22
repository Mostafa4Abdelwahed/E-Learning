import React from 'react'

const skeletonSession = () => {
  return (
    <div>
        <div className='bg-gray-300 w-full h-16 rounded animate-pulse'/>
        <div className='bg-gray-300 w-full h-96 mt-5 rounded animate-pulse'/>
        <div className='bg-gray-300 w-full h-36 mt-5 rounded animate-pulse'/>
    </div>
  )
}

export default skeletonSession