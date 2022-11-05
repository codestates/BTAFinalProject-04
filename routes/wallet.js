const express = require('express');
const router = express.Router();

const { Harmony } = require('@harmony-js/core');
      const { ChainID, ChainType } = require('@harmony-js/utils');
      const { isPrivateKey, isAddress, isPublicKey } = require('@harmony-js/utils');
      const {
        encode,
        decode,
        randomBytes,
        toBech32,
        fromBech32,
        HarmonyAddress,
        getAddress,
        generatePrivateKey,
        getPubkeyFromPrivateKey,
        getAddressFromPublicKey,
        getAddressFromPrivateKey,
        encryptPhrase,
        decryptPhrase
      } = require('@harmony-js/crypto');


const { Wallet } = require('@harmony-js/account');
const { Account } = require('@harmony-js/account');

const harmony = new Harmony('https://api.s0.b.hmny.io', {
  chainId: 2,
  chainType: 'hmy'
});

const hmy = new Harmony(
  'https://api.s0.b.hmny.io/',
  {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyTestnet,
  },
);

const { HttpProvider, Messenger } = require('@harmony-js/network'); 


const { TransactionFactory } = require('@harmony-js/transaction');
const { Unit } = require('@harmony-js/utils');
const factory = new TransactionFactory();



router.post("/newWallet", async (req, res) => {
  const { password } = req.body;
  try {
      
      const seed = Wallet.generateMnemonic()
      console.log('seed : ' + seed);

      const signer = harmony.wallet.addByMnemonic(seed, 0)
      console.log('signer : ' + signer);
      console.log('signer privateKey : ' + signer.privateKey);
      console.log('signer checksumAddress : ' + signer.checksumAddress);

      const encryptAcc = await harmony.wallet.encryptAccount(signer.address, password)
      console.log('res : ' + encryptAcc);

      const accountInfo = {
        accountName: 'TEST',
        address: signer.checksumAddress
      }

      console.log('Account is to be saved:', accountInfo);

      const foundAccount = harmony.wallet.getAccount(accountInfo.address)

      console.log('Signer is to encrypted:', harmony.wallet.signer.privateKey);
      
      const resultDecryptAcc = await harmony.wallet.decryptAccount(
        harmony.wallet.signer.address,
        password
      )

      console.log(resultDecryptAcc);

      console.log(
        'Account is now decrypted, you got the private key:',
        harmony.wallet.signer.privateKey
      )

      const bech32 = getAddress(getAddressFromPrivateKey(harmony.wallet.signer.privateKey)).bech32;

      console.log('bech32 : ' + bech32);



      return res.json({ seed, signer, encryptAcc});
    }
    catch(err){
      console.log(err);
    }
  });





  router.post("/getBalance", async (req, res) => {
    const { address } = req.body;
    
    //0x9def9cfd299d4cda87b97bbde7750fcc863a2f53555db850cc1ae09743535db2
    try {

      const account = new Account(
        address,
        new Messenger(
          new HttpProvider('https://api.s0.b.hmny.io'),
          ChainType.Harmony,
          ChainID.HmyTestnet,
        ),
      );
      account.getBalance().then(response => {
          console.log(response);
          return res.json(response);
      });

    } catch (err) {
      console.log(err);
    }
  });
  


  router.post("/sendTransaction", async (req, res) => {
    const { prvKey, toAddress, amount } = req.body;
    try {

      const Web3 = require('web3');
      const BN = require('bn.js');
      
      HMY_PRIVATE_KEY = prvKey;
      HMY_TESTNET_RPC_URL = 'https://api.s0.b.hmny.io';
      
      const web3 = new Web3(HMY_TESTNET_RPC_URL);
      
      let hmyMasterAccount = web3.eth.accounts.privateKeyToAccount(HMY_PRIVATE_KEY);
      web3.eth.accounts.wallet.add(hmyMasterAccount);
      web3.eth.defaultAccount = hmyMasterAccount.address
      
      const myAddress = web3.eth.defaultAccount;
      console.log('My address: ', myAddress);


      const balance = await web3.eth.getBalance(myAddress);
      console.log('My balance: ', balance / 1e18);

      const gasPrice = new BN(await web3.eth.getGasPrice()).mul(new BN(1));
      const gasLimit = 6721900;
      
      const value = amount * 1e18; // 1 ONE
      
      const from = web3.eth.defaultAccount;
      const to = toAddress; // account was created on prev step
      
      const result = await web3.eth
            .sendTransaction({ from, to, value, gasPrice, gasLimit })
            .on('error', console.error);
            
      console.log(`Send tx: ${result.transactionHash} result: `, result.status);
      
      const newAddrBalance = await web3.eth.getBalance(toAddress);
      console.log('New account balance: ', newAddrBalance / 1e18);

      return res.json(result);

/*
      const hmy = new Harmony(
        'https://api.s0.b.hmny.io/',
        {
            chainType: ChainType.Harmony,
            chainId: ChainID.HmyTestnet,
        }
      );

      const txn = factory.newTx({
        to: toAddress,
        //value: new Unit(1).asOne().toWei(),
        value: new Unit(amount).asOne().toWei(),
        // gas limit, you can use string
        gasLimit: '21000',
        // send token from shardID
        shardID: 0,
        // send token to toShardID
        toShardID: 0,
        // gas Price, you can use Unit class, and use Gwei, then remember to use toWei(), which will be transformed to BN
        gasPrice: new Unit('1').asGwei().toWei(),
      });

      hmy.wallet.addByPrivateKey('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');

      hmy.wallet.signTransaction(txn).then(signedTxn => {
        signedTxn.sendTransaction().then(([tx, hash]) => {
          console.log('tx hash: ' + hash);
          signedTxn.confirm(hash).then(response => {
            console.log(response.receipt);
            return res.json(hash);
          });
        });
      });

    */

    } catch (err) {
      console.log(err);
    }
  });  


  module.exports = router;