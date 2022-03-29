exports.getAllCompanies = (req, res, next) => {
  console.log(company.name);
  User.find()
  .then(company =>{
      res.status(200).json({
          company: company
  });

          // content: req.userId }]
  });
};

exports.getCompany = (req, res, next) => {
  console.log(req.params.id, "16");
  company.findById(req.params.id)
  .then(company =>{
      console.log(company, "19");
      res.status(200).json({
          company: company._id
  });

          // content: req.userId }]
  });
};

exports.postCompany = (req, res, next) => {
  res.status(200).json({
      posts: [{ title: 'company', content: 'This is the company endpoint' }]
  });
};

exports.putCompany = (req, res, next) => {
  res.status(200).json({
      posts: [{ title: 'company', content: 'This is the company endpoint' }]
  });
};

exports.deleteCompany = (req, res, next) => {
  res.status(200).json({
      posts: [{ title: 'company', content: 'This is the company endpoint' }]
  });
};