import React, {Component} from "react";
import classes from "./button.module.css";

interface ButtonProps {
    onClick: () => void;
    isFinalElement?: boolean;
    children: React.ReactNode;
}
interface ButtonState {

}

export default class Button extends Component<ButtonProps, ButtonState> {
    render = () => {
        let buttonClassName = classes.button;
        if(this.isFinalElement()){
            buttonClassName += " " + classes.resetMarginBottom;
        }

        return(
            <button className={buttonClassName}>
                {this.props.children}
            </button>
        )
    }

    isFinalElement = (): boolean => {
        return this.props.isFinalElement == true;
    }
}
