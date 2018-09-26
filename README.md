# joi-words-extension

Joi extensions for words.

# Install

```js
npm install @palmabit/joi-words-extension
```

# Usage

Usage is a two steps process. First, a schema is constructed using the provided types and constraints:

```js
const BaseJoi = require('joi');
const Extension = require('@palmabit/joi-words-extension');
const Joi = BaseJoi.extend(Extension);

const schema = Joi.string().minWords(100).maxWords(500);
```