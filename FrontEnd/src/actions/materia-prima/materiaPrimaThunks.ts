import { AppDispatcher } from "@/dispatcher/AppDispatcher";
import { axiosApi } from "@/lib/api";
import { MateriaPrima } from "@/types/materiaPrimaTypes";
import axios from "axios";
import { matPrAddOk, matPrErr, matPrOk, matPrReq } from "./materiaPrimaActions";



/* ---------- thunks ---------- */

export const loadAllMatPr = async () => {
    AppDispatcher.dispatch(matPrReq());
    try {
        const { data } = await axios.get('/materia-prima');
        console.log(data);
        AppDispatcher.dispatch(matPrOk(data));
    } catch (e) {
        AppDispatcher.dispatch(matPrErr((e as Error).message));
    }
};

export const addMatPr = async (payload: Omit<MateriaPrima, 'id' | 'userId'>) => {
    const { data } = await axiosApi.post<MateriaPrima>('/materia-prima', payload);
    AppDispatcher.dispatch(matPrAddOk(data));
    return data;
};

