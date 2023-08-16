import { Component } from "react";
import classes from './navigationSideBar.module.css'
import CurrentUserBanner from "@/components/user/currentUserBanner/currentUserBanner";
import Spacer from "@/components/helpers/spacer/spacer";
import Link from "next/link";
import { WEBSITE_PAGE_TAGS_URL, WEBSITE_URL } from "@/utils/constants";


interface NavigationSideBarProps {

}
interface NavigationSideBarState {

}

export default class NavigationSideBar extends Component<NavigationSideBarProps, NavigationSideBarState> {
    render = () => {
        return (
            <nav className={classes.navigationSideBar}>
                <Spacer height={20} />
                <CurrentUserBanner />
                <Spacer height={10} />
                {this.renderPages()}
            </nav>
        )
    }

    renderPages = () => {
        return (
            <div className={classes.pagesList}>
                <Link className={classes.link} href={WEBSITE_URL}>
                    <p>Home</p>
                </Link>
                <Link className={classes.link} href={WEBSITE_PAGE_TAGS_URL}>

                    <p>Tags</p>
                </Link>
            </div>
        )
    }
}
