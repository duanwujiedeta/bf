import SparkMD5 from "spark-md5";
import OSS from "ali-oss";
import {
    S3
} from "aws-sdk";
import http from "@/util/http";
import {
    Message
} from 'element-ui'
//通用工具类
export let exportBlob = content => {
    try {
        let url = window.URL.createObjectURL(new Blob([content]));
        // 生成一个a标签
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        // 生成时间戳
        link.download = "商家列表.xlsx";
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        Message.error(error.message);
    }
}
export let getFileMD5 = file => {
    return new Promise((resolve, reject) => {
        let tmp_md5;
        let blobSlice =
            File.prototype.slice ||
            File.prototype.mozSlice ||
            File.prototype.webkitSlice,
            chunkSize = 8097152, // Read in chunks of 2MB
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            fileReader = new FileReader();
        fileReader.onload = async (e) => {
            spark.append(e.target.result); // Append array buffer
            currentChunk++;
            /*let md5_progress = Math.floor(
                (currentChunk / chunks) * 100
            );
                         console.log(
                            file.name +
                            "  正在处理，请稍等," +
                            "已完成" +
                            md5_progress +
                            "%"
                        ); */
            if (currentChunk < chunks) {
                loadNext();
            } else {
                tmp_md5 = spark.end();
                resolve(tmp_md5);
                // console.log(file.name + "的MD5值是：" + tmp_md5);
            }
        };
        fileReader.onerror = function () {
            reject(false);
            // console.warn("oops, something went wrong.");
        };

        function loadNext() {
            let start = currentChunk * chunkSize,
                end =
                start + chunkSize >= file.size ?
                file.size :
                start + chunkSize;
            fileReader.readAsArrayBuffer(
                blobSlice.call(file, start, end)
            );
        }
        loadNext(tmp_md5);
    });
}
export let getAliOssConfig = (md5) => {
    return http.post("/checkUpload", {
        md5
    });
}
export let getS3Config = (md5) => {
    return http.post("/checkUpload", {
        md5
    });
}
export let saveImage = (params) => {
    return http.post("/saveImg", params);
}
export let uploadToS3 = (file, s3Config, md5) => {
    return new Promise((resolve, reject) => {
        let {
            accessKeyId,
            accessKeySecret: secretAccessKey,
            stsToken: sessionToken,
            region,
            bucket: Bucket
        } = s3Config;
        let suffix = file.name.split(".")[file.name.split(".").length - 1];
        let fileName =
            SparkMD5.hash(new Date().getTime() + file.name) + "." + suffix;
        let date = new Date();
        let filePath = "uploader/" + date.getFullYear() + "/" + parseInt(date.getMonth() + 1, 10) + "/" + date.getDate() + "/" + fileName
        let s3Param = {
            Bucket,
            Key: filePath,
            Body: file,
            ContentType: file.type,
        }
        let s3 = new S3({
            accessKeyId,
            secretAccessKey,
            sessionToken,
            region,
        });
        var upload = s3
            .upload(s3Param, {
                queueSize: 1,
                connectTimeout: 60 * 1000 * 10,
                httpOptions: {
                    timeout: 60 * 1000 * 10
                }
            })
            .on("httpUploadProgress", function (e) {
                var precent = parseInt(e.loaded, 10) / parseInt(e.total, 10);
                precent = precent.toFixed(2) * 100;
                setTimeout(function () {
                    // console.log(precent);
                }, 10);
                // console.log(e);
            });
        upload.send(function (err, data) {
            // this.$message.success(msg);
            if (err) {
                // console.log("Error:", err.code, err.message);
                reject(err);
            } else {
                // resolve(data);
                saveImage({
                    md5,
                    file_key: filePath
                }).then(saveRes => {
                    resolve({
                        url: saveRes.data.file_preview,
                        file_id: saveRes.data.file_id
                    });
                }).catch(err => {
                    reject(err);
                });
                //上传成功之后，再parseTemplate
                // console.log(data, "data");
                // that.parserTemplate();
            }
        });
    });
}
export let uploadToOSS = (file, aliOssConfig, md5) => {
    return new Promise((resolve, reject) => {
        let client = new OSS(aliOssConfig);
        let suffix = file.name.split(".")[file.name.split(".").length - 1];
        let fileName =
            SparkMD5.hash(new Date().getTime() + file.name) + "." + suffix;
        let date = new Date();
        let filePath = "uploader/" + date.getFullYear() + "/" + parseInt(date.getMonth() + 1, 10) + "/" + date.getDate() + "/" + fileName
        try {
            client.multipartUpload(filePath, file, {
                progress(percentage, checkpoint, res) { //管理进度条
                    if (percentage == 1) { //上传成功，做更新动作
                        // console.log("upload success");
                        // console.log(checkpoint);
                        // console.log(res);
                    }
                }
            }).then(data => {
                if (
                    data &&
                    data.res &&
                    data.res.status === 200 &&
                    data.res.requestUrls.length
                ) {
                    // console.log(data);
                    // console.log("上传成功", data.name, data);
                    saveImage({
                        md5,
                        file_key: filePath
                    }).then(saveRes => {
                        resolve({
                            url: saveRes.data.file_preview,
                            file_id: saveRes.data.file_id
                        });
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    reject("");
                }
                // console.log(data);
                // console.log("data");
            }).catch((fail) => {
                Message.error(fail.toString());
                reject(fail);
            });
        } catch (e) {
            // console.log("上传失败", e);
            //上传阿里云失败
            reject(e);
        }
    });
}

export let copyWord = (value) => {
    const input = document.createElement("input");
    input.setAttribute("readonly", "readonly");
    input.setAttribute("value", value);
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 9999);
    if (document.execCommand("copy")) {
        document.execCommand("copy");
        Message.success("复制成功");
    }
    document.body.removeChild(input);
}

export let deepCopy = (source, destination) => {
    if (!destination) {
        destination = source;
        if (source) {
            if (isArray(source)) {
                destination = deepCopy(source, []);
            } else if (source instanceof Date) {
                destination = new Date(source.getTime());
            } else if (isObject(source)) {
                destination = deepCopy(source, {});
            }
        }
    } else {
        if (isArray(source)) {
            while (destination.length) {
                destination.pop();
            }
            for (var i = 0; i < source.length; i++) {
                destination.push(deepCopy(source[i]));
            }
        } else {
            for (let key in destination) {
                delete destination[key];
            }
            for (var key in source) {
                destination[key] = deepCopy(source[key]);
            }
        }
    }
    return destination;
}

function isArray(value) {
    return value instanceof Array;
}

function isObject(value) {
    return value != null && typeof value == 'object';
}

export let looseEqual = (a, b) => {
    if (a === b) {
        return true
    }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            var isArrayA = Array.isArray(a);
            var isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return a.length === b.length && a.every(function (e, i) {
                    return looseEqual(e, b[i])
                })
            } else if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime()
            } else if (!isArrayA && !isArrayB) {
                var keysA = Object.keys(a);
                var keysB = Object.keys(b);
                return keysA.length === keysB.length && keysA.every(function (key) {
                    return looseEqual(a[key], b[key])
                })
            } else {
                /* istanbul ignore next */
                return false
            }
        } catch (e) {
            /* istanbul ignore next */
            return false
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
    } else {
        return false
    }
}


