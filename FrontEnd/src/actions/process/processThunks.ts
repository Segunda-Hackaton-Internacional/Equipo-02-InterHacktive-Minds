import { AppDispatcher } from "@/dispatcher/AppDispatcher";
import { axiosApi } from "@/lib/api";
import { Process } from "@/types/processType";
import { processAddOk, processErr, processOk, processReq, processUpdateOk } from "./processActions";

const unwrap = (r: any): Process[] => 
    Array.isArray(r.processes) ? r.processes : r;

export const loadUserProcess = async () => {
    AppDispatcher.dispatch(processReq());
    try {
        const { data } = await axiosApi.get<{processes: Process[] }>('/process/user');
        console.log('on loadUserProcess', data);
        AppDispatcher.dispatch(processOk(unwrap(data)));
    } catch (e) {
        AppDispatcher.dispatch(processErr((e as Error).message));
    }
};

export const addProcess = async (payload: Omit<Process, 'id' | 'totalAmount' | 'userId'>) => {
    const { data } = await axiosApi.post<Process>('/process', payload);
    AppDispatcher.dispatch(processAddOk(data));
};

export const updateProcess = async (id: string, partial: Partial<Process>) => {
    const { data } = await axiosApi.patch<Process>(`/process/${id}`, partial);
    AppDispatcher.dispatch(processUpdateOk(data));
};