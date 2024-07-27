import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";


// Import marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const BuildingMap = ({ buildings }) => {
    const [map, setMap] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [newBuildingAdded, setNewBuildingAdded] = useState(false);
    const [buildingDetails, setBuildingDetails] = useState({
        name: '',
        type: '',
        address: '',
        status: ''
    });


    const [addOnDetails, setAddOnDetails] = useState({
        yearBuilt: 0,
        totalArea: 0,
        lastRenovation: '',
        nextInspection: '',
        maintenanceStatus: 0,
        energyEfficiency: '',
        occupancyRate: 0
    })

    useEffect(() => {
        if (map && buildings.length > 0) {
            const bounds = L.latLngBounds(buildings.map(b => [b.lat, b.lng]));
            map.fitBounds(bounds);
        }
    }, [map, buildings, newBuildingAdded]);

    const handleMarkerClick = (building) => {
        setSelectedBuilding(building);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuildingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSelectChange = (value) => {
        setBuildingDetails(prevDetails => ({
            ...prevDetails,
            status: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/add-buildings`, buildingDetails);
            console.log('Building added successfully:', response.data);
            handleOpen(); // Close the dialog
            setNewBuildingAdded(!newBuildingAdded)
        } catch (error) {
            console.error('Error adding building:', error);
        }
    };

    const handleAddOnSubmit = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/update-buildings`, addOnDetails);
            console.log('Building details updated successfully:', response.data);
            handleAddOnOpen(); // Close the dialog
        } catch (error) {
            console.error('Error adding building:', error);
        }
    }

    // model
    const [openAddDetails, setOpenAddDetails] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const handleOpen = () => setOpenAddDetails(!openAddDetails);

    const [openAddOnDetails, setOpenAddOnDetails] = useState(false);
    const handleAddOnOpen = () => setOpenAddOnDetails(!openAddOnDetails);

    return (
        <div className="h-[600px] flex">
            <MapContainer
                center={[22.7196, 75.8577]} // Indore coordinates
                zoom={13}
                style={{ height: '100%', width: '70%' }}
                whenCreated={setMap}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {buildings.map((building, index) => (
                    <Marker
                        key={index}
                        position={[building.lat, building.lng]}
                        eventHandlers={{
                            click: () => handleMarkerClick(building),
                        }}
                    >
                        <Popup>{building.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
            <div className="w-[30%] p-4 overflow-y-auto">
                {selectedBuilding ? (
                    <div className='h-full flex flex-col justify-between'>
                        <div>
                            <h2 className="text-xl font-bold mb-2 ">{selectedBuilding.name}</h2>
                            <p><strong>Type:</strong> {selectedBuilding.type}</p>
                            <p><strong>Address:</strong> {selectedBuilding.address}</p>
                            <p><strong>Status:</strong> {selectedBuilding.status}</p>
                            {
                                seeMore && <div>
                                    <p><strong>Year Built:</strong> {selectedBuilding.yearBuilt}</p>
                                    <p><strong>Total Area:</strong> {selectedBuilding.totalArea} sq ft</p>
                                    <p><strong>Last Renovation:</strong> {new Date(selectedBuilding.lastRenovation).toLocaleDateString()}</p>
                                    <p><strong>Next Inspection:</strong> {new Date(selectedBuilding.nextInspection).toLocaleDateString()}</p>
                                    <p><strong>Maintenance Status:</strong> {selectedBuilding.maintenanceStatus}%</p>
                                    <p><strong>Energy Efficiency:</strong> {selectedBuilding.energyEfficiency}</p>
                                    <p><strong>Occupancy Rate:</strong> {selectedBuilding.occupancyRate}%</p>
                                </div>
                            }

                            {
                                selectedBuilding.yearBuilt
                                    ? <div className='bg-blue-500 text-gray-100 rounded-md px-4 py-2 cursor-pointer w-fit mt-4' onClick={() => setSeeMore(!seeMore)}
                                    >{seeMore ? 'See Less' : 'See More'}</div>
                                    : <div className='bg-blue-500 text-gray-100 rounded-md px-4 py-2 cursor-pointer w-fit mt-4' onClick={handleAddOnOpen}
                                    >Add On Details</div>
                            }
                        </div>
                        <div className='bg-blue-500 text-gray-100 rounded-md px-4 py-2 cursor-pointer w-fit'
                            onClick={handleOpen}
                        >Add Building</div>
                    </div>
                ) : (
                    <div className='h-full flex flex-col justify-between'>
                        <p>Select a building to view details</p>
                        <div className='bg-blue-500 text-gray-100 rounded-md px-4 py-2 cursor-pointer w-fit'
                            onClick={handleOpen}
                        >Add Building</div>
                    </div>
                )}
            </div>


            {/* ADD Detail button */}
            <Dialog open={openAddDetails} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            Add Building Details
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
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
                            label="Name"
                            name="name"
                            value={buildingDetails.name}
                            onChange={handleInputChange}
                            required

                        />
                        <Input
                            label="Type"
                            name="type"
                            value={buildingDetails.type}
                            onChange={handleInputChange}
                            required

                        />
                        <Input
                            label="Address"
                            name="address"
                            value={buildingDetails.address}
                            onChange={handleInputChange}
                            required

                        />
                        <Select
                            label="Status"
                            value={buildingDetails.status}
                            onChange={handleSelectChange}
                            required

                        >
                            <Option value="Operational">Operational</Option>
                            <Option value="Renovation Needed">Renovation Needed</Option>
                            <Option value="Under Renovation">Under Renovation</Option>
                            <Option value="Seasonal Closure">Seasonal Closure</Option>
                            <Option value="Decommissioned">Decommissioned</Option>
                        </Select>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleSubmit}>
                        Add Building
                    </Button>
                </DialogFooter>
            </Dialog>


            {/* ADD on Detail button */}
            <Dialog open={openAddOnDetails} size="xs" handler={handleAddOnOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            Add Building Details
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
                        onClick={handleAddOnOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody className="max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4"> {/* Adds consistent spacing between inputs */}
                        <Input
                            label="Year Built"
                            name="yearBuilt"
                            type="number"
                            value={addOnDetails.yearBuilt}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            label="Total Area (sq ft)"
                            name="totalArea"
                            type="number"
                            value={addOnDetails.totalArea}
                            onChange={handleInputChange}
                            required

                        />
                        <Input
                            label="Last Renovation"
                            name="lastRenovation"
                            type="date"
                            value={addOnDetails.lastRenovation}
                            onChange={handleInputChange}
                            required

                        />
                        <Input
                            label="Next Inspection"
                            name="nextInspection"
                            type="date"
                            value={addOnDetails.nextInspection}
                            onChange={handleInputChange}
                            required

                        />
                        <Input
                            label="Maintenance Status (%)"
                            name="maintenanceStatus"
                            type="number"
                            value={addOnDetails.maintenanceStatus}
                            onChange={handleInputChange}
                            required

                        />
                        <Input
                            label="Energy Efficiency"
                            name="energyEfficiency"
                            value={addOnDetails.energyEfficiency}
                            onChange={handleInputChange}
                            required

                        />
                        <Input
                            label="Occupancy Rate (%)"
                            name="occupancyRate"
                            type="number"
                            value={addOnDetails.occupancyRate}
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleAddOnOpen}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleAddOnSubmit}>
                        Add Building Details
                    </Button>
                </DialogFooter>
            </Dialog>


        </div >
    );
};

export default BuildingMap;