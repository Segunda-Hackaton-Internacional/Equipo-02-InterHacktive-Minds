import { MAT_OK, MAT_REQ, MATT_ADD_OK } from "@/actions/materia-prima/materiaPrimaActions";
import { AppDispatcher } from "@/dispatcher/AppDispatcher";
import { Listener, SimpleEventEmitter } from "@/lib/utils/eventEmitter";
import { MateriaPrima } from "@/types/materiaPrimaTypes";

type State = { loading: boolean; materias_primas: MateriaPrima[]; error?: string };
let state: State = { loading: false, materias_primas: [] };

export class MatPrStore {
    private emitter = new SimpleEventEmitter();

    addChangeListener(fn: Listener) { this.emitter.on(fn); }
    removeChangeListener(fn: Listener) { this.emitter.off(fn); }

    getState(): State { return state; }

    handle = (action: any) => {
        switch (action.type) {
            case MAT_REQ:
                state = { ...state, loading: true };
                break;
            case MAT_OK:
                state = { loading: false, materias_primas: action.payload };
                break;
            case MATT_ADD_OK:
                state = { ...state, materias_primas: [...state.materias_primas, action.payload] };
                break;
            
        }
        this.emitter.emit();
    };
}

export const matStore = new MatPrStore();
AppDispatcher.register(matStore.handle.bind(matStore));