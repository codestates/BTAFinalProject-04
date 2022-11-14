import {WalletLayout} from "../layouts";
import {Avatar, Typography, Box, FormControl, MenuItem, Select} from '@mui/material';
import {CoinCard, CopiableAddress, FakeTab, NetworkSelector} from "../components";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {GlobalState} from "../states";
import {useBalance} from "../hooks";

import WalletModel from "../model/wallet/Wallet";

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

const Wallet = () => {
    const [network, setNetwork] = useState<string>(NETWORKS[0].value);
    const {address} = useRecoilValue(GlobalState);
    const {data, isLoading} = useBalance(address);   
    const [balance, setBalance] = useState<number>(0); 


    const getBalance = async (network: string) => {
        try {
            const data = await WalletModel.getBalance(address, network);
            console.log("data:", data);
            setBalance(data);
        }
        catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        console.log("------------", data, isLoading);
    }, [data, isLoading]);

    useEffect(() => {
        getBalance(network);
    }, []);

    return (
        <WalletLayout
            topNode={
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CopiableAddress address={address} />
                </Box>
            }
            middleNode={
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{transform: 'translateY(-20px)'}}
                >
                    {/* <NetworkSelector
                        options={NETWORKS}
                        value={network}
                        onChange={(e) => {
                            console.log("e.target.value:", e.target.value);
                            setNetwork(e.target.value as string);
                        }}
                    /> */}

                    <Box mx={1}>
            <FormControl fullWidth size="small">
                <Select
                    value={network}
                    onChange={(e) => {
                        if (e.target.value) {
                            setNetwork(e.target.value);
                            getBalance(e.target.value);
                        }
                    }}
                    defaultValue={network}
                    sx={{
                        borderRadius: '30px',
                        '& .MuiInputBase-input': {
                            color: 'background.default',
                            // bgcolor: 'text.primary',
                            bgcolor: 'primary.main',
                            borderRadius: '30px',
                            '&:focus': {
                                borderRadius: '30px',
                            }
                        },
                        '& .MuiSelect-icon': {
                            fill: (theme) => theme.palette.background.default,
                        }
                    }}
                >
                    {NETWORKS.map(({label, value, disabled}) => {
                        return (
                            <MenuItem key={value} disabled={disabled} value={value}>{label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>

                    <Box width="100%" pt={3}>
                        <Box
                            sx={{
                                p: 2,
                                mx: 1,
                                display: 'flex',
                                gap: 2,
                                border: '1px solid',
                                borderColor: 'grey.400',
                                borderRadius: 1.5,
                                '&:hover': {
                                    cursor: 'pointer',
                                    bgcolor: 'grey.50',
                                    opacity: 0.8,
                                }
                            }}
                        >
                        <Avatar
                            alt="palm"
                            src="/harmony_logo.png"
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="body2">one</Typography>
                            <Typography variant="body2">{`${balance ?? ''} ONE`}</Typography>
                        </Box>
                    </Box>
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
                    <FakeTab activeIndex={0} />
                </Box>
            }
        />
    )
}

export default Wallet;
