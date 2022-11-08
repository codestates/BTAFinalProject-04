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

const Web3 = require('web3');
const BN = require('bn.js');

const harmony = new Harmony('https://api.s0.b.hmny.io', {
  chainId: 2,
  chainType: 'hmy'
});

/*
const hmy = new Harmony(
  'https://api.s0.b.hmny.io/',
  {
      chainType: ChainType.Harmony,
      chainId: ChainID.HmyTestnet,
  },
);
*/

const { HttpProvider, Messenger } = require('@harmony-js/network'); 


const { TransactionFactory } = require('@harmony-js/transaction');
const { Unit } = require('@harmony-js/utils');
const factory = new TransactionFactory();



router.post("/newWallet", async (req, res) => {
  const { id, password } = req.body;
  try {
      console.log('id :' + id);
      console.log('password :' + password);

      const seed = Wallet.generateMnemonic()
      console.log('seed : ' + seed);

      const signer = harmony.wallet.addByMnemonic(seed, 0)
      console.log('signer : ' + signer);
      console.log('signer privateKey : ' + signer.privateKey);
      console.log('signer publicKey : ' + signer.publicKey);
      console.log('signer checksumAddress : ' + signer.checksumAddress);
      console.log('signer address : ' + signer.address);
      

      //encryptAccount
      const encryptAcc = await harmony.wallet.encryptAccount(signer.address, password)
      console.log('res : ' + encryptAcc.privateKey);

      const accountInfo = {
        accountName: id,
        address: signer.checksumAddress
      }

      console.log('Account is to be saved:', accountInfo);

      //account find to checksumAddress
      const foundAccount = harmony.wallet.getAccount(accountInfo.address)
      console.log('foundAccount:', foundAccount);


      console.log('Signer is to encrypted:', harmony.wallet.signer.privateKey);
      

      console.log('harmony.wallet.signer.address:', harmony.wallet.signer.address);
      console.log('password:', password);

      const resultDecryptAcc = await harmony.wallet.decryptAccount(
        harmony.wallet.signer.address,
        password
      )

      console.log(
        'Account is now decrypted, you got the private key:',
        harmony.wallet.signer.privateKey
      )

      const bech32 = getAddress(getAddressFromPrivateKey(harmony.wallet.signer.privateKey)).bech32;

      console.log('bech32 : ' + bech32);

      
      //var returnSeed = {seed:seed}
      //res.redirect("/main");
      console.log('output 처리함')
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
  

  function logOutPut(title, content) {
    console.log(
      '---------------------------------------------------------------------'
    )
    console.log(`==> Log: ${title}`)
    console.log(
      '---------------------------------------------------------------------'
    )
    console.log()
    console.log(content)
    console.log()
  }


  router.post("/sendTransaction", async (req, res) => {
    const { prvKey, toAddress, amount } = req.body;
    try {
      
      HMY_TESTNET_RPC_URL = 'https://api.s0.b.hmny.io';

      const web3 = new Web3(HMY_TESTNET_RPC_URL);

      const sender = harmony.wallet.addByPrivateKey(prvKey)

      const receiver = toAddress //'0x10A02A0a6e95a676AE23e2db04BEa3D1B8b7ca2E'
      
      const txnObjects = {
        nonce: 0,
        gasPrice: new BN(await web3.eth.getGasPrice()).mul(new BN(1)),
        gasLimit: '6721900', 
        shardID: 0,
        to: receiver,
        value: amount * 1e18,
        data: '0x'
      }

      const balance = await harmony.blockchain.getBalance({
        address: sender.address
      })
      logOutPut('senderBalance', balance.result)

      const nonce = await harmony.blockchain.getTransactionCount({
        address: sender.address
      })
      logOutPut('senderNonce', nonce.result)
  
      const tx = harmony.transactions.newTx({
        nonce: txnObjects.nonce,  //txnObjects.nonce,
        gasPrice: new harmony.utils.Unit(txnObjects.gasPrice).asWei().toWei(),
        gasLimit: new harmony.utils.Unit(txnObjects.gasLimit).asWei().toWei(),
        shardID: txnObjects.shardID,
        to: harmony.crypto.getAddress(txnObjects.to).checksum,
        value: new harmony.utils.Unit(txnObjects.value).asWei().toWei(),
        data: txnObjects.data
      })
      
      const signed = await sender.signTransaction(tx, true)
      logOutPut('Signed Transation', signed.txParams)
      logOutPut('rawTransaction', signed.getRawTransaction())
      const [Transaction, hash] = await signed.sendTransaction()
      logOutPut('Transaction Hash', hash)
      // from here on, we use hmy_getTransactionRecept and hmy_blockNumber Rpc api
      // if backend side is not done yet, please delete them from here
      const confirmed = await Transaction.confirm(hash)
      logOutPut('Transaction Receipt', confirmed.receipt)
      if (confirmed.isConfirmed()) {
        const senderUpdated = await harmony.blockchain.getBalance({
          address: sender.address
        })
        logOutPut('Sender balance', senderUpdated.result)
        const receiverUpdated = await harmony.blockchain.getBalance({
          address: receiver
        })
        logOutPut('Receiver balance', receiverUpdated.result)
        //process.exit()
      }


/*      
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
*/
      return res.json(confirmed.receipt);



    } catch (err) {
      console.log(err);
    }
  });  

  

  router.post("/keyStoreFile", async (req, res) => {
    const passphrase = '';
    const account = new Account('45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e');
    account.toFile(passphrase).then(keystore => {
        console.log(keystore);
    });
  });

  module.exports = router;