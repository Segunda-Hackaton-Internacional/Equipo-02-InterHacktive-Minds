import { addProcess, loadUserProcess } from "@/actions/process/processThunks";

export const useProductActions = () => ({
    loadUserProcess,
    addProcess
});