import userMapper from "./db/mappers/UserMapper";
import {User} from "./db/tables/User";
import {Role} from "./db/models/Role";
import {Address} from "./db/models/Address";
import {Metadata} from "./db/models/Metadata";
import * as faker from 'faker';

class Runner {

    public testUserMapper() {
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
    }

}

let runner:Runner = new Runner();

runner.testUserMapper();
