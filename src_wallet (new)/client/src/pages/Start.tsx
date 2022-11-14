import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {DefaultLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {STRINGS} from "../constants";
import {FullButton} from "../components";
import {useSetRecoilState} from "recoil";
import {GlobalState} from "../states";

const Start = () => {
    const navigate = useNavigate();
    const setGlobalState = useSetRecoilState(GlobalState);
    // mnemonic이 있으면 WelcomeBack page로 이동.
    useEffect(() => {
        if (chrome?.storage?.local) {
            chrome.storage.local.get('data', function ({data}) {
                if (!data) return;

                const {mnemonic, address, password} = data;
                setGlobalState({mnemonic, address, password});

                navigate('/welcome-back');
            });
        }
    }, [navigate, setGlobalState]);

    return (
        <DefaultLayout>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    variant="square"
                    sx={{
                        width: 200,
                        height: 200,
                    }}
                    alt="$PALM"
                    src="/harmony_logo.png"
                />
                <Box>
                    <Box mt={2} display="flex"  flexDirection="column" alignItems="center">
                        <Typography variant="h6">{`Harmony Wallet 방문을 환영합니다`}</Typography>
                    </Box>
                    <Box width="100%" display="flex"  flexDirection="column" alignItems="center">
                        <Typography variant="body2">{STRINGS.GLOBAL.PROJECT_DESCRIPTION}</Typography>
                    </Box>
                </Box>
                <Box width="100%">
                    <FullButton
                        onClick={() => {
                            navigate('/first-time')
                        }}
                    >
                        시작하기
                    </FullButton>
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default Start;
