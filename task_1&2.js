const fs = require('fs')
const os = require('os')
const path = require('path');
const { promisify } = require('util')

const readInfo = async ()=>{
    let osInfo = {platform : os.platform(), arch : os.arch(), type: os.type(), 
        host: os.hostname(), user: os.userInfo()}
    let jsonFormat = JSON.stringify(osInfo)
    
    const writeFile = promisify(fs.writeFile)
    console.log(jsonFormat)

    // writing the json string to file
    await writeFile(path.join(os.homedir(),'Desktop/outputFile'),jsonFormat)
}

readInfo()

