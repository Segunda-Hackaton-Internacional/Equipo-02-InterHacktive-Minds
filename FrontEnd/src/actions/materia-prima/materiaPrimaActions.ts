import { MateriaPrima } from "@/types/materiaPrimaTypes";


export const MAT_REQ = 'MAT_REQ' as const;
export const MAT_OK = 'MAT_OK' as const;
export const MAT_ERR = 'MAT_ERR' as const;

export const MATT_ADD_OK = 'MATT_ADD_OK' as const;
export const MATT_UPD_OK = 'MATT_UPD_OK' as const;

export const matPrReq = () => ({ type: MAT_REQ });
export const matPrOk = (list: MateriaPrima[]) => ({ type: MAT_OK, payload: list });
export const matPrErr = (e: string) => ({ type: MAT_ERR, error: e });

export const matPrAddOk = (p: MateriaPrima) => ({ type: MATT_ADD_OK, payload: p });
export const matPrUpdateOk = (p: MateriaPrima) => ({ type: MATT_UPD_OK, payload: p });