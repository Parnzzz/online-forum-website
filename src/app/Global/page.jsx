"use client"
import React,{useEffect,useState} from 'react';
import Container from '../../component/Container';
import Navbar from '../../component/navbar';
import Footer from '../../component/footer';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from'next/link';
import Image from'next/image';

function Globalpage() {
   const {data:session} = useSession();
    if(!session) redirect("/Login");
    
    const[getallpost,setgetallpost] = useState([]);
    const [getname ,setgetname] = useState([]);

    console.log(getname)
    const getAllpostData = async()=>{
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Totalposts`,{
                method: "GET",
                cache: "no-store"
            })
            if(!res.ok){
                throw new Error("Failed to get POST")
            }
            const data = await res.json();
            setgetallpost(data.totalposts)
        }catch(error){
            console.log(error)
        }
    }
    const getNamepostData = async()=>{
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/Totaluser`,{
                method: "GET",
                cache: "no-store"
            })
            if(!res.ok){
                throw new Error("Failed to get POST")
            }
            const data = await res.json();
            setgetname(data.totalusers)
        }catch(error){
            console.log(error)
        }
    }
    
    
    
    
    useEffect(()=>{
        getAllpostData();
        getNamepostData();
    },[])
  
    return (
        <Container>
            <Navbar session={session}/>
            <div className='flex-grow'>
                <div className='bg-[var(--secondary-color)] container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <div className='flex justify-between'>
                    <div>
                        <h3 className='text-3xl'>Global Community</h3>
                        <p>Welcome: {session?.user?.name}</p>
                        
                   </div>     
                <div>
                <Link href="/Create" className='bg-[var(--button-bg)] text-black border py-2 px-3 rounded-md text-lg my-2'>Create Post</Link>
              </div>
                </div>
            {/* user post data*/}
             <div>
                <div className='bg-[var(--button-bg)] shadow-xl my-10 p-10 rounded-xl '>
                    <h4 className='text-2xl'>Image and Content</h4>
                    <div className='flex  flex-col gap-10 md:flex-col lg:flex-row flex-wrap'>
                    <Image className='my-3 rounded-md ' 
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={300} height={0} alt='picture' />
                    <Image className='my-3 rounded-md' 
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2762&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={300} height={0} alt='picture'/>
                    <Image className='my-3 rounded-md' 
                    src="https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={300} height={0} alt='picture'/>
                    <Image className='my-3 rounded-md' 
                    src="https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={300} height={0} alt='picture'/>
                    
                    
                    </div>
                   <p className='text-xl'>Hello my name is kittisak buachan i live in bangkok i love dog i am learning programming languague develop website using next.js i love pizza</p>
                    <div className='mt-5'><p className='text-yellow-700'>Author: Admin</p></div>
                    
                    </div>
                    
             </div>
            
                
                {getallpost && getallpost.length >0 ?( getallpost.map(val =>{
                const author = getname.find((totaluser) => totaluser.email === val.userEmail);
                return(
                <div key={val._id}className='bg-[var(--button-bg)] shadow-xl my-10 p-10 rounded-xl '>
                    <h4 className='text-2xl'>{val.title}</h4>
                    <div className='flex  flex-col gap-10 md:flex-col lg:flex-row flex-wrap'>
                    {val.img && Array.isArray(val.img) &&val.img.map((url,index) =>(
                    <Image key={index} className='my-3 rounded-md ' src={url.trim()} width={300} height={0} alt={val.title} />
                      ))}
                    </div>
                   <p className='text-xl'>{val.content}</p>
               <div className='mt-5 '>
                  {author?.role==="admin"?( 
                   <p className='text-yellow-700'>Admin: {author?.name}</p>
                  ):(
                    <p className='text-black'>Author: {author?.name}</p>
                  )}
                </div> 
                </div>
                )
            })
             ):(
              <p className='bg-[var(--button-bg)] py-3 px-3 '> You dont have any post yet</p>
             )}
            </div>
            </div>
            <Footer />
        </Container>
      )
}

export default Globalpage