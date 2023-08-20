export default abstract class AClientStateFetcher {
    public abstract isFetched(): boolean;
    public abstract isFetchInProcess(): boolean;

    protected abstract internalFetch(): Promise<any>;

    public fetch() {
        if (this.isFetched())
            return;

        if (this.isFetchInProcess())
            return;

        this.internalFetch();
    }
}