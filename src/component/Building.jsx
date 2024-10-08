// import React, { useState, useEffect } from 'react';
// import BuildingMap from './BuildingMap';
// import axios from 'axios';


// const Building = () => {
//     const [buildings, setBuildings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [updated, setUpdated] = useState(false);

//     // Function to geocode addresses
//     async function geocodeAddresses(buildings) {
//         const geocodedBuildings = [];
//         for (const building of buildings) {
//             const address = `${building.address} Indore , India`;
//             try {
//                 const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
//                     params: {
//                         address: address,
//                         key: import.meta.env.VITE_REACT_GOOGLE_API_KEY
//                     }
//                 });
//                 const { results } = data
//                 if (results.length > 0) {
//                     geocodedBuildings.push({
//                         ...building,
//                         lat: parseFloat(results[0].geometry.location.lat),
//                         lng: parseFloat(results[0].geometry.location.lng)
//                     });
//                 } else {
//                     console.warn(`No geocode results for address: ${address}`);
//                 }
//             } catch (err) {
//                 console.error(`Error fetching geocode for address: ${address}`, err);
//             }
//         }
//         console.log(geocodedBuildings)
//         return geocodedBuildings;
//     }

//     // Fetch data from the API
//     useEffect(() => {
//         const fetchBuildings = async () => {
//             try {
//                 const { data } = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/buildings`);
//                 const newBuildingData = await geocodeAddresses(data);
//                 setBuildings(newBuildingData);
//             } catch (error) {
//                 console.error('Error fetching buildings data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBuildings();
//     }, [updated]);

//     if (loading) {
//         return <p className='p-4'>Loading buildings data...</p>;
//     }

//     return (
//         <div className='bg-white'>
//             {buildings.length > 0 ? (
//                 <BuildingMap buildings={buildings} setUpdated={setUpdated} />
//             ) : (
//                 <p>No buildings data available.</p>
//             )}
//         </div>
//     );
// }

// export default Building;   

import React, { useState, useEffect } from 'react';
import BuildingMap from './BuildingMap';
import axios from 'axios';


const Building = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updated, setUpdated] = useState(false);

    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Function to geocode addresses
    // async function geocodeAddresses(buildings) {
    //     const geocodedBuildings = [];
    //     for (const building of buildings) {

    //         const address = `${building.address} Indore , India`;
    //         try {
    //             const { data } = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
    //                 params: {
    //                     key: import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN,
    //                     q: address,
    //                     format: 'json'
    //                 }

    //             });

    //             if (data.length > 0) {
    //                 geocodedBuildings.push({
    //                     ...building,
    //                     lat: parseFloat(data[0].lat),
    //                     lng: parseFloat(data[0].lon)
    //                 });
    //             } else {
    //                 console.warn(`No geocode results for address: ${address}`);
    //             }
    //         } catch (err) {
    //             console.error(`Error fetching geocode for address: ${address}`, err);
    //         }

    //         await delay(1000);
    //     }
    //     console.log(geocodedBuildings)
    //     return geocodedBuildings;
    // }

    // Fetch data from the API
    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                // const { data } = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/buildings`);
                // const newBuildingData = await geocodeAddresses(data);
                // setBuildings(newBuildingData);
                const { data } = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/add-lat-long`);
                setBuildings(data);
            } catch (error) {
                console.error('Error fetching buildings data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuildings();
    }, [updated]);

    // if (loading) {
    //     return <p className='p-4'>Loading buildings data...</p>;
    // }

    if (loading) {
        return <BuildingMap buildings={[]} setUpdated={false} />
    }

    return (
        <div className='bg-white'>
            {buildings.length > 0 ? (
                <BuildingMap buildings={buildings} setUpdated={setUpdated} />
            ) : (
                <p>No buildings data available.</p>
            )}
        </div>
    );
}

export default Building;
