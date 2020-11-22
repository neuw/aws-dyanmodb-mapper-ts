import userMapper from "./db/mappers/UserMapper";
import {User} from "./db/tables/User";
import {Role} from "./db/models/Role";
import {Address} from "./db/models/Address";
import {Metadata} from "./db/models/Metadata";
import * as faker from 'faker';
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

class Runner {

    public testUserMapper() {
        const argv = yargs(hideBin(process.argv))
            .string('user-id') // user-id mapping to yargs
            .boolean('create-table') // create-table function mapping to yargs
            .boolean('create') // create item/entry function mapping to yargs
            .boolean('get') // get item/entry function mapping to yargs
            .boolean('delete') // delete item/entry function mapping to yargs
            .boolean('update') // update item/entry function mapping to yargs
            .argv;

        if (argv["create-table"]) {
            userMapper.createTableIfNotExists().then(() => {
                console.log("TABLE CREATED SUCCESSFULLY!");
            });
            return;
        } else if (argv.create) {
            // create a fake user using faker
            const user: User = new User();

            const role: Role = new Role();
            role.name = faker.random.arrayElement(["ADMIN", "GUEST"]);

            user.role = role;
            user.email = faker.internet.email();

            const address: Address = new Address();
            address.pin = faker.address.zipCode();
            address.city = faker.address.city();
            address.state = faker.address.state();
            address.value = faker.address.streetAddress();
            address.country = faker.address.country();

            const metadata: Metadata = new Metadata();
            metadata.name = faker.name.findName();
            metadata.addresses = [address];

            user.metadata = metadata;

            userMapper.createUser(user).then((r:User) => {
                console.log("saved user's id is --> "+JSON.stringify(r.id));
            });
        } else if (argv.get && argv['user-id']) {
            console.log("user-id is -> "+argv['user-id']);
            const userId:string = argv['user-id'];
            userMapper.getUser(userId).then(r => {
                console.log("======= USER FOUND AND DETAILS ARE =======");
                console.log(JSON.stringify(r));
                console.log("======= USER FOUND AND DETAILS ARE =======");
            }).catch(e => {
                console.error("======= USER FETCH NOT SUCCESSFUL =======");
            })
            return;
        } else if (argv.delete && argv['user-id']) {
            console.log("user-id is -> "+argv['user-id']);
            const userId:string = argv['user-id'];
            userMapper.deleteUser(userId).then(r => {
                console.log("======= USER DELETED AND DETAILS ARE =======");
                console.log(JSON.stringify(r));
                console.log("======= USER DELETED AND DETAILS ARE =======");
            }).catch(e => {
                console.error("======= USER DELETION NOT SUCCESSFUL =======");
            })
            return;
        } else if (argv.update && argv['user-id']) {
            console.log("user-id is -> "+argv['user-id']);
            const userId:string = argv['user-id'];
            userMapper.updateUser(userId).then(r => {
                console.log("======= USER UPDATED AND DETAILS ARE =======");
                console.log(JSON.stringify(r));
                console.log("======= USER UPDATED AND DETAILS ARE =======");
            }).catch(e => {
                console.error("======= USER UPDATION NOT SUCCESSFUL =======");
            })
            return;
        } else {
            throw new Error('action for arguments not recognized');
        }

    }

}

let runner:Runner = new Runner();

runner.testUserMapper();
