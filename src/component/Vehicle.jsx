import React, { useState } from 'react'
import VehicleAddComp from './VehicleAddComp';
import VehicleAllocateComp from './VehicleAllocateComp';
import VehicleMoniterComp from './VehicleMoniterComp';
import VehicleOptimizeComp from './VehicleOptimizeComp';


const Vehicle = () => {

    const [addComp, setAddComp] = useState(false);
    const [allocateComp, setAllocateComp] = useState(false);
    const [moniterComp, setMoniterComp] = useState(false);
    const [optimizeComp, setOptimizeComp] = useState(false);
    const [closeCard, setCloseCard] = useState(false);


    return (
        <div className='relative p-3'>
            <center className='text-3xl font-semibold'>Vehicle</center>
            {
                !closeCard &&
                <section className='flex justify-evenly gap-10 px-6 mt-24'>

                            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 border border-gray-400">
                                <div className="p-6">
                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        Add Vehicle
                                    </h5>
                                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    Quickly input and save details of new vehicles in the system
                                    </p>
                                </div>
                                <div className="p-6 pt-0">
                                    <button
                                        onClick={() => { setCloseCard(true); setAddComp(true); }}
                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                        type="button">
                                        Open
                                    </button>
                                </div>
                            </div>
                            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 border border-gray-400">
                                <div className="p-6">
                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        Allocate Vehicle
                                    </h5>
                                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    Assign multiple vehicles to different projects or departments efficiently
                                    </p>
                                </div>
                                <div className="p-6 pt-0">
                                    <button
                                        onClick={() => { setCloseCard(true); setAllocateComp(true); }}
                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                        type="button">
                                        Open
                                    </button>
                                </div>
                            </div>
                        
                            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 border border-gray-400">
                                <div className="p-6">
                                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        Moniter Vehicle
                                    </h5>
                                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    Keep track of the status and usage of all vehicles
                                    </p>
                                </div>
                                <div className="p-6 pt-0">
                                    <button
                                        onClick={() => { setCloseCard(true); setMoniterComp(true); }}
                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                        type="button">
                                        Open
                                    </button>
                                </div>

                        </div>
                    {/* <div className='border border-black p-3 rounded-md cursor-pointer'
                        onClick={() => { setCloseCard(true); setAddComp(true); }}
                    >ADD</div>
                    <div className='border border-black p-3 rounded-md cursor-pointer'
                        onClick={() => { setCloseCard(true); setAllocateComp(true); }}
                    >ALLOCATE</div>
                    <div className='border border-black p-3 rounded-md cursor-pointer'
                        onClick={() => { setCloseCard(true); setMoniterComp(true); }}
                    >MONITER</div>
                    <div className='border border-black p-3 rounded-md cursor-pointer'
                        onClick={() => { setCloseCard(true); setOptimizeComp(true); }}
                    >OPTIMIZE</div> */}
                </section>
            }

            {
                closeCard && <div className='bg-blue-500 text-gray-100 absolute top-4 right-10 rounded-md px-4 py-2 cursor-pointer ' onClick={() => {
                    setAddComp(false);
                    setAllocateComp(false);
                    setMoniterComp(false);
                    setOptimizeComp(false);
                    setCloseCard(false);
                }}>BACK</div>
            }

            <div>
                {addComp && <VehicleAddComp />}
                {allocateComp && <VehicleAllocateComp />}
                {moniterComp && <VehicleMoniterComp />}
                {/* {optimizeComp && <VehicleOptimizeComp />} */}
            </div>
        </div >
    )
}

export default Vehicle