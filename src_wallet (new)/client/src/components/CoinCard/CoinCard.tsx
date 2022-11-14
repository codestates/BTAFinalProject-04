import {Avatar, Box, Typography} from '@mui/material';
import {noop} from "../../utils";

import type {FC} from "react";
import type {BoxProps} from '@mui/material';

export interface CoinCardProps {
    name: string;
    ticker: string;
    balance: number | string;
    onClick?: BoxProps['onClick'];
}

export const CoinCard: FC<CoinCardProps> = (props) => {
    const {name, ticker, balance, onClick = noop} = props;

    console.log("props:", props);

    return (
        <Box
            onClick={onClick}
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
                <Typography variant="body2">{name}</Typography>
                <Typography variant="body2">{`${balance ?? ''} ${ticker}`}</Typography>
            </Box>
        </Box>
    );
}
