import Head from 'next/head';
import React, {Component} from 'react';
import classes from './homeLayout.module.css'
import BodyPageWidther from "@/components/helpers/widthers/bodyPageWidther";
import Header from "@/components/navigation/header/header";
import BodyPageGrid from "@/components/grids/bodyPageGrid";
import NavigationSideBar from "@/components/navigation/navigationSideBar/navigationSideBar";

interface HomePageLayoutProps {
    title: string,
    children: React.ReactNode
}
interface HomePageLayoutState {

}

export default class HomeLayout extends Component<HomePageLayoutProps, HomePageLayoutState> {
    render = () => {
        return (
            <div className={classes.homeLayout}>
                <Head>
                    <title>{this.props.title + " - " + process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className={classes.mainContainer}>
                    <Header/>
                    <BodyPageWidther>
                        <BodyPageGrid>
                            <NavigationSideBar/>
                            <div className={classes.childContainer}>
                                {this.props.children}
                            </div>
                        </BodyPageGrid>
                    </BodyPageWidther>
                </div>
            </div>
        );
    }
}
