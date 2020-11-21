import {awsClientsConfigurator} from "../../config/AwsCredConfigurer";
import {DataMapper} from "@aws/dynamodb-data-mapper";
import {User} from "../tables/User";
import {Role} from "../models/Role";
import {Metadata} from "../models/Metadata";
import {Address} from "../models/Address";

export class UserMapper {

    mapper: DataMapper;

    constructor() {
        this.mapper = awsClientsConfigurator.getDataMapper();
        this.checkIfTableExists();
        console.log("UserMapper Initialized!!")
    }

    private checkIfTableExists() {
        (async () => {
            await this.mapper.ensureTableExists(User, {
                readCapacityUnits: 1,
                writeCapacityUnits: 1,
            }).then(() => console.log('The table user existed or has been created!!!'))
                .catch(e => console.error('Error while checking the existence of the user table ' + e.message));
        })();
    }

    public async createUser(user:User) {
        return await this.mapper.put(user).then(r => {
            console.log("========== ENTRY DONE TO THE USER TABLE ==========");
            return r;
        }).catch(e => {
            console.error("======= ENTRY to the USER TABLE NOT SUCCESSFUL =======");
        })
    }

}

const userMapper: UserMapper = new UserMapper();

export default userMapper;
