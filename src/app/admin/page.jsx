"use client"

import React,{useState,useEffect} from 'react'
import AdminNav from './component/AdminNav'
import Footer from './component/Footer'
import Container from './component/Container'
import SideNav from './component/SideNav'
import Content from './component/Content'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function Adminpage() {
  
  const {data:session} = useSession();
  if(!session) redirect("/Login")
  if(!session?.user.role === "admin")redirect("/Welcome")
  
  const[totalUserData,settotalUserData] = useState([])
  const[totalpostdata,settotalpostdata] = useState([])
  console.log("USERDATA",totalUserData)
  console.log("POSTDATA",totalpostdata)
  const gettotaluser = async()=>{
    try{
      const res =await fetch("http://localhost:3000/api/Totaluser",{
        cache: "no-store"
      })
      if(!res.ok){
        throw new Error("fail to fetch user")
      }
       const data = await res.json();
       settotalUserData(data.totalusers);
    
      }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    gettotaluser();
  },[]) 
  
  const getTotalPost = async() =>{
    try{
        const res = await fetch("http://localhost:3000/api/Totalposts",{
          cache : "no-store"
        })
        if(!res.ok){
          throw new Error("fail to fetch post")
        }
        const data = await res.json();
        settotalpostdata(data.totalposts);

    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getTotalPost();
  },[])
  
  return (
    <Container>
        <AdminNav session={session}/>
        <div className='flex-grow'>
            <div className='container mx-auto'>
                <div className='flex justify-between mt-10'>
                  <SideNav />
                  <Content totalUserData={totalUserData} totalpostdata={totalpostdata}/>
                </div>
            </div>

        </div>
        <Footer />
    </Container>
  )
}

export default Adminpage