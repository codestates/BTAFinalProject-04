import {atom} from "recoil";

export const GlobalState = atom({
    key: 'globalState',
    default: {
        mnemonic: '',
        // TODO: 제거!!!!!!!!!!
        address: '',
        // TODO: 제거!!!!!!!!!!
        password: '',
    },
});
