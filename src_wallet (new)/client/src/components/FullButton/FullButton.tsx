import {Button} from '@mui/material';

import type {FC} from "react";
import type {ButtonProps as MuiButtonProps} from '@mui/material';

export interface FullButtonProps extends MuiButtonProps {}

export const FullButton: FC<FullButtonProps> = (props) => {
    return (
        <Button
            variant="contained"
            fullWidth
            {...props}
        />
    )
}
