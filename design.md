# Update Script and Smart Contract

1. Configure a Ethereum private net to host our wikipedia mirror
2. Create a smart contract to store and update wikipedia entrance (an IPFS Hash address)
3. Write a script to fetch and update wikipedia mirror from [Kiwix](http://wiki.kiwix.org/wiki/Content_in_all_languages) then change the entrance on previous smart contract.

# Client

A command application listening 4096 port. Users can access wikipedia by [http://127.0.0.1:4096](http://127.0.0.1:4096).

- Init
  1. Check if IPFS and geth has been installed. If not, install and configure them
  2. Create IPFS peerID and Ethereum account.
  3. Connect Ethereum private net and request some account to send ether to above Ethereum account
- Host (javascript)
  1. Call Ethereum to get account address as username (like login operation)
  2. Use account to call Ethereum to get wikipedia entrance and jump to this hash address on IPFS

