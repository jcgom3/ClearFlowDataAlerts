import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const awsRegion = process.env.AWS_REGION ?? process.env.AWS_REGION_NAME;

if (!awsRegion) {
  throw new Error("AWS_REGION is not configured in server/.env");
}

export const dynamoClient = new DynamoDBClient({
  region: awsRegion,
});

export const dynamoDocumentClient = DynamoDBDocumentClient.from(dynamoClient);