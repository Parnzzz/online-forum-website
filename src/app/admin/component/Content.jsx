import React from 'react'
import{FaUsers, FaRegNewspaper} from'react-icons/fa6'

function Content({totalUserData,totalpostdata}) {
  return (
    <div className=' px-10 rounded-lg'>
        <div className='flex'>
            <div className=' bg-[#F7CFD8] shadow-lg w-[300px] m-3 p-10 rounded-md'>
                <h3 className='flex items-center'><FaUsers className='mr-2' />Total user </h3>
                <p className='text-5xl mt-10'>{totalUserData?.length}</p>
            </div>
            <div className='bg-[#F7CFD8]  shadow-lg w-[300px] m-3 p-10 rounded-md'>
                <h3 className='flex items-center'><FaRegNewspaper className='mr-2' />Total posts</h3>
                <p className='text-5xl mt-10'>{totalpostdata?.length}</p>
            </div>
        </div>
    <div className='bg-[#F7CFD8] rounded-md shadow-lg w-full'>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet consequatur tempore suscipit. Dolorum dolorem, dolor officiis laborum ipsam, voluptate excepturi, adipisci dignissimos non minus deleniti ratione commodi debitis sint dolore.</p>
    </div>
    </div>
  )
}

export default Content