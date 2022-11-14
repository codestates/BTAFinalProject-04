import {WalletLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {ButtonPair, CopiableAddress, FakeTab, NetworkSelector} from "../components";
import {useMemo, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {GlobalState} from "../states";
import {useRecoilValue} from "recoil";
import {ENDPOINTS} from "../constants";
import {useMutation} from "react-query";

const NETWORKS = [
    {
        label: 'harmony (testnet)',
        value: 'harmonyTestnet',
        disabled: false,
    },
    {
        label: 'harmony (mainnet)',
        value: 'harmonyMainnet',
        disabled: false,
    },
    {
        label: 'harmony (localnet)',
        value: 'harmonyLocal',
        disabled: true,
    },
];

const useQueryParams = () => {
    const {search} = useLocation();

    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    return {
        address: searchParams.get('address'),
        amount: searchParams.get('amount'),
    }
}

const SendConfirm = () => {
    const [network, setNetwork] = useState<string>(NETWORKS[0].value);
    const {address: myAddress, password, mnemonic} = useRecoilValue(GlobalState);
    const navigate = useNavigate();
    const {address, amount} = useQueryParams();
    const {ticker} = useParams();

    const transfer = async () => {
        try {
            const res = await fetch(ENDPOINTS.TRANSFER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fromAddress: myAddress,
                    toAddress: address,
                    amount,
                    password,
                    mnemonicPhrase: mnemonic,
                    network: network,
                })
            });
            const data = await res.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error(e);
        }
    };

    const {data, mutate, isLoading, error} = useMutation(transfer, {
        onSuccess: () => {
            navigate('/all-set', {state: {action: 'transfer'}});
        }
    });

    return (
        <WalletLayout
            topNode={
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CopiableAddress address={myAddress} />
                </Box>
            }
            middleNode={
                <Box
                    height="100%"
                    id="box"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{transform: 'translateY(-20px)'}}
                >
                    <Box>
                        <NetworkSelector
                            options={NETWORKS}
                            value={network}
                            onChange={(e) => {
                                setNetwork(e.target.value as string);
                            }}
                        />
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="left"
                        gap={2}
                        mt={-20}
                        width="100%"
                    >
                        <Box>
                            <Typography variant="h5">Send Address</Typography>
                            <Typography color="text.secondary" variant="subtitle2">{address}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">Amount</Typography>
                            <Typography color="text.secondary" variant="body1">{`${amount} ${ticker}`}</Typography>
                        </Box>
                    </Box>
                    <Box width="100%">
                        <ButtonPair
                            nextButtonLabel="확인 완료"
                            onPrevButtonClick={() => {
                                navigate(-1);
                            }}
                            onNextButtonClick={() => {
                                mutate();
                            }}
                            disabled={false}
                        />
                    </Box>
                </Box>
            }
            bottomNode={
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <FakeTab activeIndex={1} />
                </Box>
            }
        />
    )
}

export default SendConfirm;
