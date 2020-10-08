
const { LinkedList } = require('../LinkedList')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getCurrentWord(db, user_id) {
    return db
      .from('language')
      .join('word', 'language.head', '=', 'word.id')
      .select(
        'language.total_score',
        'word.original',
        'word.correct_count',
        'word.incorrect_count',
        'word.translation',
        'word.memory_value',
      )
      .where('language.user_id', user_id)
      .first()
  },

  populateList(language, words) {
    const list = new LinkedList(language.total_score, language.name, language.id)
    let word = words.find(word => word.id === language.head)
    list.insertFirst(word)
    while (word.next) {
      word = words.find(w => w.id === word.next)
      list.insert(word)
    }
    return list
  },

  updateDB(db, list) {
    return db.transaction(async trx => {

      await trx('language')
        .where('id', list.id)
        .update({
          total_score: list.total_score,
          head: list.head.value.id
        })

      const wordList = list.map()
      await Promise.all(wordList.map(word => trx('word')
        .where('id', word.value.id)
        .update({
          correct_count: word.value.correct_count,
          incorrect_count: word.value.incorrect_count,
          memory_value: word.value.memory_value,
          next: word.next ? word.next.value.id : null
        })))
    })
  }
}

module.exports = LanguageService
