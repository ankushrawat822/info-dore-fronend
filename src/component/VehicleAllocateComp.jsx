import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Textarea,
} from "@material-tailwind/react";


const VehicleAllocateComp = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [allocationDetails, setAllocationDetails] = useState({
        project: '',
        allocatedTo: '',
        start: '',
        end: ''
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/vehicles`);
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleCheckboxChange = (vehicleId) => {
        setSelectedVehicles((prevSelected) => {
            if (prevSelected.includes(vehicleId)) {
                return prevSelected.filter(id => id !== vehicleId);
            } else {
                return [...prevSelected, vehicleId];
            }
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAllocationDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/update-allocation`, {
                vehicleIds: selectedVehicles,
                allocation: allocationDetails
            });
            setOpen(false);
            toast.success("Allocation Successfull")
        } catch (error) {
            console.error('Error allocating vehicles:', error);
        }
    };

    return (

        <div className="p-6">
            <Toaster position='top-right' richColors></Toaster>
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-blue-200">
                        <tr>
                            <th></th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Type</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Make</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Model</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Year</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">License Plate</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Mileage</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle._id} className="bg-white hover:bg-gray-100 cursor-pointer">
                                {vehicle.allocation.isAllocation ? <td className='py-2 px-4 border-b border-gray-300'></td> :
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <input
                                            type="checkbox"
                                            checked={selectedVehicles.includes(vehicle._id)}
                                            onChange={() => handleCheckboxChange(vehicle._id.toString())}
                                        />
                                    </td>
                                }
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.type}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.make}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.model}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.year}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.licensePlate}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.mileage}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                    onClick={handleOpen}
                    disabled={selectedVehicles.length === 0}
                >
                    Allocate
                </button>
            </div>


            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        {" "}
                        <Typography className="mb-1" variant="h4">
                            Set Allocation Details
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody>
                    <div className="grid gap-6">
                        <Input
                            label="Project Name"
                            name="project"
                            value={allocationDetails.project}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Allocated To"
                            name="allocatedTo"
                            value={allocationDetails.allocatedTo}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Start Date"
                            name="start"
                            type="date"
                            value={allocationDetails.start}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="End Date"
                            name="end"
                            type="date"
                            value={allocationDetails.end}
                            onChange={handleInputChange}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default VehicleAllocateComp;
