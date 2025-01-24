import React from 'react'
import { useCaptain } from '../context/CaptainContext'

const CaptainDetails = () => {
  const {captain} = useCaptain()
  return (
    <>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <img className='w-10 h-10 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
            <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstName + " " + captain.fullname.lastName}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹193.20</h4>
            <p className='text-center text-sm text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
          <div className='text-center'>
            <i className='ri-timer-2-line text-3xl mb-2 font-thin'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className='ri-speed-up-line text-3xl mb-2 font-thin'></i>
            <h5 className='text-lg font-medium'>30 KM</h5>
            <p className='text-sm text-gray-600'>Total Distance</p>
          </div>
          <div className='text-center'>
            <i className='ri-booklet-line text-3xl mb-2 font-thin'></i>
            <h5 className='text-lg font-medium'>20</h5>
            <p className='text-sm text-gray-600'>Total Jobs</p>
          </div>
        </div>
    </>
  )
}

export default CaptainDetails