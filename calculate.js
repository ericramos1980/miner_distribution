const utils = require('ethereumjs-util');
const abi = require('ethereumjs-abi');
const util = require('util');

async function allocateMem()
{
	var array = [];
	var addresses = 200000;
	var epochs = 72000 / 3000;
	console.log("allocating");
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

async function calculateDatasets()
{
	var addresses = [];
    var miners = [];
    var labels = [];
    var sum = [];

    var startTime = new Date();
    //var q = 2000;
    //var epoch_length = 200;
    var epoch_length = 3000;
    //var q = await web3.eth.getBlockNumber();
	var q = 72000
    console.log("block number:" + q);
    var currentEpoch;
    var size = Math.ceil(q / epoch_length);
    for (var blockIdx = 0; blockIdx < q; blockIdx++) {
        if(blockIdx % epoch_length == 0){
            currentEpoch = Math.floor(blockIdx / epoch_length);
            labels.push(blockIdx);
            var tick = new Date();
			var time = tick - startTime;
			var usedMem = process.memoryUsage().heapUsed / 1024 / 1024; 
            console.log("percent parsed: " + (blockIdx / q).toFixed(3) + " elapsed time: " + Math.ceil(time / 1000) + "s memoryUsage: "+ usedMem.toFixed(2) + "MB");
        }
        var result = await web3.eth.getBlock(blockIdx);
        var miner;

        if(result.miner!==undefined){
            miner = result.miner;
            var idx = addresses.indexOf(miner);
            if(idx != -1){
                miners[idx][currentEpoch] += 1;
                sum[idx] += 1;
            }
            else {
                addresses.push(miner);
                sum.push(1);
                miners.push(new Array(size).fill(0));
                miners[miners.length - 1][currentEpoch] = 1;
            }
        }
        else{
            miner ='pending';
        }
    }
    var endTime = new Date();
    var timeDiff = Math.floor(((endTime - startTime) / 1000));
    console.log("Generated in " + timeDiff + " seconds");
    writeToFile("./addresses.json", addresses);
    writeToFile("./sum.json", sum);
    writeToFile("./miners.json", miners);
    writeToFile("./labels.json", labels);

    /*
    console.log(addresses);
    console.log(sum);
    console.log(miners);
    console.log(labels);
	*/ 

};

async function writeToFile(filename, obj)
{
	fs.writeFileSync(filename, util.inspect(obj, { maxArrayLength: null }) , 'utf-8');
}

// load web3, this assumes a running geth/parity instance
const Web3 = require('web3');
const Personal = require('web3-eth-personal');
var net = require('net');
var web3 //= new Web3();
var eth_node_url = 'http://localhost:8545'; // TODO: remote URL
//web3.setProvider(new web3.providers.HttpProvider(eth_node_url));
web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(eth_node_url));

  //var web3 = new Web3('/tmp/geth.ipc', net); // same output as with option below

const fs = require('fs');
const exec = require('child_process').execSync;

//allocateMem();
calculateDatasets();
