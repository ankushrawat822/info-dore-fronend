import React from 'react';

const CarIcon = () => (
    <svg className="w-6 h-6 fill-current text-gray-700" viewBox="0 0 24 24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
);

const WrenchIcon = () => (
    <svg className="w-6 h-6 fill-current text-gray-700" viewBox="0 0 24 24">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-6 h-6 fill-current text-gray-700" viewBox="0 0 24 24">
        <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
        <path d="M9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
    </svg>
);

const FuelIcon = () => (
    <svg className="w-6 h-6 fill-current text-gray-700" viewBox="0 0 24 24">
        <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats as MM/DD/YYYY or based on locale
};


const CarArtifact = ({ data }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-blue-100 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-105">
                    <div className="flex items-center mb-2">
                        <CarIcon />
                        <h2 className="text-xl font-bold ml-2">{`${data.make} ${data.model} ${data.year}`}</h2>
                    </div>
                    <p>License Plate: {data.licensePlate}</p>
                    <p>Mileage: {data.mileage}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-105">
                    <div className="flex items-center mb-2">
                        <WrenchIcon />
                        <h3 className="text-lg font-semibold ml-2">Maintenance</h3>
                    </div>
                    <p>Last: {formatDate(data.lastMaintenance)}</p>
                    <p>Next: {formatDate(data.nextMaintenance)}</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: `${data.maintenanceProgress}%` }}
                            title={`Maintenance Progress: ${data.maintenanceProgress}%`}
                        ></div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-105">
                    <div className="flex items-center mb-2">
                        <FuelIcon />
                        <h3 className="text-lg font-semibold ml-2">Status</h3>
                    </div>
                    <p>Fuel Efficiency: {data.fuelEfficiency}</p>
                    <p className="font-bold text-green-600">{data.status}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-105">
                    <div className="flex items-center mb-2">
                        <CalendarIcon />
                        <h3 className="text-lg font-semibold ml-2">Allocation</h3>
                    </div>
                    {
                        data.allocation.isAllocation ?
                            <div>
                                <p>Project: {data.allocation.project}</p>
                                <p>Allocated to: {data.allocation.allocatedTo}</p>
                                <p>{formatDate(data.allocation.start)} - {formatDate(data.allocation.end)}</p>
                            </div>
                            : <div>Not Allocated</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CarArtifact;