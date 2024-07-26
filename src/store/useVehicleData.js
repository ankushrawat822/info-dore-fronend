import create from 'zustand';
import axios from 'axios';
import API_KEY from '../utils/_helper';

const useVehicleStore = create((set) => ({
    formData: {
        id: '',
        type: '',
        make: '',
        model: '',
        year: '',
        licensePlate: '',
        mileage: '',
        lastMaintenance: '',
        nextMaintenance: '',
        maintenanceProgress: '',
        fuelEfficiency: '',
        status: 'Active',
    },
    setFormData: (name, value) =>
        set((state) => ({
            formData: { ...state.formData, [name]: value },
        })),
    addVehicle: async () => {
        const { formData } = useVehicleStore.getState();
        try {
            const response = await axios.post(`${API_KEY}api/add-vehicles`, formData);
            console.log('Vehicle added:', response.data);
            set({
                formData: {
                    id: '',
                    type: '',
                    make: '',
                    model: '',
                    year: '',
                    licensePlate: '',
                    mileage: '',
                    lastMaintenance: '',
                    nextMaintenance: '',
                    maintenanceProgress: '',
                    fuelEfficiency: '',
                    status: 'Active',
                },
            });
        } catch (error) {
            console.error('Error adding vehicle:', error.response.data);
        }
    },
}));

export default useVehicleStore;