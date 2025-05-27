import { AppDispatcher } from "@/dispatcher/AppDispatcher";
import { axiosApi } from "@/lib/api";
import { MateriaPrima } from "@/types/materiaPrimaTypes";
import { matPrAddOk, matPrErr, matPrOk, matPrReq } from "./materiaPrimaActions";

const unwrap = (r: any): MateriaPrima[] =>
    Array.isArray(r.products) ? r.products : r;

/* ---------- thunks ---------- */

export const loadAllMatPr = async () => {
    AppDispatcher.dispatch(matPrReq());
    try {
        const { data } = await axiosApi.get<{ materias_primas: MateriaPrima[] }>('/materia-prima');
        console.log(data);
        AppDispatcher.dispatch(matPrOk(unwrap(data)));
    } catch (e) {
        AppDispatcher.dispatch(matPrErr((e as Error).message));
    }
};

export const addMatPr = async (payload: Omit<MateriaPrima, 'id' | 'proveedorId'>) => {
    const { data } = await axiosApi.post<MateriaPrima>('/materia-prima', payload);
    AppDispatcher.dispatch(matPrAddOk(data));
    return data;
};

