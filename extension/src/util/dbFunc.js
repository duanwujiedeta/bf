import {
    openDB,
    addData,
    getDataByKey,
    cursorGetData,
    getDataByIndex,
    cursorGetDataByIndex,
    updateDB,
    deleteDB,
    deleteDBAll,
    closeDB,
    getDataAll,
    uuid,
} from "./indexdDB";


let dbName = "luey";
let favoStoreName = "favorites";
let keyStoreNmae = "indexKey";
let storeList = [favoStoreName, keyStoreNmae];
let keyLid = "lueylid";

// indexKey db
export let keyObj = {
    getIndexKeyId: function (cb) {// 获取增长的 key
        openDB(dbName, storeList).then((db) => {
            getDataByKey(db, keyStoreNmae, this.indexMemberId).then((res) => {
                cb && cb(res || { indexKey: 1 });
            });
        });
    },
    updateIndexKey: function () {// 更新增长的 key
        openDB(dbName, storeList).then((db) => {
            //获取 indexKey
            getDataByKey(db, keyStoreNmae, keyLid).then((res) => {
                let indexKey = res && res.indexKey || 1;
                indexKey++;
                updateDB(db, keyStoreNmae, {
                    lid: keyLid,
                    indexKey: indexKey,
                }).then((res) => {
                });
            });
        });
    }
}

// favorite db
export let favoriteObj = {
    delAll: function () {
        deleteDBAll("luey");
    },
    saveToDb: function (obj) {// obj {en,cn}
        openDB(dbName, storeList).then((db) => {
            //获取 indexKey
            getDataByKey(db, keyStoreNmae, keyLid).then((res) => {
                closeDB(db);
                let indexKey = res && res.indexKey || 1;
                let oldKey = indexKey;

                openDB(dbName, storeList).then((ddb) => {// 更新 indexKey
                    indexKey++;
                    updateDB(ddb, keyStoreNmae, {
                        lid: keyLid,
                        indexKey: indexKey,
                    }).then((res) => {
                        closeDB(ddb);

                        setTimeout(() => {
                            openDB(dbName, storeList).then((sdb) => {
                                addData(sdb, favoStoreName, {// 插入新数据
                                    indexKey: oldKey,
                                    lid: uuid(),
                                    word: obj.en,
                                    tran: obj.cn
                                });
                                closeDB(sdb);
                            });
                        }, 200);

                    });
                });
            });
        });
    },
    test: function (obj) {
        openDB(dbName, storeList).then((sdb) => {
            addData(sdb, favoStoreName, {// 插入新数据
                indexKey: 123,
                lid: uuid(),
                word: obj.en,
                tran: obj.cn
            });
            closeDB(sdb);
        })
    },
    addList: function (list, val) {
        list.forEach((v, k) => {
            v.value = val;
            this.saveToDb(v);
        });
    },
    updateToDb: function (obj, myStore) {
        openDB(dbName, storeList).then((db) => {
            updateDB(db, myStore, obj).then((res) => {
            });
        });
    },
    updateList: function (list, myStore) {
        list.forEach((v, k) => {
            this.updateToDb(v, myStore);
        });
    },
    getAll(cb) {
        openDB(dbName, storeList).then((db) => {
            getDataAll(db, favoStoreName).then((res) => {
                res = res || [];
                let newList = res.sort((v1, v2) => {
                    let text1 = v1.indexKey;
                    let text2 = v2.indexKey;
                    if (text1 < text2) {
                        return -1;
                    }
                    if (text1 > text2) {
                        return 1;
                    }
                    // name 必须相等
                    return 0;
                });
                cb && cb(newList);
            });
        });
    }

}


export default {
    favoriteObj,
    keyObj
}