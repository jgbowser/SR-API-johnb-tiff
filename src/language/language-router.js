const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

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
  .post('/guess', async (req, res, next) => {
    // implement me
    // posts guess && verifies(?)
    // increments page to next word

    res.send('implement me!')
  })

module.exports = languageRouter
