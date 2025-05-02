"use client"

import React,{useState} from 'react'
import Navbar from '../component/navbar'
import Container from '../component/Container'
import Footer from '../component/footer'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {redirect} from'next/navigation'

function RegisterPage() {
 const[name ,SetName] =useState("")
 const[email ,SetEmail] =useState("")
 const[password ,Setpassword] =useState("")
 const[confirmPassword ,SetconfirmPassword] =useState("")
 const[error ,SetError] =useState("")
 const [success, setSuccess] =useState("") 
  
 const{data: session} =useSession();
 if(session) redirect("/Welcome");
 
 
 
 const handleSubmit =async (e) =>{
    e.preventDefault();
    if(password != confirmPassword){
    SetError("password do not match");
    return;
    }
    if(!name ||!email || !password ||!confirmPassword){
      SetError("Please complete all inputs");
      return;
    }
    try{
        const resUserExists = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userExist`,{  
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ email,name })
        })
         
        const{user ,username} =await resUserExists.json();
        if(user){
          SetError("User already exist");
          return;
        }
        if(username){
          SetError("Name already Exist");
          return;
        }
        
       
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`,{
          method: "POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            name, email,password
          })
         })

         if (res.ok){
          const form = e.target; //เข้าถึงform
          SetError("");       //ทำให้error หายไปเมื่อ register success
          setSuccess("User register sucessfully")
          form.reset();    //reset form
          console.log("เรียบร้อยย")
         }
         else{
          console.log("User registration Failed.")
         }
    }catch(error){
      console.log("Error during registration",error);
    }
  
  
  
  
  }
  
  return (
    <Container>
     <Navbar />
     <div className='flex-grow'>
        <div className='flex justify-center items-center'>
            <div className='w-[400px] bg-[var(--secondary-color)] shadow-xl p-10 mt-5 rounded-xl'>
                <h3 className='text-3xl'>Register</h3>
                <hr className='my-3 border-t-2 border-gray-300'/>
                <form onSubmit={handleSubmit}>

                  {error && (    //ถ้ามี error
                    <div className='bg-red-500 w-fit text-sm text-white pu-1 px3 rounded-md'>
                      {error}
                    </div>
                  )}
                  {success && (    //ถ้าไม่มี error
                    <div className='bg-green-500 w-fit text-sm text-white pu-1 px3 rounded-md'>
                      {success}
                    </div>
                  )}


                <input type="text" onChange={(e)=>SetName(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 text-lg my-2' placeholder='Enter your name' />
                <input type="text"onChange={(e)=>SetEmail(e.target.value)}  className='w-full bg-gray-200 border py-2 px-3 text-lg my-2' placeholder='Enter your email' />
                <input type="password" onChange={(e)=>Setpassword(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 text-lg my-2' placeholder='Enter your password' />
                <input type="password"onChange={(e)=>SetconfirmPassword(e.target.value)}  className='w-full bg-gray-200 border py-2 px-3 text-lg my-2' placeholder='Confirm your password' />
                 <button className='bg-green-500 text-black border py-2 px-3 rounded text-lg my-2 cursor-pointer' type="submit">Sign up</button>
                <hr className='my-3'/>
                <p>Already have an account{' '}
                 <Link href="/Login" className='text-blue-500 hover:underline'>Register</Link>
                </p>
                    </form>
                    
            </div>
        </div>
     </div>
     
     
     <Footer />
    </Container>
   
  )
}

export default RegisterPage
