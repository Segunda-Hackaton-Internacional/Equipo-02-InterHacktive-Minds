import { Process } from "@/types/processType";


export const PROCESS_REQ = 'PROD_REQ' as const;
export const PROCESS_OK = 'PROD_OK' as const;
export const PROCESS_ERR = 'PROD_ERR' as const;

export const PROCESS_ADD_OK = 'PROD_ADD_OK' as const;


export const processReq = () => ({ type: PROCESS_REQ });
export const processOk = (list: Process[]) => ({ type: PROCESS_OK, payload: list });
export const processErr = (e: string) => ({ type: PROCESS_ERR, error: e });

export const productAddOk = (p: Process) => ({ type: PROCESS_ADD_OK, payload: p });

