const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer Cd9zDe9LZvQ5UDfVZZElDTY+0lfW26UOZ210/QMozN4o8jXjGt9ckRCCUYFv+/bZO9paIZL7b23WA2lxS+OYknIM26TYrkUxwK2Kp8/1nXPsKwkafkX2jckSggjhC9FLzA1Hio3glJsCwIM5GdeXRQdB04t89/1O/w1cDnyilFU=`
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.LineBot = functions.https.onRequest((req, res) => {
  if (req.method === "POST"){
    reply(req.body);
  } else {
    return res.status(200).end();
  }
});

const reply = bodyResponse => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [{
        type: `text`,
        text: JSON.stringify(bodyResponse)
      }]
    })
  });
};