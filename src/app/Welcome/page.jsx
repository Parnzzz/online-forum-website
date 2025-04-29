"use client"

import React, { useState,useEffect } from 'react'
import Navbar from '../component/navbar'
import Footer from '../component/footer'
import Container from '../component/Container'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Deletebutton from './DeleteBtn'

function Welcomepage() {
  const {data: session} = useSession();
  if(!session) redirect('/Login');
  
  //console.log(session)
  if(session?.user?.role==="admin") redirect("/admin");
  const [postdata,setPostData] = useState([])

  //console.log(postdata)
  
  const userEmail = session?.user?.email;
  const getPost = async () =>{
    try{
     
      const res  =await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?email=${userEmail}`,{
        cache: "no-store"   //get new data everytime fetch
      })
      if(!res.ok){
        throw new Error("Failed to fetch posts")
      }
      const data = await res.json();
      console.log(data);
      setPostData(data.posts)
    }catch(error){
      console.log("Error loading post" ,error)
    }
  }
  useEffect(()=> {
    getPost();
  },[])
  return (
    <Container>
        <Navbar session={session}/>
        <div className='flex-grow'>
            <div className='bg-[var(--secondary-color)] container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                <div className='flex justify-between'>
                <div>
                    <h3 className='text-3xl'>Profile</h3>
                    <p>Welcome: {session?.user?.name}</p>
                    <p>Email: {session?.user?.email}</p>
               </div>     
            <div>
            <Link href="/Create" className='bg-[var(--button-bg)] text-black border py-2 px-3 rounded-md text-lg my-2'>Create Post</Link>
          </div>
            </div>
            
            {postdata && postdata.length >0 ?( postdata.map(val =>(
            <div key={val._id}className='bg-[var(--button-bg)] shadow-xl my-10 p-10 rounded-xl '>
                <h4 className='text-2xl'>{val.title}</h4>
                <div className='flex  flex-col gap-10 md:flex-col lg:flex-row flex-wrap'>
                {val.img && Array.isArray(val.img) && val.img.map((url,index)=>(
                <Image key={index} className='my-3 rounded-md ' src={url.trim()} width={300} height={0} alt={val.title} />
                ))}
                
                </div>
               <p>{val.content}</p>
           <div className='mt-5 '>
            <Link className='bg-gray-500 text-black border py-2 px-3 rounded-md text-lg my-2 mx-2' href={`/edit/${val._id}`}>Edit</Link>
             <Deletebutton id={val._id}/>
            </div> 
            </div>
         
          ))
         ):(
          <p className='bg-[var(--button-bg)] py-3 px-3 '> You dont have any post yet</p>
         )}
        </div>
        </div>
        <Footer />
    </Container>
  )
}

export default Welcomepage