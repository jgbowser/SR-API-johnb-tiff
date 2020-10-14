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
The POST command on '/user' accepts a  name, username, and password.  
```json
{
    "name": "Jane Doe",
    "username": "JaneD@example.com",
    "password": "password123!"
}
```
Successful POST's return a `200 OK` response and assign a user_id.  

### '/auth'
The '/auth' endpoint validates user login allows user access via an auth token.  
The POST command on '/auth' accepts a username and password.  
```json
{
    "username": "JaneD@example.com",
    "password": "password123!"
}
```
Successful POST's return a `200 OK` response and assign a jwt-token.  

The PUT command on '/auth' accepts a username and password and updates the jwt-token on each login or every three hours.  

### '/language'
The '/language' USE endpoint validates user's auth token and responds with user's language data from database, which in turn gives access to the word data.  
```json
{
        "language.id,"
        "language.name,"
        "language.user_id,"
        "language.head,"
        "language.total_score,"
      
}
```
Successful USE's return a `200 OK` response.  

The '/language' GET endpoint responds with data from word table.  
```json
{
        "id,"
        "language_id,"
        "original,"
        "translation,"
        "next,"
        "memory_value,"
        "correct_count,"
        "incorrect_count,"
}
```
Successful GET's return a `200 OK` response.  

The '/language/head' GET endpoint uses the auth token and responds with nextWord, wordCorrectCount, wordIncorrectCount, and totalScore.  
```json
{
        "nextWord: word.original,"
        "wordCorrectCount: word.correct_count,"
        "wordIncorrectCount: word.incorrect_count,"
        "totalScore: word.total_score"
}
```
Successful GET's return a `200 OK` response.  

The '/language/guess' POST endpoint uses the auth token, updates the database and responds with nextWord, wordCorrectCount, wordIncorrectCount, totalScore, answer, and isCorrect.  
```json
{
        "nextWord": "abuela",
        "wordCorrectCount": "grandmother",
        "wordIncorrectCount": "0",
        "totalScore": "1",
        "answer": "grandmother",
        "isCorrect": true
}
```
Successful GET's return a `200 OK` response.  

### Tech Stack:  
Back End: Express, JavaScript, PostgreSQL, Heroku, Mocha & Chai
