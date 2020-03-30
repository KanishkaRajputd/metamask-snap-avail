import {hasMetaMask} from "../services/metamask";
import React, {createContext, Dispatch, PropsWithChildren, Reducer, useReducer} from "react";

export interface MetamaskState {
    isPolkadotSnapInstalled: boolean,
    hasMetaMask: boolean,
    hasPolkadotInstallFailed: boolean
}

const initialState: MetamaskState = {
    isPolkadotSnapInstalled: false,
    hasMetaMask: hasMetaMask(),
    hasPolkadotInstallFailed: false
};
type MetamaskDispatch = {type: MetamaskActions, payload: any};

export const MetaMaskContext = createContext<[MetamaskState, Dispatch<MetamaskDispatch>]>([initialState, () => {}]);

export enum MetamaskActions {
    SET_INSTALLED_STATUS,
    HAS_INSTALL_FAILED
}



const reducer: Reducer<MetamaskState, MetamaskDispatch> = (state, action) => {

    switch (action.type) {
        case MetamaskActions.SET_INSTALLED_STATUS: {
            return {
                ...state,
                isPolkadotSnapInstalled: action.payload
            }
        }
        case MetamaskActions.HAS_INSTALL_FAILED: {
            return {
                ...state,
                hasPolkadotInstallFailed: action.payload
            }
        }
        default: {
            return state;
        }
    }

};


export const MetaMaskContextProvider = (props: PropsWithChildren<{}>) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MetaMaskContext.Provider value={[state, dispatch]}>
            {props.children}
        </MetaMaskContext.Provider>
    );
};
