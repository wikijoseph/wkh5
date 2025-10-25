// 前50币种数据（按市值排序）
export const cryptoCurrencies = [
  { symbol: 'BTC', name: 'Bitcoin', logo: '🟠' },
  { symbol: 'ETH', name: 'Ethereum', logo: '🔷' },
  { symbol: 'USDT', name: 'Tether', logo: '🟢' },
  { symbol: 'BNB', name: 'BNB', logo: '🟡' },
  { symbol: 'SOL', name: 'Solana', logo: '🟣' },
  { symbol: 'USDC', name: 'USD Coin', logo: '🔵' },
  { symbol: 'XRP', name: 'XRP', logo: '🔴' },
  { symbol: 'ADA', name: 'Cardano', logo: '🔵' },
  { symbol: 'AVAX', name: 'Avalanche', logo: '🔴' },
  { symbol: 'DOGE', name: 'Dogecoin', logo: '🐕' },
  { symbol: 'TRX', name: 'TRON', logo: '🔴' },
  { symbol: 'LINK', name: 'Chainlink', logo: '🔗' },
  { symbol: 'DOT', name: 'Polkadot', logo: '🟡' },
  { symbol: 'MATIC', name: 'Polygon', logo: '🟣' },
  { symbol: 'SHIB', name: 'Shiba Inu', logo: '🐕' },
  { symbol: 'DAI', name: 'Dai', logo: '🟢' },
  { symbol: 'LTC', name: 'Litecoin', logo: '⚡' },
  { symbol: 'BCH', name: 'Bitcoin Cash', logo: '🟠' },
  { symbol: 'UNI', name: 'Uniswap', logo: '🦄' },
  { symbol: 'ATOM', name: 'Cosmos', logo: '🌌' },
  { symbol: 'XLM', name: 'Stellar', logo: '⭐' },
  { symbol: 'ETC', name: 'Ethereum Classic', logo: '🔷' },
  { symbol: 'FIL', name: 'Filecoin', logo: '📁' },
  { symbol: 'HBAR', name: 'Hedera', logo: '🟢' },
  { symbol: 'VET', name: 'VeChain', logo: '🔷' },
  { symbol: 'ICP', name: 'Internet Computer', logo: '🌐' },
  { symbol: 'APT', name: 'Aptos', logo: '🟡' },
  { symbol: 'QNT', name: 'Quant', logo: '🔢' },
  { symbol: 'NEAR', name: 'NEAR Protocol', logo: '🌙' },
  { symbol: 'ALGO', name: 'Algorand', logo: '🔷' },
  { symbol: 'FTM', name: 'Fantom', logo: '👻' },
  { symbol: 'MANA', name: 'Decentraland', logo: '🌍' },
  { symbol: 'SAND', name: 'The Sandbox', logo: '🏖️' },
  { symbol: 'AXS', name: 'Axie Infinity', logo: '🎮' },
  { symbol: 'THETA', name: 'Theta Network', logo: 'Θ' },
  { symbol: 'FLOW', name: 'Flow', logo: '🌊' },
  { symbol: 'EGLD', name: 'MultiversX', logo: '🌌' },
  { symbol: 'XTZ', name: 'Tezos', logo: '🔷' },
  { symbol: 'AAVE', name: 'Aave', logo: '👻' },
  { symbol: 'MKR', name: 'Maker', logo: '🏭' },
  { symbol: 'SNX', name: 'Synthetix', logo: '⚡' },
  { symbol: 'COMP', name: 'Compound', logo: '🏦' },
  { symbol: 'YFI', name: 'yearn.finance', logo: '💰' },
  { symbol: 'SUSHI', name: 'SushiSwap', logo: '🍣' },
  { symbol: 'CRV', name: 'Curve DAO Token', logo: '📈' },
  { symbol: '1INCH', name: '1inch', logo: '📏' },
  { symbol: 'BAT', name: 'Basic Attention Token', logo: '🦇' },
  { symbol: 'ZRX', name: '0x Protocol', logo: '0️⃣' },
  { symbol: 'ENJ', name: 'Enjin Coin', logo: '💎' },
  { symbol: 'CHZ', name: 'Chiliz', logo: '⚽' }
]

export const getCryptoBySymbol = (symbol) => {
  return cryptoCurrencies.find(crypto => crypto.symbol === symbol) || cryptoCurrencies[0]
}

export const getRandomCrypto = () => {
  return cryptoCurrencies[Math.floor(Math.random() * cryptoCurrencies.length)]
}
