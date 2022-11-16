const allowedCors = [
  'https://localhost:3000',
  'https://localhost:3002',
  // 'https://domainname.ryabovdima.nomoredomains.icu',
  'https://domainname.ryabov1994.nomoredomains.icu',
];

const cors = (req, res, next) => {
  const { origin } = req.header;
  const { method } = req;
  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = cors;
