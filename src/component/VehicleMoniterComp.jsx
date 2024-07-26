// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VehicleMoniterComp = () => {
//     const [vehicles, setVehicles] = useState([]);

//     useEffect(() => {
//         const fetchVehicles = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/vehicles');
//                 setVehicles(response.data);
//             } catch (error) {
//                 console.error('Error fetching vehicle data:', error);
//             }
//         };

//         fetchVehicles();
//     }, []);

//     return (
//         <div className="p-6">
//             <div className="overflow-x-auto rounded-xl">
//                 {console.log(vehicles)}
//                 <table className="min-w-full  border border-gray-300">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">ID</th>
//                             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Type</th>
//                             {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Make</th> */}
//                             {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Model</th> */}
//                             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Year</th>
//                             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Number Plate</th>
//                             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Mileage</th>
//                             {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Last Maintenance</th> */}
//                             {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Next Maintenance</th> */}
//                             {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Maintenance Progress</th> */}
//                             {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Fuel Efficiency</th> */}
//                             <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {vehicles.map((vehicle, i) => (
//                             <tr key={vehicle._id} className="bg-white hover:bg-gray-100">
//                                 <td className="py-2 px-4 border-b border-gray-300">{i + 1}.</td>
//                                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.type}</td>
//                                 {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle.Make}</td> */}
//                                 {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle.Model}</td> */}
//                                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.year}</td>
//                                 <td className="py-2 px-4 border-b border-gray-300">{vehicle['licensePlate']}</td>
//                                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.mileage}</td>
//                                 {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle['Last Maintenance']}</td> */}
//                                 {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle['Next Maintenance']}</td> */}
//                                 {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle['Maintenance Progress']}</td> */}
//                                 {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle['Fuel Efficiency']}</td> */}
//                                 <td className="py-2 px-4 border-b border-gray-300">{vehicle.status}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default VehicleMoniterComp;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleMoniterComp = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null); // State to store the selected vehicle
    const [isDetailView, setIsDetailView] = useState(false); // State to toggle between table and detail view

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/vehicles');
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleRowClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsDetailView(true); // Switch to detail view
    };

    const handleBackToTable = () => {
        setIsDetailView(false); // Switch back to table view
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Formats as MM/DD/YYYY or based on locale
    };

    return (
        <div className="p-6">
            <div className="overflow-x-auto rounded-xl">
                {isDetailView ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
                        <button
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={handleBackToTable}
                        >
                            Back to Table
                        </button>
                        <table className="min-w-full bg-white border border-gray-300">
                            <tbody>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">ID</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.id}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Type</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.type}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Make</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.make}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Model</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.model}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Year</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.year}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">License Plate</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.licensePlate}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Mileage</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.mileage}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Last Maintenance</th>
                                    <td className="py-2 px-4 border-b">{formatDate(selectedVehicle.lastMaintenance)}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Next Maintenance</th>
                                    <td className="py-2 px-4 border-b">{formatDate(selectedVehicle.nextMaintenance)}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Maintenance Progress</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.maintenanceProgress}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Fuel Efficiency</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.fuelEfficiency}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 text-left font-medium border-b">Status</th>
                                    <td className="py-2 px-4 border-b">{selectedVehicle.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">ID</th>
                                <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Type</th>
                                <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Year</th>
                                <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">License Plate</th>
                                <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Mileage</th>
                                <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehicle) => (
                                <tr
                                    key={vehicle._id}
                                    className="bg-white hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleRowClick(vehicle)}
                                >
                                    <td className="py-2 px-4 border-b border-gray-300">{vehicle.id}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{vehicle.type}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{vehicle.year}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{vehicle.licensePlate}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{vehicle.mileage}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{vehicle.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default VehicleMoniterComp;
