# Spaced Repetition: Spanish SRS
### by [John Bowser](https://github.com/jgbowser) and [Tiffany Summerford](https://github.com/breakfastatiffs)   
[Spanish SRS](https://language-spaced-repetition.vercel.app/register) ||
[Client GitHub](https://github.com/thinkful-ei-quail/SR-Client-johnb-tiff) ||
[Server GitHub](https://github.com/thinkful-ei-quail/SR-API-johnb-tiff)  
 
### About:  
Spaced repetition is an advanced learning technique that enhances ones learning through an algorithm based upon repetition. The learner is quizzed on a sequence of words and when the learner answers incorrectly, they will see the word within a shorter time period versus if they answer correctly, they will see the word in a longer time period. With the number of Spanish speakers on the rise and halloween right around the corner, Spanish SRS was built with amusement and utility in mind.  

** API's base url: https://murmuring-shelf-10969.herokuapp.com/ **

### '/user'
The '/user' endpoint is designed to create new user account and collect a Token for a registered user.  
The POST command, '/user' accepts a  name, username, and password. 
```json
{
    "name": "Jane Doe",
    "username": "JaneD@example.com",
    "password": "password123!"
}
```
Successful POST's return a `200 OK` response and assign a user_id.

### '/auth'

### '/language'

### Tech Stack:  
Back End: Express, JavaScript, PostgreSQL, Heroku, Mocha & Chai
