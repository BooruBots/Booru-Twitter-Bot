const BooruParser = require('../parsers/booruParser');


async function findImageAndTweet(tagString, twitterClient, danbooruClient, logger) {
  logger.info(`Fetching post with Tag String: ${tagString}`);
  const booruResult = await danbooruClient.findImage(tagString, 1);
  const booruParser = new BooruParser(booruResult[0]);
  const twitterId = booruParser.getTwitterId();
  if (twitterId == null) {
    return {
      success: false,
      err: new Error(`Could not find a twitterId for the string tag: ${tagString}`),
    };
  }

  try {
    await twitterClient.retweetById(twitterId);
  } catch (error) {
    if (error.message === 'No status found with that ID') {
      logger.warn('Could not find tweet, probably does not exist for url: ', booruParser.source);
      return findImageAndTweet(tagString, twitterClient, danbooruClient, logger);
    }
    return { err: error, success: false };
  }

  return {
    err: null,
    success: true,
  };
}


module.exports = { findImageAndTweet };
