import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const awsRegion = process.env.AWS_REGION ?? process.env.AWS_REGION_NAME;

if (!awsRegion) {
  throw new Error("AWS region is not configured.");
}

export const dynamoClient = new DynamoDBClient({
  region: awsRegion,
});

export const dynamoDocumentClient = DynamoDBDocumentClient.from(dynamoClient);