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
          <img className="h-12" src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
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
          <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
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
          <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
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