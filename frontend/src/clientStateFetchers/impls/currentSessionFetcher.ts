import AClientStateFetcher from "@/clientStateFetchers/AClientStateFetcher";
import { store } from "@/store";
import { setIsFetchInProcess, setIsFetched } from "@/slices/auth/currentSessionSlice";
import getCurrentSessionCookieToken from "@/utils/auth/getCurrentSessionCookieToken";
import sleep from "@/utils/sleep";

export default class CurrentSessionFetcher extends AClientStateFetcher {
    public isFetchInProcess(): boolean {
        return store.getState().currentSession.isFetchInProcess;
    }
    public isFetched = (): boolean => {
        return store.getState().currentSession.isFetched;
    }

    protected internalFetch = async (): Promise<any> => {
        store.dispatch(setIsFetchInProcess(true));

        let cookieSessionData = getCurrentSessionCookieToken();
        await sleep(1000);

        if (cookieSessionData == undefined) {
            console.log("CookieSessionData not found. Setting up guest.");
            store.dispatch(setIsFetchInProcess(false));
            store.dispatch(setIsFetched(true));
            return;
        }

        store.dispatch(setIsFetchInProcess(false));
        store.dispatch(setIsFetched(true));
        return Promise.resolve(undefined);
    }
}