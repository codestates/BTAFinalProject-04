import {Avatar, Box} from "@mui/material";

import type {FC, PropsWithChildren} from "react";
import type {BoxProps} from "@mui/material";

export interface DefaultLayoutProps extends BoxProps {
    logo?: boolean;
}

const DefaultLayout: FC<PropsWithChildren<DefaultLayoutProps>> = (props) => {
    const {children, logo = false, sx = {}, ...rest} = props;

    return (
        <Box
            id="layout"
            sx={{
                p: 5,
                pt: 8,
                width: '100%',
                height: '100%',
                ...sx,
            }}
            {...rest}
        >
            {logo && (
                <Box position="absolute" left={15} top={15}>
                    <Avatar
                        sx={{
                            width: 30,
                            height: 30,
                        }}
                        alt="$PALM"
                        src="/harmony_logo.png"
                    />
                </Box>
            )}
            {children}
        </Box>
    )
}

export default DefaultLayout;
