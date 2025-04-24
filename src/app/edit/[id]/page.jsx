"use client"

import React ,{useState, useEffect}from 'react'
import Navbar from '../../../component/navbar'
import Footer from '../../../component/footer'
import Container from '../../../component/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect,useRouter,useParams } from 'next/navigation'


function Editpage() {
  
     const {data: session} =useSession();
     if(!session) redirect("/Login")
      const params =useParams()
      const id = params.id;

    console.log(id)

    const[postdata,setpostdata] = useState("")

    //new data edit
    const[newTitle,setnewTitle] = useState("")
    const[newImg,setnewImg] = useState("")
    const[newContent,setnewContent] = useState("")
    const router =useRouter();

    const getpostbyid = async (id)  =>{
       try{
          const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
            method: "GET",
            cache: "no-store"

          })
          if(!res.ok){
            throw new Error("Failed to fetch post")
          }
          const data =  await res.json();
          setnewTitle(data.post.title);
          setnewImg(data.post.img);
          setnewContent(data.post.content);
          
          console.log("Edit post",data)
          setpostdata(data);
          
       }catch(error){
        console.log(error)
       }
       
    }
    useEffect(()=>{
      getpostbyid(id);
    },[])

    const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
        const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json"    //specify type of data sent //
          },
          body: JSON.stringify({newTitle,newImg,newContent})  //convert js object to string JSON
       })
       if(!res.ok){
        throw new Error("Failed to update post")
       }
       router.refresh();
       router.push("/Welcome")
      }catch(error){
        console.log(error)
      }
    }
  return (
    <Container>
        <Navbar/>
        <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl bg-[var(--secondary-color)]'>
                <Link className='bg-gray-500 rounded my-2 px-3 py-2 text-white border' href="/Welcome">Go back</Link>
                <hr  className='my-3'/>
                <h3 className='text-xl'>Edit post</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                  onChange={(e)=>setnewTitle(e.target.value)}  placeholder={postdata.post?.title} value={newTitle}/>
                  <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                  onChange={(e)=>setnewImg(e.target.value)} placeholder={postdata.post?.img} value={newImg}/>
                  <textarea className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' name="content" id="content" cols="30" rows="10" 
                  onChange={(e)=>setnewContent(e.target.value)} placeholder={postdata.post?.content} value={newContent}>{postdata.post?.content}</textarea>
                  <button type='submit' name='Update' className='bg-green-500 text-black border py-2 px-3 rounded text-lg my-2'>Update Post</button>
                </form>
            </div>
        </div>
        <Footer/>
    </Container>
  )
}

export default Editpage