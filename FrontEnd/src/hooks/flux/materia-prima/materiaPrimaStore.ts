import { matStore } from "@/stores/MatPrStore";
import { useSyncExternalStore } from "react";

export const useMatPrStore = () =>
    useSyncExternalStore(
        (cb) => {
            matStore.addChangeListener(cb);
            return () => matStore.removeChangeListener(cb);
        },
        () => matStore.getState()

    );