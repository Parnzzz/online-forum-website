"use client"
import React ,{useEffect, useState} from 'react'
import AdminNav from '../../../component/AdminNav'
import Footer from '../../../component/Footer'

import Container from '../../../component/Container'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useParams } from 'next/navigation'

function AdminEditpage() {
  
     const{data:session} =useSession();
    
     if(!session ==="admin") redirect("/Login");
     if(session?.user?.role !=="admin") redirect("/Welcome");
     const {id} = useParams();
     const router = useRouter();

     const[oldpost,setoldpost] = useState([]);
     const[newTitle,setnewTitle] = useState("");
     const[newImg,setnewImg] = useState("");
     const[newContent,setnewContent] = useState("");
     
     const getoldpost = async(id) =>{
      try{
         const res = await fetch(`http://localhost:3000/api/Totalposts/${id}`,{
          method: "GET",
          cache: "no-store"
         })
         if(!res.ok){
          throw new Error("Failed to fetch")
         }
         const data = res.json();
         setnewTitle(data.post.title)
         setnewImg(data.post.img)
         setnewContent(data.post.content)
         setoldpost(data.post);
      }catch(error){
        console.log(error)
      }
     }
     useEffect(()=>{
      getoldpost(id);
     },[])

     const handleSubmit = async(e) =>{
      try{
        const res = await fetch(`http://localhost:3000/api/Totalposts/${id}`,{
          method: "PUT",
          headers: {"content-Type":"application/json"},
          body : JSON.stringify({newTitle: newTitle || oldpost.title,newImg: newImg || oldpost.img,newContent: newContent || oldpost.content})
        })
        if(!res.ok){
          throw new Error("Failed to update post")
        }
        router.refresh()
        router.push("/admin/posts")
      }catch(error){
        console.log(error)
      }

     }


     
  return (
    <Container>
        <AdminNav />
        <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                <Link className='bg-gray-500 rounded my-2 px-3 py-2 text-white border' href="/admin/posts">Go back</Link>
                <hr  className='my-3'/>
                <h3 className='text-xl'>Admin Edit post</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='post title' onChange={(e)=>setnewTitle(e.target.value)} value={oldpost.post?.title}/>
                  <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='post image url'onChange={(e)=>setnewImg(e.target.value)} value={oldpost.post?.img} />
                  <textarea className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' name="content" id="content" cols="30" rows="10" placeholder='Enter your post content' onChange={(e)=>setnewContent(e.target.value)} value={oldpost.post?.content}> </textarea>
                  <button type='submit' name='Update' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Update Post</button>
                </form>
            </div>
        </div>
        <Footer/>
    </Container>
  )
}

export default AdminEditpage