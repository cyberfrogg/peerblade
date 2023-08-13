import Head from 'next/head';
import React, {Component, ReactNode} from 'react';
import classes from './homeLayout.module.css'
import BodyPageWidther from "@/components/widthers/bodyPageWidther";
import Header from "@/components/navigation/header/header";
import BodyPageGrid from "@/components/grids/bodyPageGrid";

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
                            {this.props.children}
                        </BodyPageGrid>
                    </BodyPageWidther>
                </div>
            </div>
        );
    }
}
