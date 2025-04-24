"use client"

import React,{useState} from 'react'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Container from '../../component/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'



function Createpage() {
  
  const {data:session} = useSession();
  if(!session) redirect("/Login");

  const userEmail = session?.user?.email;
  

  const[title, setTitle] =useState("")
  const[img, setImg] =useState(["","","",""]);
  const[content, setContent] =useState("")

  const router = useRouter();
   
  console.log(img)
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const filteredImgs = img.filter(img => img.trim() !== "");
    const imgArray = filteredImgs.join(",");  //convert string
    if(!title || img.length <0 || !content){
      alert("please complete all input.");
      return;
    }
    try{
       const res= await fetch("http://localhost:3000/api/posts",{
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({title,img:filteredImgs,content,userEmail})
       })
       if (res.ok){
        router.push("/Welcome");
       } else{
        throw new Error("failed to create a post")
       }
    }catch(error){
      console.log("Cannot send Content :",error)
    }
  }
  
  const handleImage = (index, value) => {
    const updatedImgs = [...img]
    updatedImgs[index] = value
    setImg(updatedImgs)
  }

  return (
    <Container>
        <Navbar session={session}/>
        <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl bg-[var(--secondary-color)]'>
                <Link className='bg-gray-500 rounded my-2 px-3 py-2 text-white border' href="/Welcome">Go back</Link>
                <hr  className='my-3'/>
                <h3 className='text-xl'>Create post</h3>
                <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setTitle(e.target.value)} className='w-[500px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='post title' />
                {img.map((url, index) => (
                <input  key={index} type="text" value={url} onChange={(e) => handleImage(index,e.target.value)}   className='w-[500px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='post image url www.unsplash.com' />
              ))}
                <textarea  onChange={(e) => setContent(e.target.value)}  className='w-[500px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' name="content" id="content" cols="30" rows="10" placeholder='Enter your post content'></textarea>
                <button type='submit' name='create' className='bg-green-500 text-black border py-2 px-3 rounded text-lg my-2'>Create Post</button>
                </form>
            </div>
        </div>
        <Footer/>
    </Container>
  )
}

export default Createpage