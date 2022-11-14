import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {DefaultLayout} from "../layouts";
import {ButtonPair, MnemonicInput} from "../components";
import {STRINGS} from "../constants";
import {useRecoilValue} from "recoil";
import {GlobalState} from "../states";
import {useMemo, useState} from "react";

const SeedCheck = () => {
    const navigate = useNavigate();
    const {mnemonic} = useRecoilValue(GlobalState);
    const [mnemonicInput, setMnemonicInput] = useState<string>('');
    const mnemonicError = useMemo(
        () => (
                mnemonicInput.length > 0 && mnemonicInput.split(' ').length !== 12)
            || mnemonic !== mnemonicInput,
        [mnemonic, mnemonicInput]
    );

    return (
        <DefaultLayout logo>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between'
                }}
            >
                <Box>
                    <Box width="100%" mb={6}>
                        <Typography variant="h4">비밀 복구 구문 확인</Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography
                            whiteSpace="break-spaces"
                            variant="body1"
                        >
                            {STRINGS.SEED_CHECK.DESCRIPTION}
                        </Typography>
                    </Box>
                    <Box
                        mt={3}
                        width="100%"
                        gap={4}
                        display="flex"
                        flexDirection="column"
                    >
                        <MnemonicInput
                            label="seed phrase"
                            value={mnemonicInput}
                            onChange={(e) => {
                                setMnemonicInput(e.target.value);
                            }}
                            error={mnemonicError}
                        />
                    </Box>
                    <Box mt={2}>
                        <Typography
                            whiteSpace="break-spaces"
                            variant="body2"
                            color="grey.700"
                        >
                            {STRINGS.SEED_CHECK.WARNING}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <ButtonPair
                        onPrevButtonClick={() => {
                            navigate(-1);
                        }}
                        onNextButtonClick={() => {
                            navigate('/all-set');
                        }}
                        disabled={mnemonicError}
                    />
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default SeedCheck;
