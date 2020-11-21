import * as data from './app.config.json';
import * as packageDetails from '../../package.json';

export interface AppConfig {

    appEnv: string,
    app: App,
    aws: Aws

}

export interface App {
    name: string;
    version: string;
}

export interface Aws {

    region: string,
    credentials?: {
        key: string,
        secret: string
    }

}

export class AppConfigImpl implements AppConfig {

    public appEnv: string = "dev";
    public appName: string;
    public app: App;
    public aws: Aws;

    constructor() {
        // should be present, not blank, and not allowed null(or any case matching to null)
        console.log("LOADING THE APP CONFIG!!!")

        const env: string = process.env.APP_ENV ? process.env.APP_ENV : 'local';

        if (env.trim() !== "" && env.trim().toLowerCase() != "null") {
            this.appEnv = env;
        } else {
            this.appEnv = 'local';
        }

        this.appName = data[this.appEnv].app.name;
        this.app = {
            name: data[this.appEnv].app.name,
            version: packageDetails.version
        }
        this.aws = this.resolveAwsConfig(this.appEnv);
        //console.log('-----------'+JSON.stringify(this.aws))
        console.log("LOADED THE APP CONFIG!!!");
    }

    resolveAwsConfig(env: string) {

        /*const env: string = process.env.APP_ENV ? process.env.APP_ENV : 'local';

        const d = data[env].aws;

        return {
            region: d.region,
            credentials: {
                key: d.credentials.key,
                secret: d.credentials.secret
            }
        }*/

        const d = data[env].aws;

        if (!env.startsWith('serverless')) {
            return {
                region: d.region,
                credentials: d.credentials
            }
        } else {
            return {
                region: d.region
            }
        }
    }


}

export let appConfig: AppConfig = new AppConfigImpl();
