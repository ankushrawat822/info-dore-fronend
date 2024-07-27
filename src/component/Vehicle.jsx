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
                <section className='flex justify-evenly gap-10 mt-20'>
                    <div className='border border-black p-3 rounded-md cursor-pointer'
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
                    >OPTIMIZE</div>
                </section>
            }

            {
                closeCard && <div className='bg-blue-500 text-gray-100 absolute top-2 right-2 rounded-md px-4 py-2 cursor-pointer ' onClick={() => {
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
                {optimizeComp && <VehicleOptimizeComp />}
            </div>
        </div >
    )
}

export default Vehicle