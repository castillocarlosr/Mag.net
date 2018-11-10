# Project => Mag.net

## Authors

* Nicholas Crain [NJcrain](https://github.com/NJcrain)
* Carlos Castillo [castillocarlosr](https://github.com/castillocarlosr)
* Charles Clemens [CClemensJr](https://github.com/CClemensJr)
* Hiwot Nega [Manaye](https://github.com/Manaye)

## Description 

    Mag.Net is a fun way to leave messages for your friends.

## Overall problem domain
    The project team wanted to exapand on a previous project that had included placing digital refrigerator magnets on a digital refrigerator and arranging them how the user saw fit.  The new problem was to create a server-side database so the user can access the refrigerator from any mobile device.  The new version also needed more than prearraged letter.  This is where using meme and full word API's came into use.

## Version
    2.0.0 

## Frameworks and Libraries
    * Node.js
    * jQuery
    * jQuery UI (https://api.jqueryui.com/category/interactions/) - Used for draggable and droppable magnet interactions.
    * jQuery UI Touch Punch (http://touchpunch.furf.com/) - Used for touch functionality on mobile devices.
    * EJS (Embedded JavaScript templating).

## Database Schemas
    * Table for users and associated email for login
    * Table for magnets position coordinates
    * Table for magnet types
    * Seperate sql for alpabet letters

## API endpoints and example
    * Meme API from https://api.imgflip.com/
    Example Success Response:
{
    "success": true,
    "data": {
        "memes": [
            {
                "id": "61579",
                "name": "One Does Not Simply",
                "url": "http://i.imgflip.com/1bij.jpg",
                "width": 568,
                "height": 335
            },
            {
                "id": "101470",
                "name": "Ancient Aliens",
                "url": "http://i.imgflip.com/26am.jpg",
                "width": 500,
                "height": 437
            }
            // probably a lot more memes here..
        ]
    }
}
   
    * Word API from https://developer.wordnik.com/
    Example {
        "canonicalForm": "string",
        "id": 0,
        "originalWord": "string",
        "suggestions": [
         "string"
        ],
        "vulgar": "string",
        "word": "string"
        }

## Instructions for other users
    For other users wanting to see the application in action, head over to the functional website by cliking on the following url.  
    https://hn-nj-cc-cc-mag.herokuapp.com/

    If users want to build this app on their own local machines the users must take the following steps.
    1. Clone/fork the repo onto their own machine.
    2. Install all necessary dependencies using 'npm install' from terminal or equivalent.
      a.  Dependencies include cors, dotenv, ejs, express, pg, & superagent.
    3. Run sql database on local machine.  (ie. psql) 
    4. Create a new database.
    5. Create new tables for users, alphabets, words, and meme's. 
        a. You can simply copy what's in the sql files, paste into terminal and click return.
    6. Enjoy.
    * NOTE:  random words uses a private API and you would need to acquire your own API.  (free with registration as of Nov. 08, 2018)    

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
* The application is a mobile first (currently mobile only) game.  Languages uses is html, css, javascript with JQuery, AJAX, EJS, and postgres database.
* The application is a fun game that allows registered user to arrange a community fridge for other resigstered to see.  The frigde updates the server every 10 seconds so other users can see in "semi"-real time what other users are writing with magnets on the fridge.  The possible combinations are vast.

## Change Log
11-02-2018 4pm - Project developement and Repository was created.
               - Worked on and uploaded whiteboards.
               - Set up starting files.
11-05-2018 9am - Installed dependencies and merged github master to heroku.
               - Worked on coding.
11-08-2018 2pm - Have functional application with few bugs and basic styling.
11-09-2018 12pm - Application if fully-functional on the server with approved stying, interface, and features.

## Credits and Collaborations
Thank you to Team StarFish Fragrant the Album for creating the foundation for this application:
* **Caity Heath** - [CaityHeath](https://github.com/CaityHeath)
* **Kevin Rosales** - [Kevinrosales](https://github.com/Kevinrosales)
* **Raymond Ruazol** - [rpruazol](https://github.com/rpruazol)
