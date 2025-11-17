/* eslint-disable eol-last */
export function checkId(req, res, next) {
  const id = Number(req.params.id);

  if(isNaN(id) || id <= 0) {
    return res.status(400).send('ID requis');
  }
  next();
};