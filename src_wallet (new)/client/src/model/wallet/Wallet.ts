import CustomAxios from "../../common/CustomAxios";

export default class WalletModel {

    static getBalance = async (walletAddress: string, network: string) => {
        let res = await CustomAxios.get(`wallet/balance?walletAddress=${walletAddress}&network=${network}`);
        return res.data;
    };

    // static select = async (bNum) => {
    //     let res = await CustomAxios.get(`block/select?bNum=${bNum}`);
    //     return res.data;
    // };

    // static list = async (limit, offset) => {
    //     let res = await CustomAxios.get(`block/list?limit=${limit}&offset=${offset}`);
    //     return res.data;
    // };
}
