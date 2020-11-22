import {awsClientsManager} from "../../config/AwsClientsManager";
import {DataMapper} from "@aws/dynamodb-data-mapper";
import {User} from "../tables/User";

export class UserMapper {

    mapper: DataMapper;

    constructor() {
        this.mapper = awsClientsManager.getDataMapper();
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
            console.log("========== ITEM ENTRY DONE TO THE USER TABLE ==========");
            return r;
        }).catch(e => {
            console.error("======= ITEM ENTRY to the USER TABLE NOT SUCCESSFUL =======");
            console.error(e);
        })
    }

    public async getUser(id:string) {
        let user:User = new User();
        user.id = id;
        return await this.mapper.get(user).then(r => {
            console.log("========== ITEM ENTRY FETCHED FROM THE USER TABLE ==========");
            return r;
        }).catch(e => {
            console.error("========== ITEM FETCH ISSUE ===========");
            console.debug(e);
            if (e.name === "ItemNotFoundException") {
                throw new Error('Item not found in user table with id -> '+id);
            }
        })
    }

}

const userMapper: UserMapper = new UserMapper();

export default userMapper;
