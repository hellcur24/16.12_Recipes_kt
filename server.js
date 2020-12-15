require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');


const app = express();



app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));






app.get('/recipe',(req, res)=>{
    //.env
    //recipes[0].extendedIngredients[0].name
            //SECRET=cde3a0ff083343929ecca14981210330
            let urlName =`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SECRET}`;
            
            axios.get(urlName)
          .then(function(response){
            let recipesArr;
            let recipesIng;
            recipesArr = response.data.recipes[0];
            recipesIng = response.data.recipes[0].extendedIngredients;
              //console.log(recipesArr.analyzedInstructions[0].steps[0].ingredients); 
             
              
              res.render('recipes', {rec: recipesArr, ing: recipesIng});
           /* recipesArr = response.data.recipes[0].title;
            recipesJmg = response.data.recipes[0].image;
            recipesIngredients = response.data.recipes[0].analyzedInstructions[0].steps[0].ingredients;*/

        })
          .catch(function(error){
              console.log(error);
          });
           
        } 
);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
