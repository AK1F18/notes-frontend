const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  try {
    const result = await dynamo.scan({ TableName: 'NotesTable' }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch notes' })
    };
  }
};
