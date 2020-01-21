import React from "react";
import OriginalSpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import CloseIcon from "@material-ui/icons/Close";

const SpeedDial: any = OriginalSpeedDial;

const styles = {
    speedDial: {
        position: "fixed",
        bottom: 12,
        right: 12,
        width: 60
    }
};

interface IState {
    open: boolean;
    forceOpen: boolean;
}

interface IProps {
    [key: string]: any;
}

class SpeedDialCustom extends React.Component<IProps> {
    state: IState;

    static defaultProps = {
        style: {},
        actions: [],
        ariaLabel: "More options",
        hidden: false,
        buttonColor: "primary"
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            forceOpen: false
        };
    }

    handleClick = () => {
        this.setState((state: IState) => ({
            open: !state.open,
            forceOpen: !state.forceOpen
        }));
    };

    handleOpen = () => {
        if (!this.props.hidden) {
            this.setState({
                open: true
            });
        }
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const { forceOpen, open } = this.state;
        const { actions, buttonColor, hidden = false, style = {}, ...restProps } = this.props;

        return (
            <SpeedDial
                style={{ ...styles.speedDial, ...style }}
                icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
                onBlur={this.handleClose}
                onClick={this.handleClick}
                onClose={this.handleClose}
                onFocus={this.handleOpen}
                onMouseEnter={this.handleOpen}
                onMouseLeave={this.handleClose}
                open={forceOpen || open}
                hidden={hidden}
                {...restProps}
            >
                {actions.map(action => {
                    const Icon = action.icon;
                    const iconColor = action.color ? action.color : "action";

                    return (
                        <SpeedDialAction
                            ButtonProps={{
                                color: buttonColor
                            }}
                            key={action.name}
                            icon={<Icon color={iconColor} />}
                            tooltipTitle={action.name}
                            onClick={action.onClick}
                        />
                    );
                })}
            </SpeedDial>
        );
    }
}

export default SpeedDialCustom;
