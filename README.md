# aws-dynamodb-mapper-ts is a boilerplate code for integrating the AWS DynamoDB using the mapper library that Awslabs provide

The code structure is mainly as below:-

dynamodb-mapper-ts
├── playground
│   ├── config
│   │   ├── app.config.json
│   │   ├── AppConfigManager.ts
│   │   └── AwsCredConfigurer.ts
│   ├── db
│   │   ├── mappers
│   │   │   └── UserMapper.ts
│   │   ├── models
│   │   │   ├── Address.ts
│   │   │   ├── Metadata.ts
│   │   │   └── Role.ts
│   │   └── tables
│   │       └── User.ts
│   └── Runner.ts
├── package-lock.json
├── package.json
├── tsconfig.json
└── tslint.json
