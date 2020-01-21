import React from "react";
import { translate } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import OriginalButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import HelpIcon from "@material-ui/icons/Help";
import { AppWindow } from "~app";

import TranslateTypography from "~components/TranslationHelpers/Typography";
import TranslateButton from "~components/TranslationHelpers/Button";

const Button: any = OriginalButton;

const styles = {
    title: {
        margin: 16
    },
    container: {
        padding: 8
    },
    button: {
        width: "100%"
    },
    logo: {
        maxWidth: 30,
        maxHeight: 30,
        marginLeft: 10
    },
    titleWrapper: {
        display: "flex",
        alignItems: "center"
    },
    contactCount: {
        marginLeft: 54
    }
};

interface IProps {
    contacts: any;
    t: AppWindow["t"];
    clear: any;

    contactType: string;
    login: Function;
    import: Function;
    loading: boolean;
    canImport: boolean;
    logo: string;
    title: string;

    questionLink?: string;

    loginButtonText?: string;
    importButtonText?: string;
}

const ContactHeader = (props: IProps) => {
    const { t, contacts, contactType } = props;

    // fallback to empty list
    if (!contacts[contactType]) {
        contacts[contactType] = [];
    }

    const contactsCount = contacts[contactType] ? contacts[contactType].length : 0;

    return (
        <Grid container alignItems={"center"} spacing={8} style={styles.container}>
            <Grid item xs={12} sm={4} md={6} style={styles.titleWrapper}>
                <img style={styles.logo} src={props.logo} />

                <TranslateTypography variant="h6" style={styles.title}>
                    {props.title}
                </TranslateTypography>
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
                <TranslateButton
                    variant="contained"
                    color="secondary"
                    style={styles.button}
                    disabled={props.loading}
                    onClick={() => props.clear(props.contactType)}
                >
                    Clear
                </TranslateButton>
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
                {props.canImport ? (
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        disabled={props.loading}
                        onClick={props.import}
                    >
                        {t(props.importButtonText ?? "Import")}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        disabled={props.loading}
                        onClick={props.login}
                    >
                        {t(props.loginButtonText ?? "Login")}
                    </Button>
                )}
            </Grid>

            <Grid item xs={8} sm={10}>
                {contactsCount > 0 ? (
                    <Typography variant="subtitle1" style={styles.contactCount}>
                        {`${contactsCount} ${t("contacts")}`}
                    </Typography>
                ) : (
                    <TranslateTypography variant="subtitle1" style={styles.contactCount}>
                        No stored contacts
                    </TranslateTypography>
                )}
            </Grid>
            <Grid item xs={4} sm={2}>
                {props.questionLink ? (
                    <IconButton component="a" className="js-external-link" rel="noopener" href={props.questionLink}>
                        <HelpIcon />
                    </IconButton>
                ) : null}
            </Grid>
        </Grid>
    );
};

export default translate("translations")(ContactHeader);
