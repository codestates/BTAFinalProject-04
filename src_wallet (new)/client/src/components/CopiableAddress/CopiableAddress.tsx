import {useCallback, useMemo} from "react";
import {Box, Tooltip} from '@mui/material';
import {ContentCopy as ContentCopyIcon} from '@mui/icons-material';
import {copyToClipboard} from "../../utils";

import type {FC} from "react";
import type {BoxProps} from '@mui/material';

export interface CopiableAddressProps {
    address: string;
}

export const CopiableAddress: FC<CopiableAddressProps> = (props) => {
    const {address} = props;
    const shortenedAddress = useMemo(() => {
        const addr = /0x/.test(address) ? address : `0x${address}`;

        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
    }, [address]);

    const handleCopyButtonClick: BoxProps['onClick'] = useCallback(() => {
        copyToClipboard(address).then(() => {
        })
    }, [address]);

    return (
        <Box
            mx={2}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                    cursor: 'pointer',
                    opacity: 0.8,
                }
            }}
            onClick={handleCopyButtonClick}
        >
            <Box component="span">{shortenedAddress}</Box>
            <Tooltip title="복사하기">
                <Box component="span">
                    <ContentCopyIcon sx={{fontSize: '0.8rem'}} />
                </Box>
            </Tooltip>

        </Box>
    );
}
