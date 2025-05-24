import { PROCESS_ADD_OK, PROCESS_OK, PROCESS_REQ } from '@/actions/process/processActions';
import { AppDispatcher } from '@/dispatcher/AppDispatcher';

import { Listener, SimpleEventEmitter } from '@/lib/utils/eventEmitter';
import { Process } from '@/types/processType';

type State = { loading: boolean; processes: Process[]; error?: string };
let state: State = { loading: false, processes: [] };

export class ProcessStore {
    private emitter = new SimpleEventEmitter();

    addChangeListener(fn: Listener) { this.emitter.on(fn); }
    removeChangeListener(fn: Listener) { this.emitter.off(fn); }

    getState(): State { return state; }

    handle = (action: any) => {
        switch (action.type) {
            case PROCESS_REQ:
                state = { ...state, loading: true };
                break;
            case PROCESS_OK:
                state = { loading: false, processes: action.payload };
                break;
            case PROCESS_ADD_OK:
                state = { ...state, processes: [...state.processes, action.payload] };
                break;
            
        }
        this.emitter.emit();
    };
}

export const processStore = new ProcessStore();
AppDispatcher.register(processStore.handle.bind(processStore));