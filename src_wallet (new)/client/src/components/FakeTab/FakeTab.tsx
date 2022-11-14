import {useCallback, useMemo} from "react";
import {Box, Tooltip} from '@mui/material';
import {
    CurrencyBitcoin as CurrencyBitcoinIcon,
    IosShare as IosShareIcon,
} from '@mui/icons-material';

import type {FC} from "react";
import type {BoxProps} from '@mui/material';
import {FakeTabItem} from "./FakeTabItem";

export interface FakeTabProps {
    activeIndex: number;
}

const TABS = [
    {
        label: '잔액 조회',
        path: '/wallet',
        icon: CurrencyBitcoinIcon,
    },
    {
        label: '송금하기',
        path: '/send',
        icon: IosShareIcon,
    }
]


export const FakeTab: FC<FakeTabProps> = (props) => {
    const {activeIndex} = props;

    return (
        <Box
            mx={2}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                '&:hover': {
                    cursor: 'pointer',
                    opacity: 0.8,
                }
            }}
        >
            {TABS.map((tabInfo, index) => {
                return <FakeTabItem key={tabInfo.label} active={index === activeIndex} {...tabInfo} />
            })}
        </Box>
    );
}
