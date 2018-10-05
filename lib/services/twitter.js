const Twit = require('twit');


class TwitterClient {
  constructor(config, logger) {
    this.logger = logger;
    this.twit = new Twit({
      consumer_key: config.apiKey,
      consumer_secret: config.apiSecret,
      access_token: config.token,
      access_token_secret: config.tokenSecret,
      timeout_ms: 60 * 1000,
      strictSSL: true,
    });
  }

  retweetById(id) {
    return this.twit.post('statuses/retweet/:id', { id }).then((result) => {
      this.logger.info(result.data);
      this.logger.info(result.response);
    });
  }
}


module.exports = TwitterClient;
