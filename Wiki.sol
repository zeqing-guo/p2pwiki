pragma solidity ^0.4.3;
contract Wiki {
    address public owner;
    mapping(string => string) name2hash;
    
    function Wiki() {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function updateHash(string _name, string _hash) onlyOwner {
        name2hash[_name] = _hash;
    }
    
    function getHash(string _name) constant returns (string) {
        return name2hash[_name];
    }
}