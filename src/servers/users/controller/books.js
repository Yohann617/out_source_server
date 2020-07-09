var books = {
  "getBook":async function(req, res, next){
    res.send(req.params)
  },
  "fromTo":async function(req, res, next){
    res.send(req.params)
  },
  "genus":async function(req, res, next){
    res.send(req.params)
  },
  "age":async function(req, res, next){
    res.send(req.params)
  }
}

module.exports = books;
