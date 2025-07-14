const API_KEY = '9OycaN2iYnPy6WIndhqMJzDObaVWpO3B';
const API_SECRET = 'OcizWgUZlCMYvy4V';

let accessToken = null;

export async function getAccessToken() {
  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
  });

  const data = await response.json();
  accessToken = data.access_token;
  return accessToken;
}

export async function searchFlights({ origin, destination, date }) {
  if (!accessToken) {
    await getAccessToken();
  }

  const query = `originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&currencyCode=USD&max=5`;

  const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data.data || [];
}
