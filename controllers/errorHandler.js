module.exports = (err, req, res, next) => {

  if (err.code === 11000)
    return res.status(406).json({ message: "key already exists" })

  if (!err.code || typeof err.code != "number"){
    console.log('invalid err.code');
    err.code = 500
  }

  console.log(err);

  return res.status(err.code).json(err.message)
}