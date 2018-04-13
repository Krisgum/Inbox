const TruffleHDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');

const provider = new TruffleHDWalletProvider(
  'earth tray green rookie inject cave boy idle dream evil worry vessel',
  'https://rinkeby.infura.io/9IltQoLwnrimga3Zm12x'
);

const web3 = new Web3(provider);

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();
  console.log('First rinkeby account is',accounts[0]);

  const result =  await new web3.eth.Contract(JSON.parse(interface))
   .deploy({ data:bytecode , arguments:['Hello World Rinkeby']})
   .send({ from:accounts[0] , gas:1000000 });

  console.log('Addess of the contract is ', result.options.address);
};

deploy();
