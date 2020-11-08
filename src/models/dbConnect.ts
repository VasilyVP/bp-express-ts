import mngdb from 'mongodb';

const MongoClient = mngdb.MongoClient;

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_NAME;

const options = {
    useUnifiedTopology: true
};

export default () => {
    return new Promise((resolve, reject) => {
        if (!url) throw Error('Empty MONGODB_URL');
        
        new MongoClient(url, options).connect()
            .then(client => {
                resolve({
                    client: client,
                    db: client.db(dbName)
                })
            })
            .catch(err => reject(err));
    })
}