/**
 * 将链接请求参数转化为对象
 * @returns 
 */
function urlToJson(url = window.location.href) {
    let obj = {},
        index = url.indexOf('?'),
        params = url.substr(index + 1);
    if (index != -1) { // 有参数时
        let parr = params.split('&');
        for (let i of parr) {
            let arr = i.split('=');
            obj[arr[0]] = decodeURIComponent(arr[1]);
        }
    }
    return obj
}
export const urlToJsonFn = urlToJson

export const checkPassword = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("密码不能为空"));
    }
    setTimeout(() => {
        let numReg = /\d/g;
        let wordReg = /[a-zA-Z]/g;

        if (!numReg.test(value) || !wordReg.test(value)) {
            callback(new Error("密码格式有误，需包含数字和字母，请修改"));
        } else {
            callback();
        }
    }, 100);
}

export const checkPhone = (rule, value, callback) => {
    const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (!value) {
        return callback(new Error("电话号码不能为空"));
    }
    setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
            callback(new Error("手机号码格式有误，请修改"));
        } else {
            if (phoneReg.test(value)) {
                callback();
            } else {
                callback(new Error("手机号码格式有误，请修改"));
            }
        }
    }, 100);
};

export const checkShopName = (rule, value, callback) => {
    const nameReg = /[\W-_]+/g;
    setTimeout(() => {
        if (nameReg.test(value)) {
            callback(new Error("店铺名只能含有字母和数字"));
        } else {
            callback();
        }
    }, 100);
};

export const checkCompanyName = (rule, value, callback) => {
    const nameReg = /[^a-zA-Z0-9,.\u4e00-\u9fa5 ]/g;
    setTimeout(() => {
        if (nameReg.test(value)) {
            callback(new Error("企业名称格式有误，请修改"));
        } else {
            callback();
        }
    }, 100);
};  