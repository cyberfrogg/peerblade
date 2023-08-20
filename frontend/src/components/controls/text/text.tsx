import React, { Component } from "react";
import classes from "./text.module.css";

interface TextProps {
    isCentered?: boolean;
    isFinalElement?: boolean;
    children: React.ReactNode;
}
interface TextState {

}

export default class TextControl extends Component<TextProps, TextState> {
    render = () => {
        let textClassName = classes.text;
        if (this.isFinalElement()) {
            textClassName += " " + classes.resetMarginBottom;
        }
        if (this.isCentered()) {
            textClassName += " " + classes.centered;
        }

        return (
            <p className={textClassName}>
                {this.props.children}
            </p>
        )
    }

    isFinalElement = (): boolean => {
        return this.props.isFinalElement == true;
    }

    isCentered = (): boolean => {
        return this.props.isCentered == true;
    }
}