const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../compile');

let accounts;
let contract;

beforeEach( async () => {
   // fetch accounts
    accounts =  await web3.eth.getAccounts();

   // deploy contract

   contract = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({ data:bytecode, arguments:['Hello World']})
   .send({ from:accounts[0], gas:'1000000'})

});

describe( 'Inbox', () => {

   it('Deploy Contract',() => {
     assert.ok(contract.options.address);
   });

   it('Initial Message',async () => {
     const initialMessage  = await contract.methods.message().call();
     assert.equal(initialMessage,'Hello World');
   });

   it('Update Message',async () => {
     await contract.methods.setMessage('Bye World').send({ from:accounts[0],gas:'1000000' });
     const newMessage = await contract.methods.message().call()
     assert.equal(newMessage,'Bye World');
   });


});
