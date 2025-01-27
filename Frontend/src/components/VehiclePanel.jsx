import React from 'react'

const VehiclePanel = (props) => {
  return (
    <>
        <h5 className="absolute top-0 text-center text-3xl text-gray-200 w-[93%] p-1" onClick={()=>props.setVehiclePanel(false)}><i className="ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div 
            className="flex w-full p-3 mb-2 items-center justify-between border-2 active:border-black rounded-xl"
            onClick={() => {
              props.setConfirmRidePanel(true)
              props.selectVehicle('car')
            }}>
          <img className="h-12" src="uber-car.jpg" alt="" />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
        </div>
        <div 
            className="flex w-full p-3 mb-2 items-center justify-between border-2 active:border-black rounded-xl"
            onClick={() => {
              props.setConfirmRidePanel(true)
              props.selectVehicle('moto')
            }}>
          <img className="h-12" src="uber-bike.webp" alt="" />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-base">Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable motorcycle rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
        </div>
        <div 
            className="flex w-full p-3 mb-2 items-center justify-between border-2 active:border-black rounded-xl"
            onClick={() => {
              props.setConfirmRidePanel(true)
              props.selectVehicle('auto')
            }}>
          <img className="h-12" src="uber-auto.png" alt="" />
          <div className="ml-4 w-1/2">
            <h4 className="font-medium text-base">Uber Auto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">Affordable auto rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
        </div>
    </>
  )
}

export default VehiclePanel