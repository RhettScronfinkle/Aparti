const express = require('express')
app = express()

const router = express.Router()



router.get('/', (req, res, next) => {
    res.render('../views/updatetenant')
})




module.exports = router