const fs = require('fs')
const path = require('path')
// uuid to create unique file name
const { v4 : uuid } = require('uuid')

const dirCodes = path.join(__dirname, "code")

// Creates the directory "code" if it does not exists
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, {recursive : true})
}

// function that generates file 
const generateFile = async (format, content) => {

    const jobId = uuid()
    // file name is created by uuid and identified as jobId
    // formt is language i.e. .py for python
    const fileName = `${jobId}.${format}`
    const filePath = path.join(dirCodes, fileName)
    
    // writes the contents i.e. code of user onto the file
    await fs.writeFileSync(filePath, content)

    return filePath
}

module.exports = {
    generateFile
}