"use client"

import React from "react"
import { useRouter } from "next/navigation";
function Deletebutton ({id}){
     const router = useRouter();
    const handleDelete =async()=>{
    const confirmed = confirm("ARE YOU SURE");

    if(confirmed){
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?id=${id}`,{
            method: "DELETE"
        })
        if(res.ok){
            router.refresh();
            //window.location.reload();
        }
       
}
    }
     
     return(
        <a onClick={handleDelete}className='bg-red-500 text-black border py-2 px-3 rounded-md text-lg my-2' >Delete</a>
     )
}

export default Deletebutton