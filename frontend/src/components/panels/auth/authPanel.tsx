import React from "react";
import classes from "./authPanel.module.css";

interface AuthPanelProps {
    children: React.ReactNode
}

export default function AuthPanel(props: AuthPanelProps) {
    return (
        <section className={classes.authPanel}>
            {props.children}
        </section>
    )
}
