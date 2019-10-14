import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "todos",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      todoId: uuid.v1(),
      content: data.content,
      dueDays: data.dueDays,
      dueTime: data.dueTime,
      weekly: data.weekly,
      activeState: data.activeState,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false , e});
  }
}
