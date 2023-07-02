import { ethers } from 'ethers'; // required
import { contractABI, contractAddress } from '../constants/contractLib'; // required

let eth;
if (typeof window !== 'undefined') {
  eth = window.ethereum;
}

// Example: connecting to the smart contract using ethers
// via contract address and abi
const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

// working with the contract, in this case to send ETH coin to the blockchain
export const sendDeposit = async (receiver_slug, amount) => {
  // console.log(amount);
  try {
    // checks if the user has an ethereum wallet installed in the browser
    if (!eth) return alert('Please install an ethereum wallet');

    // calling the get contract function
    const transactionContract = await getEthereumContract();

    // CALLING THE DEPOSIT FUNCTION POF THE CONTRACT,
    // AND PASSING GASLIMIT AS ARGUMENTS 
    const transactionHash = await transactionContract.deposit(
      receiver_slug,
      etherAmount,
      {
        gasLimit: '0x7EF40',
        value: etherAmount,
      }
    );

    // waits for the transaction to be mined and returns a response(hash)
    await transactionHash.wait();

    return transactionHash;
  } catch (error) {
    return error;
  }
};


export const getUserAccount = async (receiver_slug) => {
  try {
    if (!eth) return alert('Please install an ethereum wallet');

    const transactionContract = await getEthereumContract();

    // IN A CALL FUNCTION, YOU DON'T NEED TO ADD GASLIMIT OPTION
    // By call functions, they are functions that just fetches data and
    // doesn't modify anything in the blockchain
    const transactionHash = await transactionContract.getUserAccount(
      receiver_slug
    );

    return transactionHash.toString();
  } catch (error) {
    console.log(error);
  }
};
