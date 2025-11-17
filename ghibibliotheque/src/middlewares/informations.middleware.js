export function informations(req, res, next) {
  const date = new Date().toISOString();
  const ip = req.ip ;
  const path = req.originalUrl;

  console.log(`[${date} ${ip}] ${path}`);

  next();
}

