const Danbooru = require('danbooru');

class DanbooruClient {
  constructor(config, logger) {
    const {
      baseUrl, user, apiKey,
    } = config;
    this.booru = new Danbooru(`https://${user}:${apiKey}@${baseUrl}`);
    this.logger = logger;
  }

  async findImage(tagString, amountToFind) {
    try {
      return await this.booru.posts({
        tags: tagString,
        limit: amountToFind,
        random: true,
      });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async findArtist(artistName) {
    try {
      return await this.booru.get('/artists', { 'search[name]': artistName });
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }
}

module.exports = DanbooruClient;
