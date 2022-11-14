import {Box, FormControl, MenuItem, Select} from '@mui/material';

import type {FC} from "react";
import type {SelectProps} from '@mui/material';

export interface NetworkSelectorProps extends SelectProps {
    options: { label: string; value: string; disabled: boolean }[];
}

export const NetworkSelector: FC<NetworkSelectorProps> = (props) => {
    const {options, value, onChange} = props;

    return (
        <Box mx={1}>
            <FormControl fullWidth size="small">
                <Select
                    value={value}
                    onChange={onChange}
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
                    {options.map(({label, value, disabled}) => {
                        return (
                            <MenuItem key={value} disabled={disabled} value={value}>{label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
