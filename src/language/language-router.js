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
    if (!req.body.guess) {
      return res.status(400).json({error: "Missing 'guess' in request body"})
    }
    try {
      const words = await LanguageService.getLanguageWords(req.app.get('db'), req.language.id) //can moce into poplist argument
      console.log('GET LANGUAGE WORDS', words)
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
      list.moveNode(list.head.value.memory_value)
      
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
