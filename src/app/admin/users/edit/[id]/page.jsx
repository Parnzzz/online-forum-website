"use client"
import React ,{useState,useEffect}from 'react'
import AdminNav from '../../../component/AdminNav'
import Footer from '../../../component/Footer'

import Container from '../../../component/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

function Adminedituser() {
  const{data:session} =useSession();
    if(!session) redirect("/Login") 
    if(session?.user?.role !=="admin") redirect("/Welcome") 

    const params = useParams();
    const { id } = params
    const router = useRouter();
    const[userOlddata,setuserOlddata]= useState([]);

    const[newName,setnewName] = useState("")
    const[newEmail,setnewEmail] = useState("")
    const[newPassword,setnewPassword] = useState("")
    
    const getuserbyid =async(id)=>{
       try{
        const res = await fetch(`http://localhost:3000/api/Totaluser/${id}`,{
          method: "GET",
          cache: "no-store"
        })
        if(!res.ok){
          throw new Error("Failed to fetch")
        }
        const data = await res.json();
        setnewName(data.user.name);
        setnewEmail(data.user.email);
        setnewPassword(data.user.password);
        setuserOlddata(data.user);
       }
       catch(error){
        console.log(error)
       }
      }
    useEffect(()=>{
      getuserbyid(id);
    },[])
  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      const updatedName = newName || userOlddata.name;
      const updatedEmail = newEmail || userOlddata.email;
      const updatedPassword = newPassword || userOlddata.password;
      try{
        const res = await fetch(`http://localhost:3000/api/Totaluser/${id}`,{
          method: "PUT",
          headers:{
            "content-Type":"application/json"
          },
          body: JSON.stringify({newName: updatedName,newEmail: updatedEmail,newPassword: updatedPassword})
          })
          if(!res.ok){
            throw new Error("Failed to update")
          }
          router.refresh();
          router.push("/admin/users")
      }
      catch(error){
        console.log(error)
      }
    }

  return (
    <Container>
        <AdminNav />
        <div className='flex-grow'>
        <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                <Link className='bg-gray-500 rounded my-2 px-3 py-2 text-white border' href="/admin/users">Go back</Link>
                <hr  className='my-3'/>
                <h3 className='text-xl'>Admin Edit User page</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={userOlddata?.name} onChange={(e)=>setnewName(e.target.value)} value={newName}/>
                  <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={userOlddata?.email} onChange={(e)=>setnewEmail(e.target.value)} value={newEmail}/>
                  <input type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='New Password' onChange={(e)=>setnewPassword(e.target.value)} required/>
                  <button type='submit' className='text-white border py-2 px-3 rounded text-lg my-2'>Update Post</button>
                  
                </form>
            </div>
        </div>


        

    <Footer />

    </Container>
  )
}

export default Adminedituser