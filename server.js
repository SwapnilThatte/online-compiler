const express = require('express')

const { generateFile } = require('./generateFile')

const { executePython } = require('./executePython')
const { executeJS } = require('./executeJS')
const { executeCpp } = require('./executeCpp')
const { executeC } = require('./executeC')

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

// GET REQUESTS
app.get('/', (req, res) => {
    const context = {
        prevcode: null,
        output: null,
        error: null
    }
    res.render('home', context)
})

app.get('/about', (req, res) => {
    return res.render('about')
})



// POST REQUESTS

// '/' this endpoint is for compiler
// '/about' this endpint is for about section

app.post('/', async (req, res) => {

    const { language, code } = req.body

    if (code === undefined) {
        return res.status(400).json({ "success": false, "error": "Empty Code Body" })
    }

    const filePath = await generateFile(language, code).catch()


    if (language === 'js') {
        // Executing JS files 
        const output = await executeJS(filePath).catch((error) => {
            // If any occours in code exection following block of code is executed
            let rawErr = error.stderr
            const errContext = {
                prevcode: code,
                output: null,
                // Converting JSON object into JSON string
                error: JSON.stringify(rawErr)
            }
            return res.render('home', errContext)
        })
        // If file execution is successful 
        try {
            const context = {
                prevcode: code,
                // Converting JSON object into JSON string
                output: JSON.stringify(output.stdout),
                error: output.error
            }
            return res.render('home', context)
        }
        catch (err) { }
    }

    if (language === 'py') {
        // Executing Python files 
        const output = await executePython(filePath).catch(error => {
        // If any occours in code exection following block of code is executed
            let rawErr = error.stderr
            const errContext = {
                prevcode: code,
                output: null,
                // Converting JSON object to JSON string
                error: JSON.stringify(rawErr)
            }
            return res.render('home', errContext)
        })
        // If file execution is successful
        try {
            const context = {
                prevcode: code,
                // Converting JSON object into JSON string
                output: JSON.stringify(output.stdout),
                error: output.error
            }
            return res.render('home', context)
        }
        catch (err) { }
    }

    if (language === 'cpp') {
         // Executing C++ files 
        const output = await executeCpp(filePath).catch((error) => {
        // If any occours in code exection following block of code is executed
            let rawErr = error.stderr
            const errContext = {
                prevcode: code,
                output: null,
                // Converting JSON object to JSON string
                error: JSON.stringify(rawErr)
            }
            return res.render('home', errContext)
        })
        // If execution of file is successful
        try {
            const context = {
                prevcode: code,
                output: JSON.stringify(output.stdout),
                error: output.error
            }
            return res.render('home', context)
        }
        catch (err) { }
    }

    if (language === 'c') {
        // Executing C files
         const output = await executeC(filePath).catch((error) => {
        // If any occours in code exection following block of code is executed
            let rawErr = error.stderr
            const errContext = {
                prevcode: code,
                output: null,
                // Converting JSON object into JSON string
                error: JSON.stringify(rawErr)
            }
            return res.render('home', errContext)
        })
        // If execution of file is successful
        try {
            const context = {
                prevcode: code,
                // Converting JSON object into JSON string
                output: JSON.stringify(output.stdout),
                error: output.error
            }
            return res.render('home', context)
        }
        catch (err) { }
    }
})

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
})