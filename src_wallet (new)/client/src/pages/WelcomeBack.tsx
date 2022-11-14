import {Link, useNavigate} from "react-router-dom";
import {DefaultLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {ENDPOINTS, STRINGS} from "../constants";
import {FullButton, PasswordInput} from "../components";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {GlobalState} from "../states";
import {useEffect, useState} from "react";
import {useMutation} from "react-query";

const WelcomeBack = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const {address, password: storedPassword, mnemonic: mnemonicPhrase} = useRecoilValue(GlobalState);
    const setGlobalState = useSetRecoilState(GlobalState);

    const login = async () => {
        try {
            const res = await fetch(ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password, mnemonicPhrase})
            });
            return await res.json();

        } catch (e) {
            console.error(e);
        }
    };

    const {data, mutate, isLoading, error} = useMutation(login, {});

    useEffect(() => {
        console.log(data);
        if (data?.success) {
            setGlobalState({address: data.data.walletAddress, mnemonic: mnemonicPhrase, password: password ?? ''})
            if (chrome?.storage?.local) {
                chrome.storage.local.set({
                    data: {
                        mnemonic: mnemonicPhrase,
                        address: data.walletAddress,
                        password
                    }
                }, function () {

                });
            }
            navigate('/wallet');
        }
    }, [data]);

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
                    sx={{
                        width: 140,
                        height: 140,
                    }}
                    alt="$PALM"
                    src={`https://avatars.dicebear.com/api/bottts/${address}.svg`}
                />
                <Box>
                    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h5">{STRINGS.WELCOME_BACK.DESCRIPTION}</Typography>
                    </Box>
                    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="body2">{STRINGS.WELCOME_BACK.WARNING}</Typography>
                    </Box>
                </Box>
                <Box width="100%">
                    <PasswordInput
                        label="비밀번호 입력"
                        variant="outlined"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        error={password.length > 0 && password !== storedPassword}
                        // helperText={password !== storedPassword ? 'password를 확인해 주세요.' : ''}
                    />
                </Box>
                <Box sx={{transform: 'translateY(35px)'}}>
                    <Link to="/first-time">
                        <Typography color="warning.light" variant="subtitle2">
                            처음부터 시작하고 싶다면 이 메세지 클릭
                        </Typography>
                    </Link>
                </Box>
                <Box width="100%">
                    <FullButton
                        onClick={() => {
                            mutate();
                        }}
                        disabled={password !== storedPassword}
                    >
                        잠금 해제
                    </FullButton>
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default WelcomeBack;
