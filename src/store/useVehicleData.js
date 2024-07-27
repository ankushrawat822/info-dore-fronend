import create from 'zustand';
import axios from 'axios';

const useVehicleStore = create((set) => ({
    formData: {
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
        allocation: {
            isAllocation: false,
            project: '',
            start: '',
            end: '',
            user: ''
        }
    },
    setFormData: (name, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [name]: value,
                allocation: {
                    ...state.formData.allocation,
                    ...(name === 'isAllocation' || name === 'project' || name === 'start' || name === 'end' || name === 'user' ? { [name]: value } : {})
                }
            },
        })),
    addVehicle: async () => {
        const { formData } = useVehicleStore.getState();
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/add-vehicles`, formData);
            console.log('Vehicle added:', response.data);
            set({
                formData: {
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
                    allocation: {
                        isAllocation: false,
                        project: '',
                        start: '',
                        end: '',
                        user: ''
                    },
                },
            });
        } catch (error) {
            console.error('Error adding vehicle:', error.response.data);
        }
    },
}));

export default useVehicleStore;