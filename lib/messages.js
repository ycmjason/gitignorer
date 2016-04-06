var messages = require('simple-message');

messages.load('error', {
  'options.invalid.profile': [
    0,
    'Profile not found or not given. Have you created the profile yet?'
  ],
  'options.missing.gitignore': [
    0,
    '.gitignore is not created yet. `gitignorer init` to create one.'
  ]
});

module.exports = messages;
