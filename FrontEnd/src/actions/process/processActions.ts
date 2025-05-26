import { Process } from "@/types/processType";


export const PROCESS_REQ = 'PROD_REQ' as const;
export const PROCESS_OK = 'PROD_OK' as const;
export const PROCESS_ERR = 'PROD_ERR' as const;

export const PROCESS_ADD_OK = 'PROD_ADD_OK' as const;
export const PROCESS_UPD_OK = 'PROD_UPD_OK' as const;
export const PROCESS_DEL_OK = 'PROD_DEL_OK' as const;


export const processReq = () => ({ type: PROCESS_REQ });
export const processOk = (list: Process[]) => ({ type: PROCESS_OK, payload: list });
export const processErr = (e: string) => ({ type: PROCESS_ERR, error: e });

export const processAddOk = (p: Process) => ({ type: PROCESS_ADD_OK, payload: p });
export const processUpdateOk = (p: Process) => ({ type: PROCESS_UPD_OK, payload: p });
export const processDelOk = (id: string) => ({ type: PROCESS_DEL_OK, payload: id });

