module.exports = (err, req, res, next) => {

  console.log(err);

  if (err.code === 11000){
    err.code = 406;
    err.message = `${Object.keys(err.keyPattern).join('/ ').toUpperCase()} already exists`;
  }

  if (!err.code || typeof err.code != "number"){
    console.log('invalid err.code');
    err.code = 500
  }

  return res.status(err.code).json(err.message)
}