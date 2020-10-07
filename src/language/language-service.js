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

  getStartingWord(db, user_id) { //getHead
    return db
      .from('language')
      .join('word', 'language.head', '=', 'word.id')
      .select(
        'language.total_score',
        'word.original',
        'word.correct_count',
        'word.incorrect_count'
      )
      .where('language.user_id', user_id)
      .first()
  },

  getTranslation(db, user_id) {//comparing guess to words.translation
    return db
      .from('language') // cur table
      .join('word', 'language.head', '=', 'word.id') // conjoining to word table
      .select('word.translation')
      .where('language.user_id', user_id)
      .first()
  },
}

module.exports = LanguageService
