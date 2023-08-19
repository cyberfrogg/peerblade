import { useEffect } from "react";
import CurrentSessionFetcher from "@/clientStateFetchers/impls/currentSessionFetcher";
import AuthLayout from "@/layouts/auth/authLayout";
import InputField from "@/components/controls/input/inputField";


export default function Join() {
    useEffect(() => {
        new CurrentSessionFetcher().fetch();
    });

    return (
        <>
            <AuthLayout title={"Join"}>
                <InputField type={"text"} label={"E-mail"}/>
            </AuthLayout>
        </>
    );
}
