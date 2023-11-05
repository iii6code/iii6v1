import "../public/app.scss";
import { ethers } from "ethers";
const abi = {
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "int256",
          name: "errorCode",
          type: "int256",
        },
      ],
      name: "ActorError",
      type: "error",
    },
    {
      inputs: [],
      name: "ActorNotFound",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "epoch",
          type: "uint256",
        },
      ],
      name: "DealEpochAlreadyExists",
      type: "error",
    },
    {
      inputs: [],
      name: "FailToCallActor",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      name: "InvalidCodec",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidResponseLength",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "NotEnoughBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "reason",
          type: "string",
        },
      ],
      name: "PubAlreadyExists",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "reason",
          type: "string",
        },
      ],
      name: "PubDoesNotExist",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "dealId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "string",
          name: "pub",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "cid",
          type: "string",
        },
      ],
      name: "DealAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "pub",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "PubCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PUB_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "pub",
          type: "string",
        },
        {
          components: [
            {
              internalType: "uint64",
              name: "id",
              type: "uint64",
            },
            {
              internalType: "string",
              name: "selectorPath",
              type: "string",
            },
            {
              internalType: "string",
              name: "cid",
              type: "string",
            },
          ],
          internalType: "struct BasinStorage.DealInfo[]",
          name: "deals",
          type: "tuple[]",
        },
      ],
      name: "addDeals",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "pub",
          type: "string",
        },
      ],
      name: "createPub",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealActivation",
      outputs: [
        {
          internalType: "int64",
          name: "",
          type: "int64",
        },
        {
          internalType: "int64",
          name: "",
          type: "int64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealClient",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealClientCollateral",
      outputs: [
        {
          components: [
            {
              internalType: "bytes",
              name: "val",
              type: "bytes",
            },
            {
              internalType: "bool",
              name: "neg",
              type: "bool",
            },
          ],
          internalType: "struct CommonTypes.BigInt",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealLabel",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealProvider",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealProviderCollateral",
      outputs: [
        {
          components: [
            {
              internalType: "bytes",
              name: "val",
              type: "bytes",
            },
            {
              internalType: "bool",
              name: "neg",
              type: "bool",
            },
          ],
          internalType: "struct CommonTypes.BigInt",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealTerm",
      outputs: [
        {
          internalType: "int64",
          name: "",
          type: "int64",
        },
        {
          internalType: "int64",
          name: "",
          type: "int64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealTotalPrice",
      outputs: [
        {
          components: [
            {
              internalType: "bytes",
              name: "val",
              type: "bytes",
            },
            {
              internalType: "bool",
              name: "neg",
              type: "bool",
            },
          ],
          internalType: "struct CommonTypes.BigInt",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "dealID",
          type: "uint64",
        },
      ],
      name: "dealVerified",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "pub",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "n",
          type: "uint256",
        },
      ],
      name: "latestNDeals",
      outputs: [
        {
          components: [
            {
              internalType: "uint64",
              name: "id",
              type: "uint64",
            },
            {
              internalType: "string",
              name: "selectorPath",
              type: "string",
            },
            {
              internalType: "string",
              name: "cid",
              type: "string",
            },
          ],
          internalType: "struct BasinStorage.DealInfo[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "pub",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "offset",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "limit",
          type: "uint256",
        },
      ],
      name: "paginatedDeals",
      outputs: [
        {
          components: [
            {
              internalType: "uint64",
              name: "id",
              type: "uint64",
            },
            {
              internalType: "string",
              name: "selectorPath",
              type: "string",
            },
            {
              internalType: "string",
              name: "cid",
              type: "string",
            },
          ],
          internalType: "struct BasinStorage.DealInfo[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "pubsOfOwner",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
const getDataInRange = async (fromDate, toDate) => {
  const provider = new ethers.getDefaultProvider("https://api.calibration.node.glif.io/rpc/v1");
  const contractInstance = new ethers.Contract("0xd0ee658f1203302e35B9B9E3A73CB3472A2C2373", abi, provider);
  const allPubs = await contractInstance.pubsOfOwner("0x64251043A35ab5D11f04111B8BdF7C03BE9cF0e7");
  console.log(allPubs);
  const filtered = allPubs.filter((pub) => {
    const isInNamespace = pub.includes("wxm2");
    if (!isInNamespace) {
      return false;
    }

    // The publication name format is wxm2.date_2023_10_15 and we want only the date part
    const pubDate = pub.substring(10);
    const pubTs = Math.round(parse(pubDate, "yyyy_MM_dd", new Date()).getTime() / 1000);
    console.log(pubTs);
    return pubTs >= fromDate && pubTs <= toDate;
  });

  const cids = await Promise.all(
    filtered.map(async (pub) => {
      const deals = await contractInstance.latestNDeals(pub, 1);

      return deals[0][2];
    })
  );

  return cids;
};

const getAccuWeather = async () => {
  const response = await fetch("https://dataservice.accuweather.com/forecasts/v1/daily/1day/1?apikey=hNGMkdtqDKpawDLBedDDBqMPEXuxhyFz");
  const movies = await response.json();
  console.log(movies);
};
const getData = (e) => {
  // console.log(Math.floor(Date.now() / 1000));
  getAccuWeather();
};
const obtn = document.getElementById("oracle_btn");
obtn.addEventListener("click", getData);
