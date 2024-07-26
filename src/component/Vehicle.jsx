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
        <div>
            <center className='text-3xl font-semibold cursor-pointer' onClick={() => {
                setAddComp(false);
                setAllocateComp(false);
                setMoniterComp(false);
                setOptimizeComp(false);
                setCloseCard(false);
            }}>Vehicle</center>
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