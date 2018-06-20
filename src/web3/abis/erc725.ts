export const ERC_725_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "getKey",
    outputs: [
      {
        name: "purposes",
        type: "uint256[]"
      },
      {
        name: "keyType",
        type: "uint256"
      },
      {
        name: "key",
        type: "bytes32"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_key",
        type: "bytes32"
      },
      {
        name: "_purpose",
        type: "uint256"
      },
      {
        name: "_keyType",
        type: "uint256"
      }
    ],
    name: "addKey",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_id",
        type: "uint256"
      },
      {
        name: "_approve",
        type: "bool"
      }
    ],
    name: "approve",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_purpose",
        type: "uint256"
      }
    ],
    name: "getKeysByPurpose",
    outputs: [
      {
        name: "keys",
        type: "bytes32[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      },
      {
        name: "_data",
        type: "bytes"
      }
    ],
    name: "execute",
    outputs: [
      {
        name: "executionId",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_key",
        type: "bytes32"
      },
      {
        name: "purpose",
        type: "uint256"
      }
    ],
    name: "keyHasPurpose",
    outputs: [
      {
        name: "exists",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "key",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "purpose",
        type: "uint256"
      },
      {
        indexed: true,
        name: "keyType",
        type: "uint256"
      }
    ],
    name: "KeyAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "key",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "purpose",
        type: "uint256"
      },
      {
        indexed: true,
        name: "keyType",
        type: "uint256"
      }
    ],
    name: "KeyRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "executionId",
        type: "uint256"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        name: "data",
        type: "bytes"
      }
    ],
    name: "ExecutionRequested",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "executionId",
        type: "uint256"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        name: "data",
        type: "bytes"
      }
    ],
    name: "Executed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "executionId",
        type: "uint256"
      },
      {
        indexed: false,
        name: "approved",
        type: "bool"
      }
    ],
    name: "Approved",
    type: "event"
  }
];
