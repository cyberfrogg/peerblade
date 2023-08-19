import { Component } from "react";
import classes from "./inputField.module.css";

interface InputFieldProps {
    type: string;
    label?: string;
}
interface InputFieldState {

}

export default class InputField extends Component<InputFieldProps, InputFieldState> {
    render = () => {
        switch (this.props.type) {
            case "text": {
                return this.renderTextInputField();
            }
            case "password": {
                return this.renderPasswordInputField();
            }
        }
    }

    renderTextInputField = () => {
        return (
            <>
                {this.renderLabel()}
                <div className={classes.textInputField}>
                    <div className={classes.inputContainer}>
                        <input className={classes.input}/>
                    </div>
                </div>
            </>
        )
    }

    renderPasswordInputField = () => {
        return (
            <>
                {this.renderLabel()}
                <div className={classes.passwordInputField}>
                    <div className={classes.inputContainer}>
                        <input className={classes.input}/>
                    </div>
                </div>
            </>
        )
    }

    renderLabel = () => {
        if(this.props.label == undefined){
            return(
                <>
                </>
            )
        }else{
            return(
                <label className={classes.inputFieldLabel}>
                    {this.props.label}
                </label>
            )
        }
    }
}
