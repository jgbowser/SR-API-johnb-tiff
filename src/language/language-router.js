const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
// const { _Node, LinkedList } = require('../LinkedList')

const languageRouter = express.Router()

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
      const word = await LanguageService.getStartingWord(req.app.get('db'), req.user.id)
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
  .post('/guess', async (req, res, next) => {
    // "nextWord": "test-next-word-from-generic-guess",
    // "wordCorrectCount": 777,
    // "wordIncorrectCount": 777,
    // "totalScore": 777,
    // "answer": "test-answer-from-generic-guess",
    // "isCorrect": true -- render correct pg or incorrect pg
    if (!req.body) {
      return res.status(400).json({error: "Missing 'guess' in request body"})
    }
    try {
      let { guess } = req.body
      const translation = await LanguageService.getTranslation
      if (guess === translation) {
        // increment correct count & total score & memory value doubles
      }
      // increment incorrect count & change memory value to 1
    res.send('implement me!')
    } catch (error) {
      next(error)
    }
  })

module.exports = languageRouter
