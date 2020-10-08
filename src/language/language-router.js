const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()
const jsonBodyParser = express.json()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .use(requireAuth)
  .get('/head', async (req, res, next) => {
    try {
      // make a query to the language table (refrenceing user.id) to get total score
      const word = await LanguageService.getCurrentWord(req.app.get('db'), req.user.id)
      // on the language table join the words table (refrencing the head)
      // return something like {nextword: '', correctguess: '', incorrectguesses: '', totalScore: ''}
      if(!word) {
        res.status(404).json({
          error: 'You don\'t have any words to study'
        })
      }
      res.status(200).json({
        nextWord: word.original,
        wordCorrectCount: word.correct_count,
        wordIncorrectCount: word.incorrect_count,
        totalScore: word.total_score
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .use(requireAuth)
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    // "nextWord": "test-next-word-from-generic-guess",
    // "wordCorrectCount": 777,
    // "wordIncorrectCount": 777,
    // "totalScore": 777,
    // "answer": "test-answer-from-generic-guess",
    // "isCorrect": true -- render correct pg or incorrect pg
    //console.log(req.language)
    if (!req.body.guess) {
      return res.status(400).json({error: "Missing 'guess' in request body"})
    }
    try {
      const words = await LanguageService.getLanguageWords(req.app.get('db'), req.language.id)
      const list = LanguageService.populateList(req.language, words)

      const node = list.head
      const isCorrect = node.value.translation.toLowerCase() === req.body.guess.toLowerCase()

      if (isCorrect) {
        list.total_score++
        list.head.value.correct_count++
        list.head.value.memory_value = node.value.memory_value * 2
      } else {
        list.head.value.incorrect_count++
        list.head.value.memory_value = 1
      }
      console.log(list.head, list.map())
      await list.moveNode(list.head.value.memory_value)
      await LanguageService.updateDB(req.app.get('db'), list)

      res.json({
        nextWord: list.head.value.original, 
        wordCorrectCount: list.head.value.correct_count,
        wordIncorrectCount: list.head.value.incorrect_count,
        totalScore: list.total_score,
        answer: node.value.translation,
        isCorrect
      })

    } catch (error) {
      next(error)
    }
  })

module.exports = languageRouter


// let { guess } = req.body
// const word = await LanguageService.getCurrentWord(req.app.get('db'), req.user.id)
// if (guess === word.translation) {
//   // increment correct count & total score & memory value doubles
//   const wordValues = {
//     'correct_count': word.correct_count + 1,
//     'memory_value': word.memory_value * 2
//   }
//   const langValue = req.language.total_score + 1
//   const updatedWordRes = await LanguageService.updateScores(req.app.get('db'), req.user.id, wordValues, langValue, req.language.head)
//   console.log(updatedWordRes)
        
// } else if (guess !== word.translation) {
//   // increment incorrect count & change memory value to 1
//   const wordValues = {
//     'incorrect_count': word.incorrect_count + 1,
//     'memory_value': 1
//   }
//   const langValue = null

//   const updatedWordRes = await LanguageService.updateScores(req.app.get('db'), req.user.id, wordValues, langValue, req.language.head)
//   updatedWordRes.language.total_score = req.language.total_score
//   console.log(updatedWordRes)
// }
      
// res.send('implement me!')