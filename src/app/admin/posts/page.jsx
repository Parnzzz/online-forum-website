"use client"
import React,{useState,useEffect} from 'react'
import AdminNav from '../component/AdminNav'
import Footer from '../component/Footer'
import Sidenav from '../component/SideNav'
import Container from '../component/Container'
import Link from 'next/link'
import Image from'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Deletebutton from './Deletebtn'

function AdminUserpage() {
     const{data:session} =useSession();
    
     if(!session ==="admin") redirect("/Login");
     if(session?.user?.role !=="admin") redirect("/Welcome");

     const [getpost,setgetpost]= useState([]);

     const getAllpost = async() =>{
        try{
        const res = await fetch("http://localhost:3000/api/Totalposts" ,{
            cache: "no-store"
        })
        if(!res.ok){
            throw new Error("Failed to fetch")
        }
        const data = await res.json();
        setgetpost(data.totalposts)
        }
        catch(error){
        console.log(error)
       }
     }
    useEffect(()=>{
        getAllpost();
    },[])
  
    return (
    <Container>
        <AdminNav session={session} />
        <div className='flex-grow'>
            <div className='container mx-auto'>
                <div className='flex mt-10'>
                    <Sidenav />
                    <div className='p-10'>
                        <h3 className='text-3xl mb-3'>Manage post</h3>
                        <p>A list of post retrieved from mongoDB database</p>
                        <div className='shadow-lg overflow-x-auto'>
                            
                            {getpost.length ==0 ? (
                                <p className='w-200 text-2xl bg-gray-500 text-center p-5 mt-3'> No post yet</p>
                            ):(
                            <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                <thead>
                                    <tr className='bg-gray-400'>
                                        <th className='p-5'>post ID</th>
                                        <th className='p-5'>post title</th>
                                        <th className='p-5'>post image</th>
                                        <th className='p-5'>post content</th>
                                        <th className='p-5'>actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getpost.map((post)=>(
                                    <tr key={post._id}>
                                        <td className='p-5'>{post._id}</td>
                                        <td className='p-5'>{post.title}</td>
                                        <td className='p-5'><Image className='my-3 rounded-md' src={post.img} width={80} height={80} alt='picture'/></td>
                                        <td className='p-5'>{post.content}</td>
                                        <td className='p-5'><Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2' href={`/admin/posts/edit/${post._id}`}>Edit</Link>
                                         <Deletebutton id={post._id}/>
                                         </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
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