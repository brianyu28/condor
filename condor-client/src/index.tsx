import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { PersistGate } from "redux-persist/integration/react";

import { reducer } from "./reducers/Reducers";
import { store, persistor } from "./reducers/Persist";
import * as Actions from "./actions/Actions";

import AppContainer from "./containers/AppContainer";

import "./css/index.css";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
        </PersistGate>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
