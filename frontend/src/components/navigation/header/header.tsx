import {Component, ReactNode} from "react";
import classes from './header.module.css'
import BodyPageWidther from "@/components/widthers/bodyPageWidther";
import BodyPageGrid from "@/components/grids/bodyPageGrid";


interface HeaderProps {

}
interface HeaderState {

}

export default class Header extends Component<HeaderProps, HeaderState> {
    render = () => {
        return(
            <>
                <header className={classes.header}>
                    <BodyPageWidther>
                        <BodyPageGrid>

                        </BodyPageGrid>
                    </BodyPageWidther>
                </header>
                <div className={classes.offset}>

                </div>
            </>
        )
    }
}
