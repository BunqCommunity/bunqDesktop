import React from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import AccountListItem from "~components/AccountList/AccountListItem";
import { ReduxState } from "~store/index";

const styles = {
    list: {
        width: 400
    }
};

interface IState {
    [key: string]: any;
}

interface IProps {
    [key: string]: any;
}

class VirtualAccountNumbersDialog extends React.Component<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IProps> {
    state: IState;

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    onOpen = () => this.setState({ open: true });
    onClose = () => this.setState({ open: false });

    render() {
        const { t, accounts, cardInfo } = this.props;

        if (cardInfo.type !== "MASTERCARD_VIRTUAL") return null;

        const virtualCardComponents = cardInfo.primary_account_numbers ? (
            cardInfo.primary_account_numbers
                .filter(virtualNumber => virtualNumber.status === "ACTIVE")
                .map(virtualNumber => {
                    const accountInfo = accounts.find(account => {
                        return virtualNumber.monetary_account_id === account.id;
                    });

                    return (
                        <>
                            <ListItem>
                                <ListItemText
                                    primary={virtualNumber.description}
                                    secondary={`---- ---- ---- ${virtualNumber.four_digit}`}
                                />
                            </ListItem>
                            {accountInfo && <AccountListItem clickable={false} account={accountInfo} />}
                        </>
                    );
                })
        ) : (
            <ListItem>
                <ListItemText primary={t("It seems no Virtual Account Numbers are available")} />
            </ListItem>
        );

        return (
            <>
                <Divider />
                <ListItem button onClick={this.onOpen}>
                    <ListItemText primary={t("View virtual cards")} />
                </ListItem>

                <Dialog onClose={this.onClose} open={this.state.open}>
                    <List style={styles.list}>{virtualCardComponents}</List>
                </Dialog>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        accounts: state.accounts.accounts
    };
};

export default connect(mapStateToProps)(translate("translations")(VirtualAccountNumbersDialog));
