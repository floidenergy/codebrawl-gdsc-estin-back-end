class ReqError extends Error{
  constructor(message, code){
    super(message);
    this.code = code;
  }
}

const FuncCapsule = (Controller) => async (req, res, next) => {
  try {
    await Controller(req, res, next);
  } catch (err) {
    next(err);
  }
}

module.exports = {ReqError, FuncCapsule};