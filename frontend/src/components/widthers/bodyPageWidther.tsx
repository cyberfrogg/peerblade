import {Component, ReactNode} from "react";
import classes from './widther.module.css'


interface BodyPageWidtherProps {
    children: ReactNode
}
interface BodyPageWidtherState {

}

export default class BodyPageWidther extends Component<BodyPageWidtherProps, BodyPageWidtherState> {
    render = () => {
        return(
            <div className={classes.bodyPageWidther} >
                {this.props.children}
            </div>
        )
    }
}
