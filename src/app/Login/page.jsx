"use client"
import React ,{useEffect, useState} from 'react'
import Navbar from '../../component/navbar'
import Container from '../../component/Container'
import Footer from '../../component/footer'
import Link from 'next/link'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import { useSession } from 'next-auth/react'

function LoginPage() {
  
  const [email,setEmail] = useState("")
  const [password,setPassword] =useState("")
  const [error ,setError] =useState("")
  const router =useRouter();
  
  const{data:session} = useSession();
  useEffect(() => {
    if (session) {
      router.replace("/Welcome");
    }
  }, [session]);
  
  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
       const res = await signIn("credentials",{
        email, password, redirect: false
       })
       if (res.error){
        setError("Invalid Email or Password")
        console.log(res.error)
        return;
       }
      console.log(res)
       router.replace("/Welcome")
    }catch(error){
      console.log(error);
      setError("Something went wrong, please try again.");
    }
  }
  
  return (
    <Container>
     <Navbar />
     <div className='flex-grow'>
        <div className='flex justify-center items-center'>
            <div className='w-[400px] bg-[var(--secondary-color)] shadow-xl p-10 mt-5 rounded-xl'>
                <h3 className='text-3xl'>Login</h3>
                <hr className='my-3 border-t-2 border-gray-300'/>
                <form onSubmit={handleSubmit}>
                
                {error && (
                  <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                    {error}
                  </div>
                 )}
                
                
                <input type="text" onChange={(e)=> setEmail(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 text-lg my-2' placeholder='Enter your email' />
                <input type="password" onChange={(e)=> setPassword(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 text-lg my-2' placeholder='Enter your password' />
                 <button className='bg-green-500 text-black border py-2 px-3 rounded text-lg my-2' type="submit">Sign in</button>
                <hr className='my-3'/>
                <p>Do not have an account?{' '}
                 <Link href="/register" className='text-blue-500 hover:underline'>Register</Link>
                </p>
                    </form>
                    
            </div>
        </div>
     </div>
     
     
     <Footer />
    </Container>
   
  )
}

export default LoginPage
