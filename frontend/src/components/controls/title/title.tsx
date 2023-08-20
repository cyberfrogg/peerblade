import React from "react";
import classes from "./title.module.css";

interface TitleProps {
    weight: number;
    isCentered?: boolean;
    children: React.ReactNode;
}

export default function Title(props: TitleProps) {
    switch (props.weight) {
        case 1: {
            return H1Title(props);
        }
        case 2: {
            return H2Title(props);
        }
        case 3: {
            return H3Title(props);
        }
        case 4: {
            return H4Title(props);
        }
    }
}

const H1Title = (props: TitleProps) => {
    return <h1 className={classes.h1 + GetAdditionalClasses(props)}>{props.children}</h1>
}
const H2Title = (props: TitleProps) => {
    return <h2 className={classes.h2 + GetAdditionalClasses(props)}>{props.children}</h2>
}
const H3Title = (props: TitleProps) => {
    return <h3 className={classes.h3 + GetAdditionalClasses(props)}>{props.children}</h3>
}
const H4Title = (props: TitleProps) => {
    return <h4 className={classes.h4 + GetAdditionalClasses(props)}>{props.children}</h4>
}

const GetAdditionalClasses = (props: TitleProps): string => {
    let result = " ";

    if (props.isCentered == true) {
        result += classes.centered + " ";
    }

    return result;
}