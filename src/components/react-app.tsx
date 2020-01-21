import React from "react";
import ReactDOM from "react-dom";
import store from "store";
import BunqJSClient from "@bunq-community/bunq-js-client";
import { AppWindow } from "~app";
import BunqDesktopClient from "./BunqDesktopClient";

// bunqDesktop entry point
import App from "./App";

// Css styling and libraries
import "../scss/main.scss";
import "animate.css";
import "typeface-roboto";

import Logger from "~functions/Logger";
import Analytics from "~functions/Analytics";

declare let window: AppWindow;

Analytics();

// create a new bunq js client and inject into the app
// @ts-ignore
const BunqJSClientInstance = new BunqJSClient(store, Logger);
BunqJSClientInstance.setKeepAlive(false);

// global bunqdesktop client object
window.BunqDesktopClient = new BunqDesktopClient(BunqJSClientInstance, Logger, store);

ReactDOM.render(<App BunqJSClient={BunqJSClientInstance} />, document.getElementById("app"));
