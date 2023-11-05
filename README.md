# Anodex

## Client
In the App.jsx part, we are using ***ZkClientProvider*** to ***Auth*** the user and generates a ***ShieldedAddress***.

To install the different packages needed to run the app, run : 

### `npm install --force`
The --force tag is required because the SDK and dependencies used are unstable for the moment.   

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

This part of Work uses ZKBob SDK and uses the work of this repo: [Alice-s-Deposit]([https://pages.github.com/](https://github.com/Alice-s-Deposit)https://github.com/Alice-s-Deposit)

## Server
To run the server run:

### `node server.js`

Changes the parameters and the swap will work for you.
Currently it is a swap of 1 Matic to ETH on polygon.
Put your public and private key.

Open [http://localhost:3001](http://localhost:3001) to view the server it in the browser.

To see the quote of 1 Matic to ETH, open, [http://localhost:3001/quote](http://localhost:3001/quote)

To swap, open [http://localhost:3001/swap](http://localhost:3001/swap). If the swap is successfull, the TxHash will be displayed. You can verify it on polygon scan.

## BOS
The ***Anodex.jsx*** is the swap part of the app hosted on NEAR and decentralizes all the process of the swap.
It calls both server api that you setup earlier in server/server.js

https://github.com/Shimadakunn/Anodex/assets/89693356/0f0a9c9e-be7d-40c9-8ba8-76e43250ba6e

