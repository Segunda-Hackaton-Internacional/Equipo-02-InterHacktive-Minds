import { addProcess, loadUserProcess } from "@/actions/process/processThunks";

export const useProcessActions = () => ({
    loadUserProcess,
    addProcess
});