const utils = require('ethereumjs-util');
const abi = require('ethereumjs-abi');

// load web3, this assumes a running geth/parity instance
const Web3 = require('web3');
const Personal = require('web3-eth-personal');
var net = require('net');
var web3;
var personal;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider("ws://localhost:8545"));
  var web3 = new Web3('/tmp/geth.ipc', net); // same output as with option below
}
const fs = require('fs');
const exec = require('child_process').execSync;




