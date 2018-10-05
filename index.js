const config = require('config');
const bunyan = require('bunyan');
const Booru = require('./lib/services/danbooru');
const TwitterClient = require('./lib/services/twitter');
const TagToTaskScheduler = require('./lib/scheduler/scheduler');
const findImageAndTweetTask = require('./lib/tasks/findImageAndTweet').findImageAndTweet;
const ConfigurationHelper = require('./configuration');

const logger = bunyan.createLogger({
  name: 'booru-twit-bot',
  stream: process.stdout,
  level: 'info',
});

logger.info('Starting up...');
const configurationHelper = new ConfigurationHelper(config.get('tasks'));

const taskList = configurationHelper.createScheduleObject();
logger.info(`Scheduling ${taskList.length} tasks`);
taskList.map((task) => {
  const scheduler = new TagToTaskScheduler(task.tagList, task.pinnedTags,
    task.tagOrder,
    new Booru(config.get('danbooru'), logger),
    new TwitterClient(task.twitterConfig, logger),
    logger);
  scheduler.scheduleTask(findImageAndTweetTask, task.schedule);
  return scheduler;
});
