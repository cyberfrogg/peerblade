import { useEffect } from "react";
import CurrentSessionFetcher from "@/clientStateFetchers/impls/currentSessionFetcher";
import AuthLayout from "@/layouts/auth/authLayout";
import InputField from "@/components/controls/input/inputField";
import AuthPanel from "@/components/panels/auth/authPanel";
import Title from "@/components/controls/title/title";
import Button from "@/components/controls/button/button";
import TextControl from "@/components/controls/text/text";
import Link from "next/link";
import { WEBSITE_PAGE_PRIVACY_POLICY, WEBSITE_PAGE_TERMS_OF_USE } from "@/utils/constants";
import ErrorMessageText from "@/components/controls/errorMessageText/errorMessageText";


export default function Join() {
    useEffect(() => {
        new CurrentSessionFetcher().fetch();
    });

    return (
        <>
            <AuthLayout title={"Join"}>
                <AuthPanel>
                    <Title weight={1} isCentered={true}>Join an Open-Source community!</Title>
                    <TextControl isCentered={true}>
                        Control your feed. Self-hosted. Community driven project.
                    </TextControl>
                    <InputField
                        type={"text"}
                        label={"Username:"}
                        onChange={onUsernameInputFieldChange}
                        value={""}
                        placeholder={"@username"}
                    />
                    <InputField
                        type={"text"}
                        label={"E-mail:"}
                        onChange={onEmailInputFieldChange}
                        value={""}
                        placeholder={"user@email.com"}
                    />
                    <InputField
                        type={"password"}
                        label={"Password:"}
                        onChange={onPasswordInputFieldChange}
                        value={""}
                        placeholder={"**********"}
                    />
                    <Button
                        onClick={onSubmitPress}
                    >
                        Submit
                    </Button>
                    <ErrorMessageText
                        hasError={true}
                    >
                        Error message sample
                    </ErrorMessageText>
                    <TextControl isFinalElement={true}>
                        By creating account on this website, you are agree with <Link href={WEBSITE_PAGE_TERMS_OF_USE}>Terms of Use </Link> and <Link href={WEBSITE_PAGE_PRIVACY_POLICY}>Privacy Policy</Link>
                    </TextControl>
                </AuthPanel>
            </AuthLayout>
        </>
    );
}

const onUsernameInputFieldChange = (value: string) => {

}
const onEmailInputFieldChange = (value: string) => {

}
const onPasswordInputFieldChange = (value: string) => {

}
const onSubmitPress = () => {
    console.log("Click")
}
