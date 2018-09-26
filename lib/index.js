'use strict';

const getArrayWords = (text) => {
  return text.trim().split(/\s+/).filter(word => word !== '')
}

module.exports = (joi) => ({
  base: joi.string(),
  name: 'string',
  language: {
    maxWords: 'must have less than {{max}} words',
    minWords: 'must have at least {{min}} words',
  },
  rules: [
    {
      name: 'maxWords',
      params: {
        max: joi.number().integer().min(0).required()
      },
      validate(params, value, state, options) {
        const { max = 0 } = params || {}

        if (getArrayWords(value).length > max) {
          return this.createError('string.maxWords', { max }, state, options)
        }
        return value
      }
    },
    {
      name: 'minWords',
      params: {
        min: joi.number().integer().min(0).required()
      },
      validate(params, value, state, options) {
        const { min = 0 } = params || {}

        if (getArrayWords(value).length < min) {
          return this.createError('string.minWords', { min }, state, options)
        }
        return value
      }
    },
  ]
})