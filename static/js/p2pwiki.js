// init website
var ipfsHost = 'localhost', 
    ipfsAPIPort = '5001',
    ipfsWebPort = '8080', 
    ethHost = 'http://bcdodoe5l.eastasia.cloudapp.azure.com', 
    ethPort = '8545';

var ethHostEle = document.getElementById('ethURL');
var ethPortEle = document.getElementById('ethPort');
var IPFSHostEle = document.getElementById('IPFSURL');
var IPFSWebPortEle = document.getElementById('IPFSWebPort');
var IPFSAPIPortEle = document.getElementById('IPFSAPIPort');
ethHostEle.setAttribute('placeholder', ethHost);
ethPortEle.setAttribute('placeholder', ethPort);
IPFSHostEle.setAttribute('placeholder', ipfsHost);
IPFSWebPortEle.setAttribute('placeholder', ipfsAPIPort);
IPFSAPIPortEle.setAttribute('placeholder', ipfsWebPort);

// listen butten click event
document.getElementById('start-btn').addEventListener('click', startApp);

function startApp() {
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
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(ethHost + ':' + ethPort));
    if (!web3.isConnected()) {
        BootstrapDialog.alert({
            title: 'WARNING',
            message: 'Ethereum - no conection to RPC server',
            type: BootstrapDialog.TYPE_WARNING,
        });
    }  else {
        BootstrapDialog.alert('etheruem success!');
    }

    // check ipfs status
    var ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort);
    ipfs.swarm.peers(function (err, peerInfo) {
        if (err) {
            BootstrapDialog.alert({
                title: 'WARNING',
                message: err,
                type: BootstrapDialog.TYPE_WARNING,
            });
        } else if (peerInfo.length <= 0) {
            BootstrapDialog.alert({
                title: 'WARNING',
                message: 'IPFS - no peer can be found',
                type: BootstrapDialog.TYPE_WARNING,
            });
        } else {
            BootstrapDialog.alert('ipfs success!');
        }
    })
}