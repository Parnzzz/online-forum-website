import React from 'react'
import Link from'next/link'
import Logo from '../../../../public/next.svg'
import Image from 'next/image'
import {Press_Start_2P} from"next/font/google";
import { signOut } from 'next-auth/react';

const PressStart2Pfont = Press_Start_2P({
    weight:'400'
  });




function AdminNav({session}) {
  return (
    <nav className='bg-[var(--header-bg)] shadow-xl'>
        <div className='container mx-auto'>
            <div className='flex justify-between items-center p-4'>
                <div>
                    <Link href="/">
                    <h1 className={PressStart2Pfont.className}>KITTISAK</h1>
                    </Link>
                </div>
                <ul className='flex'>
                {!session?(
          <>
          <li className='mx-3'><Link href="/Login">Login</Link></li>
       <li className='mx-3'> <Link href="/register">Register</Link></li>
        </>
          ):(
            <li className='mx-3'> 
            <Link href="/Global" className="bg-yellow-500 text-white border py-2 px-3 rounded-md text-lg mx-2 cursor-pointer">Global</Link>
            <a onClick= {()=>signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg mx-2 cursor-pointer'>Logout</a>
             
             </li>
          )}
                </ul>
            </div>
        </div>

    </nav>
  )
}

export default AdminNav