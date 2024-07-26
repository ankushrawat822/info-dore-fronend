import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleMoniterComp = () => {
    const [vehicles, setVehicles] = useState([]);

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

    return (
        <div className="p-6">
            <div className="overflow-x-auto rounded-xl">
                {console.log(vehicles)}
                <table className="min-w-full  border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">ID</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Type</th>
                            {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Make</th> */}
                            {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Model</th> */}
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Year</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Number Plate</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Mileage</th>
                            {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Last Maintenance</th> */}
                            {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Next Maintenance</th> */}
                            {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Maintenance Progress</th> */}
                            {/* <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Fuel Efficiency</th> */}
                            <th className="py-2 px-4 text-left text-gray-600 font-medium border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle._id} className="bg-white hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.id}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.type}</td>
                                {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle.Make}</td> */}
                                {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle.Model}</td> */}
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.year}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle['licensePlate']}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.mileage}</td>
                                {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle['Last Maintenance']}</td> */}
                                {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle['Next Maintenance']}</td> */}
                                {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle['Maintenance Progress']}</td> */}
                                {/* <td className="py-2 px-4 border-b border-gray-300">{vehicle['Fuel Efficiency']}</td> */}
                                <td className="py-2 px-4 border-b border-gray-300">{vehicle.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehicleMoniterComp;
