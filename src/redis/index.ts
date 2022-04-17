import { createClient } from 'redis';
import util from 'util'

class RedisClient {
    client = null

    constructor() {
        (async () => {
            await this.buildClient();
        })();
    }

    async buildClient() {
        try {
            this.client = createClient({
                url: 'redis://127.0.0.1:6379',
            });
            await this.client.connect();
            this.client.get = util.promisify(this.client.get)
            this.client.get = util.promisify(this.client.set)
        } catch (error) {
            console.log("error connect redis", error)
        }

    }

    getClient() {
        return this.client;
    }

    async getValueByKey(key) {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            return error.message
        }

    }

    async setValueWithKeyAndValue(key, value) {
        try {
            const stringifyValue = JSON.stringify(value)
            return await this.client.set(key, stringifyValue);
        } catch (error) {
            return error.message;
        }
    }

    async examples() {
        await this.setValueWithKeyAndValue("test", "hello");
        return await this.getValueByKey('test');
    }


}

export default new RedisClient();
