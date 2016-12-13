module.exports = {
  'twitterAuth':{
    'key': process.env.TWITTER_KEY,
    'secret' : process.env.TWITTER_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
  }
}