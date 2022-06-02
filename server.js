const express = require('express')
const { generateFile } = require('./generateFile')
const { executePython } = require('./executePython')
const { executeJS } = require('./executeJS')
const { executeCpp } = require('./executeCpp')
const { executeC } = require('./executeC')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    const context = {
        prevcode: null,
        output: null,
        error: null
    }
    res.render('home', context)
})


app.post('/', async (req, res) => {
    
    const { language, code } = req.body

    if (code === undefined) {
        return res.status(400).json({ "success": false, "error": "Empty Code Body" })
    }

    const filePath = await generateFile(language, code).catch()

    if (language === 'js') {
        const output = await executeJS(filePath).catch((err) => {
            let rawErr = String(error.error)
            const errContext = {
                prevcode: code,
                output: output.error,
                error: rawErr
            }
            return res.render('home', errContext)
        })
        const context = {
            prevcode : code,
            error : null,
            output: output.stdout
        }
        res.render('home', context)
    }

    if (language === 'py') {
        const output = await executePython(filePath).catch((error) => {

            let rawErr = String(error.error)
            let toShowErr = rawErr.split(',')[1]
            console.log(toShowErr);
            console.log('Error Occoured while executing');
            const errContext = {
                prevcode: code,
                output: null,
                error: rawErr
            }
            return res.render('home', errContext)
        })
        try {
            const context = {
                prevcode: code,
                output: output.stdout,
                error: output.error
            }
            return res.render('home', context)
        }
        catch (err) { }
    }

    if (language === 'cpp') {
         const output = await executeCpp(filePath).catch((error) => {

            let rawErr = String(error.error)
            let toShowErr = rawErr.split(',')[1]
            console.log(toShowErr);
            console.log('Error Occoured while executing');
            const errContext = {
                prevcode: code,
                output: null,
                error: rawErr
            }
            return res.render('home', errContext)
        })
        try {
            const context = {
                prevcode: code,
                output: output.stdout,
                error: output.error
            }
            return res.render('home', context)
        }
        catch (err) { }
    }

    if (language === 'c') {
         const output = await executeC(filePath).catch((error) => {

            let rawErr = String(error.error)
            let toShowErr = rawErr.split(',')[1]
            console.log(toShowErr);
            console.log('Error Occoured while executing');
            const errContext = {
                prevcode: code,
                output: null,
                error: rawErr
            }
            return res.render('home', errContext)
        })
        try {
            const context = {
                prevcode: code,
                output: output.stdout,
                error: output.error
            }
            return res.render('home', context)
        }
        catch (err) { }
    }
})

app.listen(5000, () => {
    console.log("Server Started at PORT: 5000");
})
