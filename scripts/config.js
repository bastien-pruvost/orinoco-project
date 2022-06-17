let apiUrl;

// -- Automatically configure the API Url depending on whether the server is  on localhost or remote hosting --
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  apiUrl = 'http://localhost:3000';
} else {
  apiUrl = 'http://orinoco-backend.pruvostbastien.fr';
}

console.log(apiUrl);
