const _ = require('lodash');

const ENUM_USER_LEVELS = {
  DEFAULT: 2,
  GOLD: 6,
  PLATINUM: 8,
};


class ConfigurationHelper {
  constructor(taskConfiguration, userLevel) {
    this.userLevel = userLevel;
    this.taskList = taskConfiguration;
  }

  taskMatchLevel() {
    return this.taskList.tagList > ENUM_USER_LEVELS[this.userLevel];
  }

  createScheduleObject() {
    return _.keys(this.taskList)
      .map((key) => {
        const taskProps = this.taskList[key];
        return {
          schedule: taskProps.schedule,
          jobKey: key,
          tagOrder: taskProps.tagOrder,
          tagList: taskProps.tagList,
          pinnedTags: taskProps.pinnedTags,
          twitterConfig: taskProps.twitter,
        };
      });
  }
}


module.exports = ConfigurationHelper;
