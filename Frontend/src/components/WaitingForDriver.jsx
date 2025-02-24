import React from 'react'

const WaitingForDriver = (props) => {
    let vehicleImg = ""
    if (props.ride?.captain.vehicle.vehicleType === "auto") {
        vehicleImg = "uber-auto.png";
    } else if (props.ride?.captain.vehicle.vehicleType === "moto") {
        vehicleImg = "uber-bike.webp";
    } else {
        vehicleImg = "uber-car.jpg";
    }
  return (
    <>
        <h5 className="absolute top-0 text-center text-3xl text-gray-200 w-[93%] p-1" onClick={()=>props.setWaitingForDriver(false)}><i className="ri-arrow-down-wide-line"></i></h5>

        <div className='flex items-center justify-between'>
            <img className='h-12' src={vehicleImg} alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstName}</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1 capitalize'>{props.ride?.captain.vehicle.plate}</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
            </div>
        </div>
        <div className='flex justify-between flex-col items-center gap-2'>
            <div className='w-full mt-5'>
                <div className='text-lg flex items-center gap-5 p-3 border-b-2'>
                    <i className='ri-map-pin-user-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>{props.ride?.pickup}</p>
                    </div>
                </div>
                <div className='text-lg flex items-center gap-5 p-3 border-b-2'>
                    <i className='ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='text-lg flex items-center gap-5 p-3'>
                    <i className='ri-currency-line'></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default WaitingForDriver