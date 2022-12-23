exports.get = async (req, res, next) => {
  try {
    return res.render("layout/index", {
      pageTitle: "About",
      template: "about",
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};
// git init 
// code by shivam