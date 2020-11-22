import {GlobalConfigInstance} from 'aws-sdk/lib/config';
import {AWSRegion} from 'aws-sdk/clients/cur';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';
import {appConfig} from './AppConfigManager';
import {DataMapper} from "@aws/dynamodb-data-mapper";

class AwsClientsManager {

    private readonly awsConfig:GlobalConfigInstance;
    private readonly dynamoDb:DynamoDB;
    private readonly dataMapper:DataMapper;

    constructor() {

        const region: AWSRegion = 'ap-south-1';

        const awsConfig:GlobalConfigInstance = new AWS.Config({
            region,
            credentials: {
                accessKeyId: appConfig.aws.credentials.key,
                secretAccessKey: appConfig.aws.credentials.secret
            }
        });

        this.awsConfig = awsConfig;

        // initiates the dynamo db client
        this.dynamoDb = this.setDynamoDbClient();

        this.dataMapper = this.setDataMapper();

    }

    private setDynamoDbClient(): DynamoDB {
        return new DynamoDB(this.awsConfig);
    }

    private setDataMapper(): DataMapper {
        return new DataMapper({
            client: this.getDynamoClient(),
            tableNamePrefix: "test_dev_"
        });
    }

    public getDynamoClient(): DynamoDB {
        return this.dynamoDb;
    }

    public getDataMapper(): DataMapper {
        return this.dataMapper;
    }

}

const awsClientsManager:AwsClientsManager = new AwsClientsManager();
export {awsClientsManager};
