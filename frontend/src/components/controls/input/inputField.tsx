import { ChangeEvent, Component } from "react";
import classes from "./inputField.module.css";

interface InputFieldProps {
    type: string;
    label?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    value: string;
    isFinalElement?: boolean;
}
interface InputFieldState {

}

export default class InputField extends Component<InputFieldProps, InputFieldState> {
    onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value);
    }

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
        const rootClass = this.isFinalElement() ? (classes.textInputField + " " +  classes.resetMarginBottom) : classes.textInputField;

        return (
            <>
                {this.renderLabel()}
                <div className={rootClass}>
                    <input
                        className={classes.input}
                        onChange={this.onInputChange}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                    />
                </div>
            </>
        )
    }

    renderPasswordInputField = () => {
        const rootClass = this.isFinalElement() ? (classes.textInputField + " " +  classes.resetMarginBottom) : classes.textInputField;

        return (
            <>
                {this.renderLabel()}
                <div className={rootClass}>
                    <input
                        className={classes.input}
                        onChange={this.onInputChange}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                    />
                </div>
            </>
        )
    }

    renderLabel = () => {
        if (this.props.label == undefined) {
            return (
                <>
                </>
            )
        } else {
            return (
                <label className={classes.inputFieldLabel}>
                    {this.props.label}
                </label>
            )
        }
    }

    isFinalElement = (): boolean => {
        return this.props.isFinalElement == true;
    }
}
