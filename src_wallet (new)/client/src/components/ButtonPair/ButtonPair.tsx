import {Box, Button} from '@mui/material';
import {STRINGS} from "../../constants";

import type {FC} from "react";
import type {ButtonProps} from '@mui/material';

export interface ButtonPairProps {
    prevButtonLabel?: string;
    nextButtonLabel?: string;
    onPrevButtonClick: ButtonProps['onClick'];
    onNextButtonClick: ButtonProps['onClick'];
    disabled?: boolean;
}

export const ButtonPair: FC<ButtonPairProps> = (props) => {
    const {
        prevButtonLabel = STRINGS.BUTTON_PAIR.PREV_BUTTON.DEFAULT_LABEL,
        nextButtonLabel = STRINGS.BUTTON_PAIR.NEXT_BUTTON.DEFAULT_LABEL,
        onPrevButtonClick,
        onNextButtonClick,
        disabled = false,
    } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
            }}
        >
            <Button
                variant="outlined"
                sx={{minWidth: 60}}
                onClick={onPrevButtonClick}
            >
                {prevButtonLabel}
            </Button>
            <Button
                variant="contained"
                sx={{flex: 1}}
                onClick={onNextButtonClick}
                disabled={disabled}
            >
                {nextButtonLabel}
            </Button>
        </Box>
    );
}
