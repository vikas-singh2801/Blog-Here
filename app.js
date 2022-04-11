//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "To post a blog/message of your's go to POST & publish your own blog/message. Hope you enjoy!";
const aboutContent = "As you might already know, blogging has been helping many people and companies over the last 10-15 years. Its true that over two decades ago, blogging hardly existed. Today, there are millions of blogs online all over the world . But, we still get agitated trying to convince people about the benefits of blogging. Even if making money online isnt a primary goal, the blog could help in many other ways. Lets look at all the bonuses bloggers get.You not only teach others when you blog. You learn as well. At first, you will learn more about your niche because you need to educate yourself to teach others. You will also learn a lot about other fields, such as online marketing, no matter what you write.The more you do something, the better you will become at that skill. Writing is no exception. Even if you dont set out to study writing, your writing will improve the more you do it. You can even invest in grammar checker tools, like Grammarly, to help you with the writing basics, punctuation, spelling, sentence structure, and style while you write.Even those of you who do not focus on written content, such as podcasters and video bloggers, will improve your writing skills through blogging. How? You will have to write descriptions for your own podcasts and videos. And you will have to interact with your blog subscribers in the comments for podcasts and videos you publish.";
const contactContent = "Drop an e-mail at riya.jha2305@gmail.com for creating your own personal blog website.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-Riya:test123@cluster1.h7l4m.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully!");
});
