const TradingView = require('./main');

const client = new TradingView.Client();
const chart = new client.Session.Chart();

// Set up Tesla stock market (NASDAQ)
chart.setMarket('NASDAQ:TSLA', {
  timeframe: 'D', // Daily timeframe to get previous day's close
});

chart.onError((...err) => {
  console.error('Chart error:', ...err);
  client.end();
});

chart.onSymbolLoaded(() => {
  console.log(`Market "${chart.infos.description}" loaded!`);
});

chart.onUpdate(() => {
  if (!chart.periods[1] || !chart.periods[0]) return;
  
  const currentPrice = chart.periods[0].close;
  const previousClose = chart.periods[1].close;
  const priceChange = currentPrice - previousClose;
  const percentageChange = (priceChange / previousClose * 100).toFixed(2);
  const time = new Date().toLocaleTimeString();
  
  console.log(`[${time}] Tesla (TSLA) Stock:
    Current Price: $${currentPrice}
    Previous Close: $${previousClose}
    Change: $${priceChange.toFixed(2)} (${percentageChange}%)`);
});

// Keep the connection alive for 30 seconds to see price updates
setTimeout(() => {
  console.log('\nClosing connection...');
  client.end();
}, 30000); 