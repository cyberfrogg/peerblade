import AClientStateFetcher from "@/clientStateFetchers/AClientStateFetcher";
import { store } from "@/store";
import { setIsFetchInProcess, setIsFetched } from "@/slices/auth/currentSessionSlice";

export default class CurrentSessionFetcher extends AClientStateFetcher {
    public isFetchInProcess(): boolean {
        return store.getState().currentSession.isFetchInProcess;
    }
    public isFetched = (): boolean => {
        return store.getState().currentSession.isFetched;
    }

    protected internalFetch = async (): Promise<any> => {
        store.dispatch(setIsFetchInProcess(true));



        store.dispatch(setIsFetched(true));
        return Promise.resolve(undefined);
    }
}