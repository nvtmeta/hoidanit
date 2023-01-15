class BlogController {
  //[get] /blog
  index(req, res) {
    // res.render('blog')
    res.send('hello world');
  }
}
module.exports = new BlogController();
