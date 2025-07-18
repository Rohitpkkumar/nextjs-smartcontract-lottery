# Next.js Smart Contract Lottery (Frontend)

This is the frontend dApp for the [Hardhat Smart Contract Lottery](https://github.com/Rohitpkkumar/hardhat-smartcontract-lottery) project.  
Built using **Next.js**, **Ethers.js**, and **Tailwind CSS**, this UI allows users to interact with the decentralized lottery smart contract deployed on a blockchain testnet.

> This frontend **requires** the backend smart contract project to be deployed first.

---

##  Prerequisites

To use this frontend, first deploy the backend smart contract from:  
 [`hardhat-smartcontract-lottery`](https://github.com/Rohitpkkumar/hardhat-smartcontract-lottery)

You’ll need the deployed contract address, ABI, and Chainlink VRF & Automation.

---

## Tech Stack

- **Next.js** – React framework
- **Ethers.js** – Blockchain interaction
- **Tailwind CSS** – UI styling
- **Hardhat (backend)** – Smart contract development (used separately)

---

## Features

-  Enter the lottery using your Web3 wallet (e.g., MetaMask)
-  View entrance fee, number of players, and recent winner
-  Dynamic data updates from the blockchain using read/write calls
-  Interaction with Chainlink VRF-powered contract for verifiable randomness

---

##  Getting Started

### 1. Firstly you need to deploy the backend contract

Follow instructions in [`hardhat-smartcontract-lottery`](https://github.com/Rohitpkkumar/hardhat-smartcontract-lottery) to:

- Deploy the smart contract to a testnet (like Sepolia)
- Fund the Chainlink subscription
- Note the deployed contract address and the correct chain ID

### 2. Clone the project

```bash
git clone https://github.com/Rohitpkkumar/nextjs-smartcontract-lottery.git
cd nextjs-smartcontract-lottery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend dev server

```bash
npm run dev
```

<img width="1679" height="370" alt="nextjs-lottery" src="https://github.com/user-attachments/assets/671868b8-bfd4-47e7-a9cc-dd0fe36d60e7" />

<img width="1679" height="948" alt="connect-wallet" src="https://github.com/user-attachments/assets/402dbd0a-11ac-4dc2-97d1-fb4c6929d4f1" />

<img width="1679" height="370" alt="nextjs-smartcontract-lottery" src="https://github.com/user-attachments/assets/f63ec51b-5b0b-4bee-9853-b2baf5ef3727" />




