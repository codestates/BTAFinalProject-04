import {useMemo} from "react";
import {Link} from "react-router-dom";
import {Box, Typography} from '@mui/material';
import {Add as CreateIcon, BrowserUpdated as BringIcon} from '@mui/icons-material'
import {FullButton} from "../FullButton";
import {STRINGS} from "../../constants";

import type {FC} from "react";

export interface ActionCardProps {
    type: 'create' | 'bring';
}

export const ActionCard: FC<ActionCardProps> = (props) => {
    const {type} = props;

    const dataByType = useMemo(() => {
        return type === 'create' ? {
            Icon: CreateIcon,
            labels: STRINGS.ACTION_CARD.CREATE,
            nextPath: '/create-wallet'
        } : {
            Icon: BringIcon,
            labels: STRINGS.ACTION_CARD.BRING,
            nextPath: '/bring-wallet'
        }
    }, [type]);

    return (
        <Box
            component={Link}
            to={dataByType.nextPath}
            sx={{
                p: 2.75,
                pt: 1.5,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'grey.400',
                borderRadius: 1.5,
                color: 'inherit',
                '&:hover': {
                    cursor: 'pointer',
                    opacity: 0.9,
                }
            }}
        >
            <dataByType.Icon sx={{fontSize: '4rem'}} />
            <Box mt={1}>
                <Typography variant="h6">{dataByType.labels.PRIMARY}</Typography>
            </Box>
            <Box mt={1}>
                <Typography variant="body2">{dataByType.labels.SECONDARY}</Typography>
            </Box>
            <Box mt={1} width="80%">
                <FullButton fullWidth>{dataByType.labels.BUTTON_LABEL}</FullButton>
            </Box>
        </Box>
    );
}
