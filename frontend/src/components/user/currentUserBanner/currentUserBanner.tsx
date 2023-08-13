import {Component} from "react";
import classes from './currentUserBanner.module.css'
import Link from "next/link";
import {WEBSITE_PAGE_EDIT_PROFILE_URL} from "@/utils/constants";


interface CurrentUserBannerProps {

}
interface CurrentUserBannerState {

}

export default class CurrentUserBanner extends Component<CurrentUserBannerProps, CurrentUserBannerState> {
    render = () => {
        return(
            <section className={classes.currentUserBanner}>
                <div className={classes.avatar}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={""} alt={""} />
                </div>
                <div className={classes.textInfo}>
                    <Link className={classes.name} href={""}>someuser</Link>
                    <Link className={classes.editProfile} href={WEBSITE_PAGE_EDIT_PROFILE_URL}>Edit profile</Link>
                </div>
            </section>
        )
    }
}
