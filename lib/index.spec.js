'use strict';

const BaseJoi = require('joi');
const Extension = require('../');
const Joi = BaseJoi.extend(Extension);

describe('Joi Words Validation ', () => {

  test('should pass maxWords validation undefined', (done) => {

    const schema = Joi.string().maxWords(5);

    schema.validate(undefined, (err, value) => {
      expect(err).toBeFalsy();
      done();
    });
  });

  test('should pass validation correct number of max words', (done) => {

    const schema = Joi.string().maxWords(5);
    const text = 'Hello world!'
    schema.validate(text, (err, value) => {
      expect(err).toBeFalsy();
      expect(value).toEqual(text)
      done();
    });
  });

  test('should NOT pass validation max words exceeded', (done) => {

    const schema = Joi.string().maxWords(5);

    schema.validate('Hello world Hello world Hello world Hello world', (err, value) => {
      expect(err).toBeTruthy();
      done();
    });
  });

  test('should pass validation correct number of min words', (done) => {

    const schema = Joi.string().minWords(5);
    const text = 'Hello world, Hello world, Hello world!'
    schema.validate(text, (err, value) => {
      expect(err).toBeFalsy();
      expect(value).toEqual(text)
      done();
    });
  });

  test('should NOT pass validation min words', (done) => {

    const schema = Joi.string().minWords(3);

    schema.validate('Hello     world   ', (err, value) => {
      expect(err).toBeTruthy();
      done();
    });
  });

  test('should pass validation both min and max words', (done) => {

    const schema = Joi.string().minWords(3).maxWords(10);

    schema.validate('Hello world Hello world', (err, value) => {
      expect(err).toBeFalsy();
      done();
    });
  });

  test('minWords must be an integer', () => {
    try {
      Joi.string().minWords(3.8)
    } catch (error) {
      expect(error.details[0].message).toEqual('"min" must be an integer')
      return
    }
    throw '"min" must be an integer'
  })

  test('minWords must be must be larger than or equal to 0', () => {
    try {
      Joi.string().minWords(-3)
    } catch (error) {
      expect(error.details[0].message).toEqual('"min" must be larger than or equal to 0')
      return
    }
    throw '"min" must be larger than or equal to 0'
  })

  test('maxWords must be an integer', () => {
    try {
      Joi.string().maxWords(3.8)
    } catch (error) {
      expect(error.details[0].message).toEqual('"max" must be an integer')
      return
    }
    throw '"max" must be an integer'
  })

  test('maxWords must be must be larger than or equal to 0', () => {
    try {
      Joi.string().maxWords(-3)
    } catch (error) {
      expect(error.details[0].message).toEqual('"max" must be larger than or equal to 0')
      return
    }
    throw '"max" must be larger than or equal to 0'
  })

});