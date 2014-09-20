exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};


exports.bootstrapTemplate = function (req, res) {
  var name = req.params.name;
  name = name.replace(".html","");
  var directive = req.params.directive;
  console.log('template/' + directive + '/' + name);
  res.render('template/' + directive + '/' + name);
};