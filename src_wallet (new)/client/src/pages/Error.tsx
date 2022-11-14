import {DefaultLayout} from "../layouts";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

const Error = () => {
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
                Error 발생. 다시 시도해 주세요.
                <Link to="/first-time">처음으로</Link>
            </Box>
        </DefaultLayout>
    )
}

export default Error;
