/**
 * 操作文件
 */


/**
 * 读取文件
 */
const fs = require('fs')
const promisify = require("util").promisify
const readFile = promisify(fs.readFile)

const getFileJson = async function (filePath){
    return await readFile(filePath, 'utf-8')
}

module.exports = {
     getFileJson,
}