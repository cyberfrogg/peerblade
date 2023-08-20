import Head from 'next/head';
import React from 'react';
import classes from './authLayout.module.css'
import BodyPageWidther from "@/components/helpers/widthers/bodyPageWidther";
import Header from "@/components/navigation/header/header";

interface AuthLayoutProps {
    title: string,
    children: React.ReactNode
}

export default function AuthLayout(props: AuthLayoutProps) {
    return (
        <div className={classes.authLayout}>
            <Head>
                <title>{props.title + " - " + process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={classes.mainContainer}>
                <Header/>
                <BodyPageWidther>
                    <div className={classes.childContainer}>
                        {props.children}
                    </div>
                </BodyPageWidther>
            </div>
        </div>
    );
}
