import React from 'react'

const ConfirmRide = (props) => {
    let vehicleImg = ""
    if (props.vehicleType === "auto") {
        vehicleImg = "uber-auto.png";
    } else if (props.vehicleType === "moto") {
        vehicleImg = "uber-bike.webp";
    } else {
        vehicleImg = "uber-car.jpg";
    }
  return (
    <>
        <h5 className="absolute top-0 text-center text-3xl text-gray-200 w-[93%] p-1" onClick={()=>props.setConfirmRidePanel(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
        <div className='flex justify-between flex-col items-center gap-2'>
            <img className='h-20' src={vehicleImg} alt="" />
            <div className='w-full mt-5'>
                <div className='text-lg flex items-center gap-5 p-3 border-b-2'>
                    <i className='ri-map-pin-user-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>{props.pickup}</p>
                    </div>
                </div>
                <div className='text-lg flex items-center gap-5 p-3 border-b-2'>
                    <i className='ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>{props.destination}</p>
                    </div>
                </div>
                <div className='text-lg flex items-center gap-5 p-3'>
                    <i className='ri-currency-line'></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
                    </div>
                </div>
            </div>
            <button 
                className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg' 
                onClick={()=>{
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide();
                }
            }>Confirm</button>
        </div>
    </>
  )
}

export default ConfirmRide