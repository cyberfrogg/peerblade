import classes from './currentUserBanner.module.css'
import Link from "next/link";
import { WEBSITE_PAGE_EDIT_PROFILE_URL, WEBSITE_PAGE_JOIN, WEBSITE_PAGE_SIGN_IN } from "@/utils/constants";
import { RootState, store } from "@/store";
import { useSelector } from "react-redux";


interface CurrentUserBannerProps {

}

export default function CurrentUserBanner(props: CurrentUserBannerProps) {
    return (
        <section className={classes.currentUserBanner}>
            {RenderBody()}
        </section>
    )
}

const RenderBody = () => {
    const isFetched = useSelector((state: RootState) => state.currentSession.isFetched);
    const isFetchInProcess = useSelector((state: RootState) => state.currentSession.isFetchInProcess);
    const isAuthorized = useSelector((state: RootState) => state.currentSession.isAuthorized);


    if (isFetchInProcess || !isFetched) {
        return RenderLoading();
    }
    else {
        if (isAuthorized) {
            return RenderAuthorized();
        } else {
            return RenderAnonymous();
        }
    }
}

const RenderLoading = () => {
    return (
        <>
            Loading....
        </>
    )
}

const RenderAnonymous = () => {
    return (
        <div className={classes.anonymousWelcome}>
            <Link href={WEBSITE_PAGE_JOIN} className={classes.button} >Join</Link>
            <Link href={WEBSITE_PAGE_SIGN_IN} className={classes.button} >Sign in</Link>
        </div>
    )
}

const RenderAuthorized = () => {
    return (
        <div className={classes.authorizedInfo}>
            <div className={classes.avatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={""} alt={""} />
            </div>
            <div className={classes.textInfo}>
                <Link className={classes.name} href={""}>someuser</Link>
                <Link className={classes.editProfile} href={WEBSITE_PAGE_EDIT_PROFILE_URL}>Edit profile</Link>
            </div>
        </div>
    )
}