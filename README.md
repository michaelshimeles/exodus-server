# Meet Exodus (Server) 🧠

Exodus is an NFT analytics platform that allows NFT traders to track, trade and analyze. All in one platform.

The thesis behind this project is "Data is good, Insights are Better, Actionable Insight is the Best" 

## 👾 Tech Stack

**Server:** Node, Express, Axios

## 🎯 Features

- Search for any NFTs on the Ethereum Blockchain
- Live Sales & Listings Data for each NFT collection
- Momentum Indicator for each NFT collection
- Tracking all new NFT collections as they launch 
- Portfolio Breakdown
- Trader Grade & Wallet Analysis


## 🏃 Run Locally

Clone the project

```bash
git clone git@github.com:michaelshimeles/Exodus-Server.git
```

Go to the project directory

```bash
  cd Exodus-Server
```

Install dependencies

```bash
  npm install
```
Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Server:

`PORT`

`RESEVOIR_API_KEY`

`MODULE_API_KEY`

`FIVE_API_KEY`

`ETH_SALES_API_KEY`

`TRANSPOSE_API`

`NFT_PORT_API`

`NFT_GO_API`

## API Reference

Various API providers to power the server with the data it needs

- Resevoir.tools (https://reservoir.tools/)
- ModuleNFT.xyz (https://modulenft.xyz/)
- NFTGO (https://developer.nftgo.io/)
- Mnemonic (https://www.mnemonichq.com/)
- NFTPORT (https://www.nftport.xyz/) 
- Transpose (https://www.transpose.io/)

## Screenshots

### Homepage:
![Homepage](https://user-images.githubusercontent.com/69605071/207727873-c7ece8d2-354b-4593-829d-5ff4ebdd73f9.png)

### Terminal:
![Terminal Page](https://user-images.githubusercontent.com/69605071/207727880-4eef6076-eb6b-402d-be4d-3973556499b3.png)

### Terminal (More):
![Terminal Page (More)](https://user-images.githubusercontent.com/69605071/207727868-66f8e88b-d8a7-46cf-a5fc-f07fd06b607a.png)

### Hot Mints:
![Hot Mints Page](https://user-images.githubusercontent.com/69605071/207727877-f10c0771-7310-46f3-8ae0-358a5f73beae.png)

### Portfolio:
![Portfolio Page](https://user-images.githubusercontent.com/69605071/207727878-948b4396-0a83-43d4-849d-ce782f1b6468.png)
## Lessons Learned

When building Exodus, the thesis behind this project was to present as much actionable data to the end user to make sound and educated decisions.

The lessons I've learned are as follows:

- Planning is just as important as development (at least if you want a smooth dev experience)
- Always assuming requests will fail and planning what to do when the request fails 
- Managing various 3rd party apis and filtering good information
