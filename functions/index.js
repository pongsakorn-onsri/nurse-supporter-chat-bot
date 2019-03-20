const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer <LINE_CHANNEL_ACCESS_TOKEN>`
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