import {Component} from "react";


interface SpacerProps {
    height: number;
}
interface SpacerState {

}

export default class Spacer extends Component<SpacerProps, SpacerState> {
    render = () => {
        return(
            <div style={{height: this.props.height + "px"}}>

            </div>
        )
    }
}
