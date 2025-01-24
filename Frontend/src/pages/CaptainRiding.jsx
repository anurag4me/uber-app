import React, { useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {
        const [finishRidePanel, setFinishRidePanel] = useState(false)
        const finishRidePanelRef = useRef(null)
        const location = useLocation()
        const rideData = location.state?.ride
        
        useGSAP(() => {
            if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)',
            });
            } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)',
            });
            }
        }, [finishRidePanel]);
  return (
    <div className="h-screen">
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img
            className="w-16 top-7 left-7"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
          <Link to="/captain-home" className="bg-white h-10 w-10 flex items-center justify-center rounded-full">
            <i className='ri-logout-box-r-line text-lg font-medium'></i>
        </Link>
        </div>
        <div className="h-4/5">
            <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Background"/>
        </div>
        <div className='h-1/5 p-6 flex justify-between items-center bg-yellow-400 relative'
        onClick={()=>setFinishRidePanel(true)}
        >
            <h5 className="absolute top-0 text-center text-3xl w-[95%] p-1" onClick={()=>{}}><i className="ri-arrow-up-wide-line"></i></h5>
            <h4 className='text-xl font-semibold'>4 KM away</h4>
            <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
        </div>   
        {/* Ride PopUp Panel */}
        <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-8 pt-12 translate-y-full">
          <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel}/>
        </div>
    </div>
  )
}

export default CaptainRiding