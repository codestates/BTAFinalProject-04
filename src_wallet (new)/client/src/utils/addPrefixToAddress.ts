const addPrefixToAddress = (address: string) => {
    return /0x/.test(address) ? address : `0x${address}`;
}

export default addPrefixToAddress;
