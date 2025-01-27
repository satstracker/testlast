{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind1
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Function to fetch Bitcoin price and related data\
async function fetchBitcoinData() \{\
  try \{\
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,cad,inr,eur');\
    const data = await response.json();\
    const btcPrice = data.bitcoin;\
\
    // Update Bitcoin and Satoshi prices\
    const satoshiPrice = (btcPrice.usd / 100000000).toFixed(8); // 1 Bitcoin = 100M Satoshis\
    document.getElementById('btcUSD').textContent = `$$\{btcPrice.usd.toLocaleString()\}`;\
    document.getElementById('btcCAD').textContent = `CA$$\{btcPrice.cad.toLocaleString()\}`;\
    document.getElementById('btcINR').textContent = `\uc0\u8377 $\{btcPrice.inr.toLocaleString()\}`;\
    document.getElementById('btcEUR').textContent = `\'80$\{btcPrice.eur.toLocaleString()\}`;\
    document.getElementById('satoshiUSD').textContent = `$$\{satoshiPrice\}`;\
\
    // Fetch additional Bitcoin data (high/low, change, market state)\
    const btcDetails = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');\
    const btcData = await btcDetails.json();\
    const high = btcData.market_data.high_24h.usd;\
    const low = btcData.market_data.low_24h.usd;\
    const change = btcData.market_data.price_change_percentage_24h;\
\
    document.getElementById('btcHighLow').textContent = `High: $$\{high.toLocaleString()\}, Low: $$\{low.toLocaleString()\}`;\
    document.getElementById('btcChange').textContent = `$\{change.toFixed(2)\}%`;\
    document.getElementById('btcState').textContent = change >= 0 ? 'Bull' : 'Bear';\
  \} catch (error) \{\
    console.error('Error fetching Bitcoin data:', error);\
  \}\
\}\
\
// Function to fetch economic indicators\
async function fetchEconomicData() \{\
  try \{\
    // Example: Fetch US Repo Rate, Prime Rate, Unemployment Rate, M2SL, EURO M3\
    document.getElementById('repoRate').textContent = '0.25%';\
    document.getElementById('primeRate').textContent = '3.25%';\
    document.getElementById('unemploymentRate').textContent = '3.7%';\
    document.getElementById('m2sl').textContent = '$21.2T';\
    document.getElementById('euroM3').textContent = '\'8015.8T';\
  \} catch (error) \{\
    console.error('Error fetching economic data:', error);\
  \}\
\}\
\
// Function to fetch FED calendar data\
async function fetchFedCalendar() \{\
  try \{\
    document.getElementById('fedMeeting').textContent = 'November 1, 2023';\
    document.getElementById('fedDecision').textContent = 'Rate Hold';\
  \} catch (error) \{\
    console.error('Error fetching FED calendar:', error);\
  \}\
\}\
\
// Function to detect country automatically\
async function detectCountry() \{\
  try \{\
    const response = await fetch('https://ipapi.co/json/');\
    const data = await response.json();\
    const countrySelect = document.getElementById('countrySelect');\
    \
    // Populate the country dropdown\
    const countries = ['USA', 'Canada', 'India', 'Euro'];\
    countrySelect.innerHTML = countries.map(country => \{\
      return `<option value="$\{country\}" $\{country === data.country_name ? 'selected' : ''\}>$\{country\}</option>`;\
    \}).join('');\
\
    // Change the currency displayed based on selected country\
    countrySelect.addEventListener('change', (event) => \{\
      console.log(`Selected country: $\{event.target.value\}`);\
      // You can customize the display logic here based on country selection\
    \});\
  \} catch (error) \{\
    console.error('Error detecting country:', error);\
  \}\
\}\
\
// Initial fetch and refresh intervals\
detectCountry();\
fetchBitcoinData();\
fetchEconomicData();\
fetchFedCalendar();\
setInterval(fetchBitcoinData, 30000); // Refresh Bitcoin data every 30 seconds\
setInterval(fetchEconomicData, 300000); // Refresh economic data every 5 minutes\
setInterval(fetchFedCalendar, 86400000); // Refresh FED calendar daily\
}