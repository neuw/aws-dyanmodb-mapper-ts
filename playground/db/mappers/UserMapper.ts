import {awsClientsManager} from "../../config/AwsClientsManager";
import {DataMapper} from "@aws/dynamodb-data-mapper";
import {User} from "../tables/User";
import * as faker from 'faker';

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

    public async createTableIfNotExists() {
        return await this.mapper.ensureTableExists(User, {
            readCapacityUnits: 1,
            writeCapacityUnits: 1
        }).then(() => {
            console.log("TABLE USER CREATED SUCCESSFULLY!");
        }).catch(e => {
            console.log("ISSUE WHILE CREATING THE USER TABLE!!");
            console.error(e);
            throw new Error("ISSUE WHILE CREATING THE USER TABLE!!");
        })
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

    public async deleteUser(id:string) {
        let user:User = new User();
        user.id = id;
        return await this.mapper.delete(user).then(r => {
            console.log("========== ITEM ENTRY DELETED FROM THE USER TABLE ==========");
            return r;
        }).catch(e => {
            console.error("========== ITEM DELETION ISSUE ===========");
            console.debug(e);
        })
    }

    public async updateUser(id:string) {
        let user:User = new User();
        user.id = id;
        let fetchedUser:void|User = await this.mapper.get(user).then(r => {
            console.log("========== ITEM ENTRY FETCHED FROM THE USER TABLE ==========");
            console.log("==== PREVIOUS STATE OF THE USER IS ====");
            console.log(JSON.stringify(r));
            console.log("==== PREVIOUS STATE OF THE USER IS ====");
            return r;
        }).catch(e => {
            console.error("========== ITEM DELETION ISSUE ===========");
            console.debug(e);
            if (e.name === "ItemNotFoundException") {
                throw new Error('Item not found in user table with id -> '+id);
            }
        });

        if (typeof fetchedUser === 'object' && fetchedUser.hasOwnProperty('id')) {
            fetchedUser.email = faker.internet.email();
            return this.mapper.update(fetchedUser).then(r => {
                console.log("USER UPDATE SUCCESSFUL!");
                //console.debug(JSON.stringify(r));
                return r;
            }).catch(e => {
                console.error("UNABLE TO UPDATE THE USER");
                console.debug(e);
                throw new Error('Error while updating the USER');
            })
        } else {
            throw new Error("Error while updating the USER with id - "+id);
        }
    }

}

const userMapper: UserMapper = new UserMapper();

export default userMapper;
