import { processStore } from "@/stores/ProcessStore";
import { useSyncExternalStore } from "react";


export const useProcessStore = () =>
    useSyncExternalStore(
        (cb) => {
            processStore.addChangeListener(cb);
            return () => processStore.removeChangeListener(cb);
        },
        () => processStore.getState()

    );