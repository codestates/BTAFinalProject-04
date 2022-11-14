const PORT = 3200;
const HOST = `http://localhost:${PORT}/api/wallet`;

const ENDPOINTS = {
    NEW_MNEMONIC: `${HOST}/mnemonic`,
    NEW_WALLET: `${HOST}/create`,
    BALANCE: `${HOST}/balance`,
    TRANSFER: `${HOST}/transfer`,
    LOGIN: `${HOST}/login`,
    GET_PRIVATE_KEY: `${HOST}/privatekey`,
    GET_MY_MNEMONIC: `${HOST}/myMnemonic`,
}

export default ENDPOINTS;
