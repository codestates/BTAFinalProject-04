import {ENDPOINTS} from "../constants";
import {useQuery} from "react-query";

export const useBalance  = (address:string) => {
    const getBalance = async () => {
        try {
            const res = await fetch(`${ENDPOINTS.BALANCE}?walletAddress=${address}`);
            const data = await res.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
        }
    };

    const {data, isLoading, error, refetch} = useQuery('BALANCE', getBalance, {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 3000,
        enabled: Boolean(address),
    });

    return {...data, isLoading, error, refetch};
}
