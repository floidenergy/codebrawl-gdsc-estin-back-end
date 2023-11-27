const GetCategories = (req, res) => {
  const category = ['WEB', 'MOBILE', 'MOBILE', "AI", "BLOCKCHAIN", "DATASCIENCE"]
  res.status(200).json(category);
}

module.exports = { GetCategories };