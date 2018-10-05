const { CronJob } = require('cron');
const _ = require('lodash');

class TagToTaskScheduler {
  constructor(tagList, pinnedTags, tagOrder, danbooruClient, twitterClient, logger) {
    this.danbooru = danbooruClient;
    this.logger = logger;
    this.twitter = twitterClient;
    this.tagList = tagList;
    this.pinnedTags = pinnedTags.join(' ');
    this.tagOrder = _.includes(['random', 'ordered'], tagOrder) ? tagOrder : 'random';
    this.tagCursor = 0;
    this.task = null;
  }

  scheduleTask(task, cronString) {
    this.task = new CronJob(cronString, this.prepareTaskWithTags(task));
    this.task.start();
  }

  prepareTaskWithTags(task) {
    return () => task(this.createTagString(), this.twitter,
      this.danbooru, this.logger)
      .then((message) => {
        this.logger.info(message);
      });
  }


  createTagString() {
    let resultTagString = '';
    if (this.tagOrder === 'random') {
      resultTagString += this.tagList[_.random(this.tagList.length - 1)];
    } else {
      resultTagString += this.tagList[this.tagCursor];
      this.incrementTagCursor();
    }

    return `${resultTagString} ${this.pinnedTags}`;
  }

  incrementTagCursor() {
    if (this.tagCursor + 1 === this.taglist) {
      this.tagCursor = 0;
      return;
    }
    this.tagCursor += 1;
  }
}

module.exports = TagToTaskScheduler;
