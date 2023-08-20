import {ChangeEvent, ReactElement} from "react";
import classes from "./inputField.module.css";

interface InputFieldProps {
    type: string;
    label?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    value: string;
    isFinalElement?: boolean;
}

export default function InputField(props: InputFieldProps) {
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value);
    }

    const isFinalElement = (): boolean => {
        return props.isFinalElement == true;
    }

    const renderLabel = () => {
        if (props.label == undefined) {
            return (
                <>
                </>
            )
        } else {
            return (
                <label className={classes.inputFieldLabel}>
                    {props.label}
                </label>
            )
        }
    }

    const renderTextInputField = () => {
        const rootClass = isFinalElement() ? (classes.textInputField + " " + classes.resetMarginBottom) : classes.textInputField;

        return (
            <>
                {renderLabel()}
                <div className={rootClass}>
                    <input
                        className={classes.input}
                        onChange={onInputChange}
                        value={props.value}
                        placeholder={props.placeholder}
                    />
                </div>
            </>
        )
    }

    const renderPasswordInputField = () => {
        const rootClass = isFinalElement() ? (classes.textInputField + " " + classes.resetMarginBottom) : classes.textInputField;

        return (
            <>
                {renderLabel()}
                <div className={rootClass}>
                    <input
                        className={classes.input}
                        onChange={onInputChange}
                        value={props.value}
                        placeholder={props.placeholder}
                    />
                </div>
            </>
        )
    }

    let rendered: ReactElement = <>INPUT FIELD TYPE MISS MATCH</>

    switch (props.type) {
        case "text": {
            rendered = renderTextInputField();
            break;
        }
        case "password": {
            rendered = renderPasswordInputField();
            break;
        }
    }

    return rendered;
}
