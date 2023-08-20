import HomeLayout from "@/layouts/home/homeLayout";
import {useEffect} from "react";
import CurrentSessionFetcher from "@/clientStateFetchers/impls/currentSessionFetcher";

export default function Home() {
    useEffect(() => {
        new CurrentSessionFetcher().fetch();
    });

    return (
        <>
            <HomeLayout title={"Feed"}>
                Testas
            </HomeLayout>
        </>
    )
}
