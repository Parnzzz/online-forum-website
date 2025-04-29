"use client"

import React, { useState,useEffect } from 'react'
import AdminNav from '../component/AdminNav'
import Footer from '../component/Footer'
import Sidenav from '../component/SideNav'
import Container from '../component/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Deletebutton from './Deletebtn'
function AdminUserpage() {
    
    const {data: session} = useSession();
    if (!session) redirect("/Login")
    if(!session?.user?.role ==="admin") redirect("/Welcome")

   const[alluserdata ,setalluserdata] = useState([]);
   console.log("ALLuser",alluserdata)
   const getalluser = async() =>{
    try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Totaluser`,{
        cache: "no-store"
    }
    )
    if(!res.ok){
        throw new Error("Failed to fetch user")
    }
    const data = await res.json();
    setalluserdata(data.totalusers)
    }
    catch(error){
        console.log(error)
    }
   }
   useEffect(()=>{
    getalluser();
   },[])
    return (
    <Container>
        <AdminNav session={session}/>
        <div className='flex-grow'>
            <div className='container mx-auto'>
                <div className='flex mt-10'>
                    <Sidenav />
                    <div className='p-10'>
                        <h3 className='text-3xl mb-3'>Manage User</h3>
                        <p>A list of users retrieved from mongoDB database</p>
                        <div className='shadow-lg overflow-x-auto'>
                            <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                <thead>
                                    <tr className='bg-gray-400'>
                                        <th className='p-5 w-60'>ID</th>
                                        <th className='p-5'>username</th>
                                        <th className='p-5'>Email</th>
                                        <th className='p-5'>Role</th>
                                        <th className='p-5'>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alluserdata?.map((user, index) =>(
                                    <tr key={user._id}>
                                        <td className='p-5 '>{user?._id}</td>
                                        <td className='p-5'>{user?.name}</td>
                                        <td className='p-5'>{user?.email}</td>
                                        <td className='p-5 break-words whitespace-normal'>{user?.role}</td>
                                        <td className='p-5'><Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2' href={`/admin/users/edit/${user?._id}`}>Edit</Link>
                                         <Deletebutton id={user._id}/> 
                                         </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </Container>
  )
}

export default AdminUserpage