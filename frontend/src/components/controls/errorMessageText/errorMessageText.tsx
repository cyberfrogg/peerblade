import React, { Component } from "react";
import classes from "./errorMessageText.module.css";

interface ErrorMessageTextProps {
    isCentered?: boolean;
    hasError: boolean;
    isFinalElement?: boolean;
    children: React.ReactNode;
}
interface ErrorMessageTextState {

}

export default class ErrorMessageText extends Component<ErrorMessageTextProps, ErrorMessageTextState> {
    render = () => {
        let textClassName = classes.errorMessageText;
        if (this.isFinalElement()) {
            textClassName += " " + classes.resetMarginBottom;
        }
        if(!this.hasError()){
            textClassName += " " + classes.hidden;
        }

        return (
            <p className={textClassName}>
                {this.props.children}
            </p>
        )
    }

    hasError = (): boolean => {
        return this.props.hasError;
    }

    isFinalElement = (): boolean => {
        return this.props.isFinalElement == true;
    }
}