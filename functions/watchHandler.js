const mongoose =  require('mongoose');
const Films = require('../models/Films');
// Load db
const db = require('./server.js');

exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  const { id, watched } = JSON.parse(event.body);

  const handleWatched = async () => {
    try {
      await Films.updateOne({ "_id": id } , { $set: { "watched": watched } });

      const responseMsg = `Successfully marked as ${watched ? 'watched' : 'not watched'}`
      const response = { msg: responseMsg }

      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
        },
        body: JSON.stringify(response)
      });

    } catch (e) {
      console.log(e);
    }
  }

  handleWatched();
}