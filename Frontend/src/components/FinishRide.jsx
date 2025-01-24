import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate();
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: props.ride._id },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (response.status === 200) {
            navigate('/captain-home');
        }
    }
  return (
    <>
        <h5 className="absolute top-0 text-center text-3xl text-gray-200 w-[93%] p-1" onClick={()=>props.setFinishRidePanel(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Finish This Ride</h3>
        <div className='flex items-center justify-between p-4 mt-4 border-2 border-yellow-400 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='w-10 h-10 object-cover rounded-full' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstName + " " + props.ride?.user.fullname.lastName}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
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
            <div className="mt-10 w-full">
                <button 
                    to="/captain-home"
                    className='w-full mt-5 bg-green-600 text-white text-lg font-semibold p-3 rounded-lg flex justify-center items-center' 
                    onClick={endRide}>Finish Ride</button>
            </div>
        </div>
    </>
  )
}

export default FinishRide