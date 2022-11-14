import {Box, InputAdornment, TextField} from '@mui/material';

import type {FC} from "react";
import type {OutlinedTextFieldProps} from '@mui/material';

export interface SendCoinInputProps extends OutlinedTextFieldProps {
    inputType: 'address' | 'amount';
    unit?: string;
}

export const SendCoinInput: FC<SendCoinInputProps> = (props) => {
    const {label = 'label', inputType, unit = '', ...rest} = props;

    return (
        <Box>
            <TextField
                {...rest}
                required
                fullWidth
                label={label}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
                }}
                variant="outlined"
                size="medium"
            />
        </Box>
    );
}
