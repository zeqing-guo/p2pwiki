// init website
var ipfsHost = '127.0.0.1', 
    ipfsAPIPort = '5001',
    ipfsWebPort = '8080', 
    ethHost = 'http://ethnetcfj.southcentralus.cloudapp.azure.com', 
    ethPort = '8545';

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethHost + ':' + ethPort));
var gobtn = document.getElementById('go2wiki');
var ethHostEle = document.getElementById('ethURL');
var ethPortEle = document.getElementById('ethPort');
var IPFSHostEle = document.getElementById('IPFSURL');
var IPFSWebPortEle = document.getElementById('IPFSWebPort');
var IPFSAPIPortEle = document.getElementById('IPFSAPIPort');
ethHostEle.setAttribute('placeholder', ethHost);
ethPortEle.setAttribute('placeholder', ethPort);
IPFSHostEle.setAttribute('placeholder', ipfsHost);
IPFSWebPortEle.setAttribute('placeholder', ipfsWebPort);
IPFSAPIPortEle.setAttribute('placeholder', ipfsAPIPort);

// listen butten click event
document.getElementById('start-btn').addEventListener('click', startApp);

function startApp() {
    var popup = document.getElementById('modal-body');
    // init variables
    if (IPFSHostEle.value !== '') {
        ipfsHost = IPFSHostEle.value;
    }
    if (IPFSAPIPort.value !== '') {
        ipfsAPIPort = IPFSAPIPort.value;
    }
    if (IPFSWebPortEle.value !== '') {
        ipfsWebPort = IPFSWebPortEle.value;
    }
    if (ethHostEle.value !== '') {
        ethHost = ethHostEle.value;
    }
    if (ethPortEle.value !== '') {
        ethPort = ethPortEle.value;
    }

    // check ethereum net status
    if (!web3.isConnected()) {
        popup.innerHTML += '<div class="alert alert-warning"> Ethereum - no conection to RPC server </div>';
        return;
    }

    // check if ethereum account unlocked
    if (web3.eth.accounts.length <= 0) {
        popup.innerHTML += '<div class="alert alert-warning"> Ethereum - No account in coinbase </div>';
        return;
    } 
    // console.log('account unlock success');

    // check ipfs status
    var ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort);
    ipfs.swarm.peers(function (err, peerInfo) {
        if (err) {
            popup.innerHTML += '<div class="alert alert-warning"> IPFS - cannot connect ' + ipfsHost + ':' + ipfsAPIPort + '</div>';
        } else if (peerInfo.length <= 0) {
            popup.innerHTML += '<div class="alert alert-warning"> IPFS - no peer can be found </div>';
        } else {
            // BootstrapDialog.alert('ipfs success!');
        }
    });

    // check if Ethereum account is unlock
    var account = web3.eth.accounts[0];
    try {
        var signResult = web3.eth.sign(account, "0x10");
    } catch(err) {
        popup.innerHTML += '<div class="alert alert-warning">Ethereum - Account ' + account + ' need to be unlock</div>';
        return;
    }
    gobtn.removeAttribute('disabled');
    gobtn.addEventListener('click', go);
}

function go() {
    // call ethereum to get wiki entrance
    const abi = [{
        "constant": false,
        "inputs": [{ "name": "_name", "type": "string" }, { "name": "_hash", "type": "string" }],
        "name": "updateHash",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "_name", "type": "string" }],
        "name": "getHash",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{ "name": "", "type": "address" }],
        "payable": false, "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "type": "constructor"
    }];
    var contractAddress = "0x6724ab8b53b1c0acedbb3cf2ada02bee13b0d94d";
    var contract = web3.eth.contract(abi).at(contractAddress);
    var webHash = contract.getHash(document.getElementById('sel1').value);
    window.location.replace('http://' + ipfsHost + ':' + ipfsWebPort + '/ipfs/' + webHash);
}