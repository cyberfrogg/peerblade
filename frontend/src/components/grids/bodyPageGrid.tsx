import {Component, ReactNode} from "react";
import classes from './grids.module.css'


interface BodyPageGridProps {
    children: ReactNode
}
interface BodyPageGridState {

}

export default class BodyPageGrid extends Component<BodyPageGridProps, BodyPageGridState> {
    render = () => {
        return(
            <div className={classes.bodyPageGrid} >
                {this.props.children}
            </div>
        )
    }
}
