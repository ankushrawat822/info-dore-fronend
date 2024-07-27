import React, { useEffect } from 'react'
import useVehicleStore from '../store/useVehicleData';
import { Input, Select, Option, Button } from "@material-tailwind/react";
import { Toaster, toast } from 'sonner';

const VehicleAddComp = () => {

    const { formData, setFormData, addVehicle } = useVehicleStore();


    useEffect(() => {
        console.log(formData)
    }, [formData])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(name, value);
    };


    const handleSelectChange = (name, value) => {
        setFormData(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addVehicle();

        toast.success("Vechicle data added successfully")
    };

    return (
        <>
            <Toaster position='top-right' richColors ></Toaster>
            <div className='flex justify-evenly items-center mt-20'>
                <div className=' lg:w-[60%] '>
                    <form onSubmit={handleSubmit} className="p-7 shadow-lg rounded-lg bg-white">
                        <div className='flex gap-5 w-full'>
                            <div className=' w-1/2' >
                                <div className="mb-4 ">
                                    <Select
                                        label="Type"
                                        name="type"
                                        value={formData.type}
                                        onChange={(value) => handleSelectChange('type', value)}
                                        required
                                    >
                                        <Option value="">Select Type</Option>
                                        <Option value="Car">Car</Option>
                                        <Option value="Garbage Truck">Garbage Truck</Option>
                                    </Select>
                                </div>
                                <div className="mb-4">
                                    <Input
                                        label="Make"
                                        type="text"
                                        name="make"
                                        value={formData.make}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        label="Model"
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        label="Year"
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        min="1900"
                                        max={new Date().getFullYear() + 1}
                                    />
                                </div>

                            </div>
                            <div className='w-1/2'>
                                <div className="mb-4">
                                    <Input
                                        label="License Plate"
                                        type="text"
                                        name="licensePlate"
                                        value={formData.licensePlate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        label="Mileage"
                                        type="number"
                                        name="mileage"
                                        value={formData.mileage}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Input
                                        label="Last Maintenance"
                                        type="date"
                                        name="lastMaintenance"
                                        value={formData.lastMaintenance}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* <div className="mb-4">
                                    <Input
                                        label="Next Maintenance"
                                        type="date"
                                        name="nextMaintenance"
                                        value={formData.nextMaintenance}
                                        onChange={handleChange}
                                        required
                                    />
                                </div> */}
                                {/* <div className="mb-4">
                                    <Input
                                        label="Maintenance Progress"
                                        type="number"
                                        name="maintenanceProgress"
                                        value={formData.maintenanceProgress}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="100"
                                    />
                                </div> */}
                                {/* <div className="mb-4">
                                    <Input
                                        label="Fuel Efficiency"
                                        type="number"
                                        name="fuelEfficiency"
                                        value={formData.fuelEfficiency}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </div> */}
                                <div className="mb-4">
                                    <Select
                                        label="Status"
                                        name="status"
                                        value={formData.status}
                                        onChange={(value) => handleSelectChange('status', value)}
                                        required
                                    >
                                        <Option value="Active">Active</Option>
                                        <Option value="Maintenance">Maintenance</Option>
                                        <Option value="Out of Service">Out of Service</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className='w-fit mx-auto '>
                            <Button type="submit" color="blue" ripple="light">
                                Add Vehicle
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default VehicleAddComp