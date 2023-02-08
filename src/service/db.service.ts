import mongoose from 'mongoose'
import config from '../config/config'

class DbService {

    public static async init() {

        try {
            mongoose.set('strictQuery', false)
            const client = await mongoose.connect(config.mongo.url, config.mongo.options as mongoose.ConnectOptions);
            
            console.log("MongoDb Connected")
        } catch (error) {
            console.log(error)
        }
    }

}

export default DbService