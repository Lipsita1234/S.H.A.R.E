require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const PORT = process.env.PORT || 3000 ;

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

// Route for the root page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/donate", (req, res) => {
  res.render("donate.ejs");
});

app.post("/donate", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("Data Recorded Successfully");
});


// Route for other pages if needed
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post('/submit-donation', (req, res) => {

  const data = req.body;
  console.log("Data From Req.Body is : ", data); 
  const FoodName = data.rawFoodType || data.cookedFoodType || data.packedFoodType ;
  const FoodAmount = data.cookedFoodAmount || data.rawFoodAmount || data.packedFoodAmount ;
  const dateOfExpiry = data.packedFoodExpiry ||  data.cookedFoodExpiry ;
  const dateOfHarvest = data.rawFoodHarvestDate ;


  const donationDetails = {
      Food : FoodName ,
      Amount : FoodAmount ,
      'Date of Expiry' : dateOfExpiry ,
      'Date of Harvest' : dateOfHarvest ,

  };
  // Save the donation details to the database or process as needed
   console.log(donationDetails);
  // Redirect to the thank you page with donation details
  res.render('thankYou.ejs', { donationDetails });
});


app.get('/volunteer', (req, res) => {
  res.render('volunteer.ejs');
});

app.get('/profile', (req, res) => {
  res.render('profile.ejs');
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
