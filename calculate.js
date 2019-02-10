const utils = require('ethereumjs-util');
const abi = require('ethereumjs-abi');
const util = require('util');

/*
async function calculate()
{
	console.log("tick");
	var blocknumber = await web3.eth.blockNumber;
	console.log(blocknumber);
	console.log("tock");
}*/

async function allocateMem()
{
	var array = [];
	var addresses = 200000;
	var epochs = 7200000 / 30000;
	console.log("allocating");
	var start = new Date().getTime();
	for (var i = 0; i < addresses; i++)
	{
		array.push(new Array(epochs).fill(1));
	}
	var end = new Date().getTime();

	writeToFile('./data.json', array);

	var time = end - start;
	var usedMem = process.memoryUsage().heapUsed / 1024 / 1024; 
	console.log("done! elapsed time: " + time + " memoryUsage: "+usedMem + "MB");
}

async function writeToFile(filename, obj)
{
	fs.writeFileSync(filename, util.inspect(obj, { maxArrayLength: null }) , 'utf-8');
}

// load web3, this assumes a running geth/parity instance
const Web3 = require('web3');
const Personal = require('web3-eth-personal');
var net = require('net');
var web3;
var personal;
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));
  //var web3 = new Web3('/tmp/geth.ipc', net); // same output as with option below

const fs = require('fs');
const exec = require('child_process').execSync;

allocateMem();
//calculate();
