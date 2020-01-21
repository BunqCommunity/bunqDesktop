import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import AccountList from "~components/AccountList/AccountList";
import BunqMeTabList from "~components/BunqMeTabList";
import { bunqMeTabsUpdate } from "~store/bunqMeTabs/thunks";
import { AppDispatch, ReduxState } from "~store/index";
import BunqMeTabForm from "./BunqMeTabForm";

const styles = {
    paper: {
        marginBottom: 20
    }
};

interface IState {
    [key: string]: any;
}

interface IProps {
    [key: string]: any;
}

class BunqMeTab extends React.Component<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IProps> {
    state: IState;

    constructor(props, context) {
        super(props, context);
        this.state = {
            showForm: false
        };
    }

    componentDidMount() {
        // set the current account selected on the dashboard as the active one
        this.props.accounts.map((account, accountKey) => {
            if (this.props.selectedAccount === account.id) {
                this.setState({ selectedAccount: accountKey });
            }
        });
    }

    updateTabs = (userId, accountId) => this.props.bunqMeTabsUpdate(userId, accountId);

    toggleForm = () => this.setState({ showForm: !this.state.showForm });

    render() {
        const t = this.props.t;
        return (
            <Grid container spacing={16}>
                <Helmet>
                    <title>{`bunqDesktop - ${t("bunqme Requests")}`}</title>
                </Helmet>

                <Hidden mdDown>
                    <Grid item lg={2} />
                </Hidden>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper style={styles.paper}>
                        <AccountList updateExternal={this.updateTabs} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <Collapse in={this.state.showForm} unmountOnExit>
                        <Paper style={styles.paper}>
                            <BunqMeTabForm />
                        </Paper>
                    </Collapse>
                    <Paper style={styles.paper}>
                        <BunqMeTabList
                            t={t}
                            secondaryActions={
                                this.props.limitedPermissions ? null : (
                                    <IconButton aria-label="Toggle the form" onClick={this.toggleForm}>
                                        {this.state.showForm ? <CloseIcon /> : <AddIcon />}
                                    </IconButton>
                                )
                            }
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        accounts: state.accounts.accounts,
        selectedAccount: state.accounts.selected_account,

        user: state.user.user,
        userType: state.user.user_type,
        limitedPermissions: state.user.limited_permissions
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        bunqMeTabsUpdate: (userId, accountId) => dispatch(bunqMeTabsUpdate(userId, accountId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate("translations")(BunqMeTab));
