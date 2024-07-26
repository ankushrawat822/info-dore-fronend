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