import React from 'react'

const RidePopUp = ({setRidePopupPanel, setConfirmRidePopupPanel}) => {
  return (
    <>
        <h5 className="absolute top-0 text-center text-3xl text-gray-200 w-[93%] p-1" onClick={()=>setRidePopupPanel(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
        <div className='flex items-center justify-between p-3 mt-4 bg-yellow-400 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='w-10 h-10 object-cover rounded-full' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                <h2 className='text-lg font-medium'>Harshali Patel</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
        <div className='flex justify-between flex-col items-center gap-2'>
            <div className='w-full mt-5'>
                <div className='text-lg flex items-center gap-5 p-3 border-b-2'>
                    <i className='ri-map-pin-user-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Ahmedabad</p>
                    </div>
                </div>
                <div className='text-lg flex items-center gap-5 p-3 border-b-2'>
                    <i className='ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Ahmedabad</p>
                    </div>
                </div>
                <div className='text-lg flex items-center gap-5 p-3'>
                    <i className='ri-currency-line'></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹193.20</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
                    </div>
                </div>
            </div>
            <div className='mt-5 w-full flex items-center justify-between'>
                <button className='bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'
                    onClick={()=>setRidePopupPanel(false)}
                >Ignore</button>   
                <button 
                    className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg' 
                    onClick={()=>{
                        setConfirmRidePopupPanel(true)
                    }
                }>Accept</button>
            </div>
        </div>
    </>
  )
}

export default RidePopUp