const mongoose =  require('mongoose');
const Films = require('../models/Films');
// Load db
const db = require('./server.js');

exports.handler = function(event, context, callback) {
context.callbackWaitsForEmptyEventLoop = false;
  const { title, watched, year } = JSON.parse(event.body);

  const addFilm = async () => {
    try {
      const currentFeedback = { title, watched, year };
      const data = await Films.create(currentFeedback);

      const response = { msg: "Successfully added", data }

      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: JSON.stringify(response)
      });

    } catch (e) {
      console.log(e);
    }
  }

  addFilm();
}