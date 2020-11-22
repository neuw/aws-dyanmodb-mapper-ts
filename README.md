# aws-dynamodb-mapper-ts is a boilerplate code for integrating the AWS DynamoDB using the [mapper library](https://github.com/awslabs/dynamodb-data-mapper-js) that Awslabs provide

The code structure is mainly as below:-

```
├── playground - the root of the code base
│   ├── config - contains the configuration related classes
│   │   ├── app.config.json - the json file contains the variables like AWS key and secret 
│   │   ├── AppConfigManager.ts - variables config manager
│   │   └── AwsClientsManager.ts - manage AWS clients from single point, common point for all clients
│   ├── db
│   │   ├── mappers - Contains Mapper classes for managing the user table related actions
│   │   │   └── UserMapper.ts - The Mapper class for User table
│   │   ├── models - various models that are used within the tables
│   │   │   ├── Address.ts - Address Model
│   │   │   ├── Metadata.ts - Metadata Model
│   │   │   └── Role.ts - Role Model
│   │   └── tables - Consists of all the table's classes
│   │       └── User.ts - Classs for the User Table
│   └── Runner.ts - The Main point of initiation for running the code.
├── package-lock.json
├── package.json
├── tsconfig.json
└── tslint.json

```
