const TradingView = require('./main');

const client = new TradingView.Client();
const chart = new client.Session.Chart();

// Set up Bitcoin/USDC market to match TradingView website
chart.setMarket('BINANCE:BTCUSDC', {
  timeframe: '1', // 1 minute timeframe
});

chart.onError((...err) => {
  console.error('Chart error:', ...err);
  client.end();
});

chart.onSymbolLoaded(() => {
  console.log(`Market "${chart.infos.description}" loaded!`);
});

chart.onUpdate(() => {
  if (!chart.periods[0]) return;
  console.log(`Bitcoin Price: $${chart.periods[0].close} USD`);
});

// Keep the connection alive for 30 seconds to see price updates
setTimeout(() => {
  console.log('\nClosing connection...');
  client.end();
}, 30000); 