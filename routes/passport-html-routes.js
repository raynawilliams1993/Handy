// Requiring path to so we can use relative routes to our HTML files
var path = require("path");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../views/layouts/signup.handlebars"));
  });

  app.get("/views/layouts/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../views/layouts/login.handlebars"));
  });
 
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/api/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../views/layouts/login.handlebars"));
  });
  app.get("/api/members", isAuthenticated, function(req, res) {
    res.render("members", {message:"current members"})
  })

  app.get("/test", function (req, res) {
    res.render("index");
  });

  app.get("/city", function (req, res) {
    res.render("cityView", { message: "hi" });
  });

  app.get("/index", function (req, res) {
    res.render("index", { message: "hi" });
  });
  // cms route loads cms.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/layouts/main.handlebars"));
  });
  app.get("/login", function (req, res) {
    res.render("login", { message: "yo" });
  });
  app.get("/contact", function (rea, res) {
    res.render("contact", { message: "hi" });
  });

  app.get("/main", function(req, res) {
    // res.sendFile(path.join(__dirname, "../views/layouts/cms.html"));
    res.render("main" , {message:"hi" });
  });
  app.get("/login", function(req, res) {
    res.render("login", {message: "yo"});
  })

  app.get("/email", function(req, res) {
    const myObjToSendToFront = {
      profile: [
        {
          bizName: "Teddy",
          email: "teddy@email.com",
          phone_number: "303-555-1234",
          zipCode: "80203",
          city : "Denver"
        },
        {
          bizName: "John",
          email: "Smith",
          phone_number: "404-555-1234",
          zipCode: "90210",
          city : "Beverly Hills"
        }
      ]
    }
    res.render("cityView" , myObjToSendToFront);
  });

};