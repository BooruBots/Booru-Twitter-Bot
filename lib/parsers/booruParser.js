/* eslint-disable prefer-destructuring,max-len */
const _ = require('lodash');

class BooruParser {
  constructor(message) {
    this.artist = _.get(message, 'tag_string_artist', null);
    this.source = _.get(message, 'source', null);
    this.characters = _.get(message, 'tag_string_character', '').split(' ');
    this.copyright = _.get(message, 'tag_string_copyright', '').split(' ')[0];
  }

  getSource() {
    return this.source;
  }

  isSourceFromTwitter() {
    return /.*twitter\..*/.test(this.source);
  }

  getTwitterId() {
    if (this.isSourceFromTwitter(this.source)) {
      return _.get(/status\/(\d+)/.exec(this.source), '1', null);
    }
    return null;
  }

  getArtist() {
    return this.artist;
  }

  getCharacters() {
    return this.characters;
  }

  getCopyright() {
    return this.copyright;
  }
}

module.exports = BooruParser;

/*
{
  "name": "booru-twit-bot",
  "hostname": "NSA-Probe",
  "pid": 7058,
  "level": 30,
  "id": 3262459,
  "created_at": "2018-09-22T21:56:11.403-04:00",
  "uploader_id": 351189,
  "score": 0,
  "source": "https://twitter.com/Chanta_in_inari/status/1043472573583974401",
  "md5": "2725a767267760934d64ab065e1c77c3",
  "last_comment_bumped_at": null,
  "rating": "s",
  "image_width": 2608,
  "image_height": 4093,
  "tag_string": "1girl absurdres animal_ears bangs blonde_hair blush chanta_(ayatakaoisii) collar dog_collar fox_ears fox_tail frilled_skirt frills hand_gesture hands_up highres hips legs multiple_tails no_hat no_headwear nose open_mouth outline pose shiny shiny_hair shirt short_hair short_sleeves skirt socks solo standing standing_on_one_leg sweatdrop tabard tail thighs tongue touhou waist white_legwear white_shirt white_skirt yakumo_ran",
  "is_note_locked": false,
  "fav_count": 2,
  "file_ext": "jpg",
  "last_noted_at": null,
  "is_rating_locked": false,
  "parent_id": null,
  "has_children": false,
  "approver_id": null,
  "tag_count_general": 41,
  "tag_count_artist": 1,
  "tag_count_character": 1,
  "tag_count_copyright": 1,
  "file_size": 624090,
  "is_status_locked": false,
  "pool_string": "",
  "up_score": 0,
  "down_score": 0,
  "is_pending": false,
  "is_flagged": false,
  "is_deleted": false,
  "tag_count": 46,
  "updated_at": "2018-09-22T21:57:36.263-04:00",
  "is_banned": false,
  "pixiv_id": null,
  "last_commented_at": null,
  "has_active_children": false,
  "bit_flags": 2,
  "tag_count_meta": 2,
  "keeper_data": {
  "uid": 351189
},
  "uploader_name": "KazuyaRazuKazama",
  "has_large": true,
  "has_visible_children": false,
  "children_ids": null,
  "is_favorited": false,
  "tag_string_general": "1girl animal_ears bangs blonde_hair blush collar dog_collar fox_ears fox_tail frilled_skirt frills hand_gesture hands_up hips legs multiple_tails no_hat no_headwear nose open_mouth outline pose shiny shiny_hair shirt short_hair short_sleeves skirt socks solo standing standing_on_one_leg sweatdrop tabard tail thighs tongue waist white_legwear white_shirt white_skirt",
  "tag_string_character": "yakumo_ran",
  "tag_string_copyright": "touhou",
  "tag_string_artist": "chanta_(ayatakaoisii)",
  "tag_string_meta": "absurdres highres",
  "file_url": "https://danbooru.donmai.us/data/2725a767267760934d64ab065e1c77c3.jpg",
  "large_file_url": "https://danbooru.donmai.us/data/sample/sample-2725a767267760934d64ab065e1c77c3.jpg",
  "preview_file_url": "https://danbooru.donmai.us/data/preview/2725a767267760934d64ab065e1c77c3.jpg",
  "msg": "",
  "time": "2018-09-23T02:22:09.407Z",
  "v": 0
} */
