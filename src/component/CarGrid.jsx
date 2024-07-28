import React from 'react';

const CarCard = ({ car, setSelectedVehicle, setIsDetailView }) => {
    const getProgressColor = (progress) => {
        if (progress > 66) return 'bg-green-500';
        if (progress > 33) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const handleRowClick = (car) => {
        setSelectedVehicle(car);
        setIsDetailView(true);
    };

    return (
        <div className={`bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${car.allocation.isAllocation ? 'border-4 border-green-500 shadow-green-100' : ''}`} onClick={() => handleRowClick(car)}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{`${car.make} ${car.model}`}</h2>
                <span className="text-sm font-medium text-gray-600">{car.licensePlate}</span>
            </div>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Maintenance Progress</span>
                    <span className="text-sm font-medium text-gray-600">{`${car.maintenanceProgress}%`}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${getProgressColor(car.maintenanceProgress)}`}
                        style={{ width: `${car.maintenanceProgress}%` }}
                    ></div>
                </div>
            </div>
            <div className="text-sm text-gray-600">
                <p>Year: {car.year}</p>
                <p>Status: {car.status}</p>
            </div>
        </div>
    );
};

const CarGrid = ({ cars, setIsDetailView, setSelectedVehicle }) => {
    return (
        <div className="bg-blue-50 min-h-screen p-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <CarCard key={car._id} car={car} setIsDetailView={setIsDetailView} setSelectedVehicle={setSelectedVehicle} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarGrid;