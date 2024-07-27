import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarArtifact from './CarArtifact';
import CarGrid from './CarGrid';

const VehicleMoniterComp = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null); // State to store the selected vehicle
    const [isDetailView, setIsDetailView] = useState(false); // State to toggle between table and detail view

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/vehicles`);
                setVehicles(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleBackToTable = () => {
        setIsDetailView(false); // Switch back to table view
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Formats as MM/DD/YYYY or based on locale
    };


    const vehicleDetails = [
        { label: "Type", key: "type" },
        { label: "Make", key: "make" },
        { label: "Model", key: "model" },
        { label: "Year", key: "year" },
        { label: "License Plate", key: "licensePlate" },
        { label: "Mileage", key: "mileage" },
        { label: "Last Maintenance", key: "lastMaintenance" },
        { label: "Next Maintenance", key: "nextMaintenance" },
        { label: "Maintenance Progress", key: "maintenanceProgress" },
        { label: "Fuel Efficiency", key: "fuelEfficiency" },
        { label: "Status", key: "status" },
    ];

    const allocationDetails = [
        { label: 'Allocated', key: 'isAllocation', transform: value => value ? 'Yes' : 'No' },
        { label: 'Project Name', key: 'project' },
        { label: 'Start Date', key: 'start', transform: formatDate },
        { label: 'End Date', key: 'end', transform: formatDate },
        { label: 'AllocatedTo', key: 'allocatedT' },
    ];

    return (
        <div className="p-6">
            <div className="overflow-x-auto rounded-xl">
                {isDetailView ? (
                    // <div>
                    //     <div className='flex w-full justify-evenly mt-14'>
                    //         <table className="max-w-1/2 border border-gray-300 rounded-lg">
                    //             <tbody>
                    //                 {vehicleDetails.map(({ label, key }) => (
                    //                     <tr key={key}>
                    //                         <th className="py-1 px-2 text-left font-medium">{label}</th>
                    //                         <td className="py-1 px-2">
                    //                             {key === 'lastMaintenance' || key === 'nextMaintenance'
                    //                                 ? formatDate(selectedVehicle[key])
                    //                                 : selectedVehicle[key]
                    //                             }
                    //                         </td>
                    //                     </tr>
                    //                 ))}
                    //             </tbody>
                    //         </table>
                    //         {console.log(selectedVehicle.allocation.isAllocation)}
                    //         {selectedVehicle.allocation.isAllocation ? (
                    //             <table className="max-w-1/2 border border-gray-300 rounded-lg h-fit">
                    //                 <tbody>
                    //                     {allocationDetails.map(({ label, key, transform }) => {
                    //                         const value = transform ? transform(selectedVehicle.allocation[key]) : selectedVehicle.allocation[key];
                    //                         return (
                    //                             <tr key={key}>
                    //                                 <th className="py-1 px-2 text-left font-medium">{label}</th>
                    //                                 <td className="py-1 px-2 ">{value}</td>
                    //                             </tr>
                    //                         );
                    //                     })}
                    //                 </tbody>
                    //             </table>
                    //         ) : (
                    //             <div>
                    //                 <div className="py-2 px-4 text-red-400">Vehicle Not Allocated Yet</div>
                    //             </div>
                    //         )}
                    //     </div>
                    //     <div className='flex flex-row-reverse'>
                    //         <button
                    //             className="mb-4 px-4 py-2 bg-blue-500 text-white rounded mr-10"
                    //             onClick={handleBackToTable}
                    //         >
                    //             Back to Table
                    //         </button>
                    //     </div>
                    // </div>
                    <div className="container mx-auto py-8">
                        <CarArtifact data={selectedVehicle} />
                    </div>
                ) : (

                    // <table className="min-w-full bg-white border border-gray-300">
                    //     <thead className="bg-blue-200">
                    //         <tr>
                    //             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">ID</th>
                    //             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Type</th>
                    //             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Make</th>
                    //             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Model</th>
                    //             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Year</th>
                    //             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">License Plate</th>
                    //             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Mileage</th>
                    //             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Status</th>
                    //         </tr>
                    //     </thead>
                    //     <tbody>
                    //         {vehicles.map((vehicle, i) => (
                    //             <tr
                    //                 key={vehicle._id}
                    //                 className="bg-white hover:bg-gray-100 cursor-pointer"
                    //                 onClick={() => handleRowClick(vehicle)}
                    //             >
                    //                 <td className="py-2 px-4 border-b border-gray-300">{i + 1}.</td>
                    //                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.type}</td>
                    //                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.make}</td>
                    //                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.model}</td>
                    //                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.year}</td>
                    //                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.licensePlate}</td>
                    //                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.mileage}</td>
                    //                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.status}</td>
                    //             </tr>
                    //         ))}
                    //     </tbody>
                    // </table>
                    <div className="App">
                        <CarGrid cars={vehicles} setIsDetailView={setIsDetailView} setSelectedVehicle={setSelectedVehicle} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleMoniterComp;
