import React, { useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {

  // State hooks 
  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  // Refs for panels 
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  // GSAP animations for panel transitions
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [confirmRidePopupPanel]);
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
        <div className="h-3/5">
            <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Background"/>
        </div>
        <div className='h-2/5 p-6'>
           <CaptainDetails /> 
        </div>

        {/* Ride PopUp Panel */}
        <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-8 pt-12 translate-y-full">
          <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>

        {/* Confirm Ride PopUp Panel */}
        <div ref={confirmRidePopupPanelRef} className="fixed w-full z-10 bottom-0 h-screen bg-white px-3 py-8 pt-12 translate-y-full">
          <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel}  setRidePopupPanel={setRidePopupPanel}/>
        </div>
    </div>
  )
}

export default CaptainHome