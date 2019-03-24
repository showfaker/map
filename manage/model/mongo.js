const MongoDB = require('mongodb'), //mongoDB模块
    MongoClient = MongoDB.MongoClient,  //mongoDB连接器
    DBUrl = 'mongodb://localhost:27017',
    DBName = 'population';

/**
 * 数据库类
 * 单例模式，连接执行一次后下一次调用就直接跳过连接执行其他方法
 */
class DBClass{
    //静态方法
    static initlize(){
        if (!DBClass.instance) {
            DBClass.instance = new DBClass();
        }
        return DBClass.instance;
    }
    //构造方法
    constructor() {
        this.DBClient = '';
        this.connect(); // 初始化连接数据库
    }
    //连接数据库
    connect() {
        let me = this;
        return new Promise((resolve, reject) => {
            if (!me.DBClient) {
                MongoClient.connect(DBUrl, (err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        me.DBClient = client.db(DBName);
                        resolve(me.DBClient);
                    }
                })
            } else {
                resolve(me.DBClient);
            }
        })
    }
    //查询数据库
    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).find(json);
                result.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                })
            })
        })
    }

}

module.exports = DBClass.initlize();





