const axios = require('axios').default;

export default class UniswapUtil{

    static getRecentSwap = async (walletAddress: string) => {
        try {
            let result = await axios.post("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", 
                {
                    query: `{
                        swaps(first: 1000 orderBy: timestamp orderDirection: desc) 
                        {
                            id
                            recipient
                            sender
                            timestamp
                        }
                    }`
                }
            )

            let filteredResult = result.data.data.swaps.filter((el: any) => {
                if(el.recipient === walletAddress) return true;
            })

            return filteredResult;
        }
        catch (err) {
            throw(err);
        }
    }
}