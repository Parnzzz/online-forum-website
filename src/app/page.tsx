"use client"
import Image from "next/image";
import Container from "./component/Container"
import Navbar from "./component/navbar"
import Footer from './component/footer'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useSession } from "next-auth/react";




export default function Home() {
  
  const{data:session}=useSession();
 
  return (
    <main>
     <Container>
     <Navbar session={session} />
    <div className="container mx-auto flex-grow text-center  p-10">
      <h3 className="text-5xl text-white">Community Website</h3>
      <p className="text-xl text-white">Post your story with image </p>
      <div className="  flex justify-center items-center my-10 ">
      <div className="w-[1000px] h-[800px]">
      <Swiper
              autoplay={{
                delay: 2000, 
                disableOnInteraction: false, // ให้ Swiper ต่อเนื่องแม้จะมีการอินเทอร์แอค
              }}
              loop={true} 
              // effect="fade" // ใช้เอฟเฟกต์ fade
              modules={[Autoplay, EffectFade]} // ใช้โมดูล autoplay และ fade effect
           className="w-full h-full " >
  
       
       <SwiperSlide className="relative flex justify-center items-center w-full h-full "> 
        <Image src="https://images.unsplash.com/photo-1535916707207-35f97e715e1c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        width={1000} height={800} alt='pic1'  /> 
        </SwiperSlide>
       <SwiperSlide className="relative  flex justify-center items-center w-full h-full ">
       <Image src="https://images.unsplash.com/photo-1464757494038-157e877f60d4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
       width={1000} height={800} alt='pic2'  /> 
       </SwiperSlide>
       <SwiperSlide className="relative flex justify-center items-center w-full h-full ">
       <div className="relative w-[1000px] h-[800px]">
       <Image src="https://images.unsplash.com/photo-1557733686-3f8641465d21?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
       width={1000} height={800} alt='pic3'  /> 
       </div>
       </SwiperSlide>
       
      </Swiper>
      </div>
    </div>
    </div>
    <Footer />
     </Container>

     
    </main>
  );
}
