const {v4: uuidv4} = require('uuid')
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) =>{
    const body = JSON.parse(event.body)
    const note = {
        id: uuidv4(),
        note: body.note,
        createdAt: new Date().toISOString()
    };

    await dynamo.put({
        TableName: 'NotesTable',
        Item: note
    }).promise();

    return{
        statusCode: 201,
        body: JSON.stringify(note)
    }
}
