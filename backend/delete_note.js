const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const id = event.pathParameters.id;

  await dynamo.delete({
    TableName: 'NotesTable',
    Key: { id }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Note ${id} deleted` })
  };
};
