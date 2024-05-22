import React from 'react'
import SkeletonCard from "../ui/skeletonCard"

const skeletonDetailsCourse = () => {
    return (
        <div className='max-w-screen-xl py-10 mx-auto'>
            <div className="flex flex-col-reverse items-center justify-center md:flex-row gap-5 md:gap-10">
                <div className="md:w-2/3 w-5/6 bg-slate-200 h-96 rounded-lg animate-pulse p-5 md:p-0">
                    
                </div>
                <div className="md:w-1/3 w-svw p-5 md:p-0">
                        <SkeletonCard />
                </div>
            </div>
        </div>
    )
}

export default skeletonDetailsCourse