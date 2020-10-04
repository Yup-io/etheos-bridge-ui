export const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42
}

export const TOKENS_BY_NETWORK = {
  [Networks.MainNet]: [
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18
    }
  ],
  [Networks.Rinkeby]: [
    {
      address: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
      symbol: 'DAI',
      name: 'Dai',
      decimals: 18
    }
  ],
  [Networks.Ropsten]: [
    {
      address: '0xc2118d4d90b274016cB7a54c03EF52E6c537D957',
      symbol: 'DAI',
      name: 'Dai',
      decimals: 18
    }
  ]
}
