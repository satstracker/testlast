const apiBaseURL = "https://api.coingecko.com/api/v3";
const countrySelector = document.getElementById('country');
const prices = {
    'usd': document.getElementById('price-usd'),
    'cad': document.getElementById('price-cad'),
    'inr': document.getElementById('price-inr'),
    'eur': document.getElementById('price-eur'),
    'satoshi': document.getElementById('satoshi-usd'),
    'highLow': document.getElementById('high-low'),
    'change': document.getElementById('change'),
    'marketState': document.getElementById('market-state')
};
const economicIndicators = {
    'repoRate': document.getElementById('repo-rate'),
    'primeRate': document.getElementById('prime-rate'),
    'unemploymentRate': document.getElementById('unemployment-rate'),
    'usMoneySupply': document.getElementById('us-money-supply'),
    'euroMoneySupply': document.getElementById('euro-money-supply')
};
const fedCalendar = document.getElementById('fed-meeting');

function fetchBitcoinPrices() {
    fetch(`${apiBaseURL}/simple/price?ids=bitcoin&vs_currencies=usd,cad,inr,eur`)
        .then(response => response.json())
        .then(data => {
            prices['usd'].innerText = data.bitcoin.usd;
            prices['cad'].innerText = data.bitcoin.cad;
            prices['inr'].innerText = data.bitcoin.inr;
            prices['eur'].innerText = data.bitcoin.eur;
        })
        .catch(error => console.log('Error fetching Bitcoin prices:', error));

    fetch(`${apiBaseURL}/coins/bitcoin`)
        .then(response => response.json())
        .then(data => {
            const satoshiPrice = 1 / data.market_data.current_price.usd;
            prices['satoshi'].innerText = satoshiPrice.toFixed(8);
            prices['highLow'].innerText = `High: ${data.market_data.high_24h.usd} / Low: ${data.market_data.low_24h.usd}`;
            prices['change'].innerText = `${data.market_data.price_change_percentage_24h.toFixed(2)}%`;
            prices['marketState'].innerText = data.market_data.price_change_percentage_24h >= 0 ? 'Bullish' : 'Bearish';
        })
        .catch(error => console.log('Error fetching Satoshi and market data:', error));
}

function fetchEconomicData() {
    // These endpoints would need a key from FRED API
    // For the purpose of demonstration, I’ll use placeholders here.
    fetch("https://api.example.com/repo-rate")
        .then(response => response.json())
        .then(data => {
            economicIndicators['repoRate'].innerText = data.value;
        })
        .catch(error => console.log('Error fetching repo rate:', error));

    // Add other economic indicators as needed, e.g., prime rate, unemployment, etc.
}

function fetchFEDCalendar() {
    fetch("https://api.example.com/fed-calendar")
        .then(response => response.json())
        .then(data => {
            fedCalendar.innerText = data.next_meeting;
        })
        .catch(error => console.log('Error fetching FED calendar:', error));
}

// Initial Fetch
fetchBitcoinPrices();
fetchEconomicData();
fetchFEDCalendar();

// Auto Refresh Bitcoin Price every 30 seconds
setInterval(fetchBitcoinPrices, 30000);

// Auto Refresh Economic Data every 5 minutes
setInterval(fetchEconomicData, 300000);
