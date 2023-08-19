import {useEffect} from "react";
import CurrentSessionFetcher from "@/clientStateFetchers/impls/currentSessionFetcher";
import AuthLayout from "@/layouts/auth/authLayout";

export default function SignIn() {
    useEffect(() => {
        new CurrentSessionFetcher().fetch();
    });

    return (
        <>
            <AuthLayout title={"Sign in"}>
                Sign in
            </AuthLayout>
        </>
    )
}
