import { addProcess, loadUserProcess, updateProcess } from "@/actions/process/processThunks";

export const useProcessActions = () => ({
    loadUserProcess,
    addProcess,
    updateProcess
});