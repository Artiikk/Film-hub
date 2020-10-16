const mongoose =  require('mongoose');
const Films = require('../models/Films');
// Load db
const db = require('./server.js');

exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { id } = JSON.parse(event.body);

  const addFilm = async () => {
    try {
      const data = await Films.remove({ "_id": id });

      const response = { msg: "Successfully deleted"}

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