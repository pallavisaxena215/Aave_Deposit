const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface , bytecode} = require('./compile');
//here once again we difened a constructor HDWalletProvider that would
//create several instances 

//this will be used
const poolAddress = "0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe";
const aDaiAddress = "0x6dDFD6364110E9580292D9eCC745F75deA7e72c8";
const daiAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";

// the provider specifies the infura node we need to connect to
const provider = new HDWalletProvider ( // paste the mnemonic of the configured ethereum wallet 
    'exotic cream swap young cabbage toy crazy release kick camera truly surprise ','https://kovan.infura.io/v3/1865737ea6a44c8f89ca16ade6145e93'
   // the second argument is the link to the network we wish to connect to (in this case kovan test network)
);

// now we are intitializing the web3 with the provider to interact with the Kovan test network
const web3 = new Web3(provider);

const deploy= async () =>{
    const accounts = await web3.eth.getAccounts();
    // the mnemonic will just not retrive a single account. It can be used to retrive a list of account
   console.log('Attempting to deploy from account', accounts[0]);

   const result = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({data :'0x' + bytecode, arguments: [{poolAddress},{daiAddress},{aDaiAddress}]})
   .send({from : accounts[0], gas:'1000000'})

   console.log('Contract Deployed to', result.options.address);
};

deploy();