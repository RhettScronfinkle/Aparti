const express = require('express')
const path = require('path')
const db = require('./util/database').db
const isAuth = require('./middleware/isauth')
const Nexmo = require('nexmo')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')//creates secure unique random values
const bodyparser = require('body-parser')
const multer = require('multer')
const session = require('express-session')
const mysqlsessionstore = require('express-mysql-session')(session)
const bcrypt = require('bcryptjs')
// const mongoconnect = require('./util/database').MongoConnect
const fs = require('fs')
const fileUpload = require('express-fileupload')


    // const fileStorage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null,'documents')
    //     },
    //     filename: (req, file, cb) => {
            
        
        
        
    //         cb(null, new Date().getTime().toString )
    //     }
    // });





// const fileFilter = (req,  file, cb) => {
//     if(file.mimetype === 'doc/jpeg' || file.mimetype === 'doc/jpg' || file.mimetype === 'doc/png' || file.mimetype === 'doc/pdf')
//     {
//         cb(null, true)
//     } 
//     else
//     {
//         cb(null, false)
//     }
    
// }



mysecret = 'kpanhsispt'
app = express()

app.use(fileUpload());
app.use(bodyparser.urlencoded({extended: false}))
// app.use(multer({storage: fileStorage /*, fileFilter: fileFilter*/}).single('selfpic'))  
app.use(express.static(path.join(__dirname,'public')))


const sessionstore = new mysqlsessionstore({
    host:'localhost',
    port: 3306,
    user:'root',
    database:'node_complete',
    password:'microwis' 
})



app.use(session({secret: mysecret , resave: false, saveUninitialized: false, store: sessionstore}))














app.set('view engine','ejs')
app.set('views','views')


// // /*
// db.execute(
//     // 'INSERT INTO products (title,price,description,imageurl) VALUES(?,?,?,?)',
//     // ['Invictus','1099','Unconqerable','dfsdfdsdfs']
//     'SELECT * FROM reguser'
//     )
//     .then((result) => {
//         console.log(result)
//         console.log(result[0][0]['mobilenumber'])
//     })
//     .catch((err)=> {
//         console.log(err)
//     })


// // */

// /*



function randomnumbergenerator(){
    return Math.round(Math.random()*100000)
}
// fotp = randomnumbergenerator()
// console.log(fotp)




// console.log(ftoken)

// a=new Date().getTime()




function insertUser(doornumber,emailid,mobmumber,vlink,fotp,ts){
db.execute(
    'INSERT INTO reguser (doornumber,email,mobilenumber,validationlink, otp, otptimestamp) VALUES(?,?,?,?,?,?)',
    [doornumber,emailid,mobnumber,vlink,fotp,ts]
    
    )
    .then((result) => {
        console.log('insertion success')
        
        
    })
    .catch((err)=> {
        console.log('\n--------\n'+err)
        return
    })
}

// function lookifpresent(){    
// db.execute(
//     'SELECT otptimestamp FROM reguser where validationlink=?',
//     [ftoken]
    
//     )
//     .then((result) => {
//         if(result[0].length > 0)
//         {
//             console.log(result[0][0].otptimestamp)
//         }
//         else{
//             console.log('no records found')
//         }
        
//     })
//     .catch((err)=> {
//         console.log(err)
//     })

// }


// */






// Sending sms

const nexmo = new Nexmo({
    apiKey:'3583fa5a',
    apiSecret:'YOwdzQ3wgBdbkOGg',
},{debug:true})


// nexmo.message.sendSms(
//     '917749996142','918851727453','123',{type: 'unicode'},
//     (err,responseData) => {
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.dir(responseData)
//         }
//     }
// )





//sending email

//the function inside returns a config that nodemailer uses
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }

}))


// transporter.sendMail({
//     to:'shouviksarkar95@gmail.com',
//     from:'aparti',
//     subject:'Aparti Verification Mail',
//     html:'<h1>Verified !!</h1>'

// })
// .catch(err => {
//     console.log('Error Sending email')
// })




/*
crypto.randomBytes(32,(err,buffer) => {
    if(err){
        console.log('error in crypto')
    }
    else{
        const token = buffer.toString('hex')
        console.log(token)
    }
})
*/












// A promise os a basic javascript object that allows 
// to work us with asynchronous code



app.get('/signup',(req, res, next) => {
    res.render('regpage',{userexistingstatus: ''})
})










app.post('/signup',(req,res,next) => {
    doornumber = req.body['doornumber']
    mobnumber = req.body['mobnumber']
    emailid = req.body['emailid'] 

    mobnumberpat = new RegExp('[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
    doornumberpat = new RegExp('[1-9]-[A-Z]-[1-9]-[1-9]-[1-9][1-9][1-9]/[1-9]')
    emailpat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    c = 0
    if(!mobnumberpat.test(mobnumber)) {c+=1}
    console.log(c)
    if(!doornumberpat.test(doornumber)){c+=1}
    console.log(c) 
    if(!emailpat.test(emailid)) {c+=1}
    console.log(c)

    if (c == 0) 
    {
        
        console.log(doornumber, mobnumber, emailid)
        // res.redirect('/getotp')

            db.execute(
            // 'INSERT INTO products (title,price,description,imageurl) VALUES(?,?,?,?)',
            // ['Invictus','1099','Unconqerable','dfsdfdsdfs']
            'SELECT * FROM reguser where doornumber=? OR email=? OR mobilenumber=?',
            [doornumber,emailid,mobnumber]
            )
            .then((result) => {
                if (result[0].length == 0)
                {
                    motp = randomnumbergenerator().toString()
                    console.log(motp)
                    nexmo.message.sendSms(
                        'Aparti','91'+mobnumber,motp,{type: 'unicode'},
                        (err,responseData) => {
                            if(err){
                                console.log('error sending otp')
                            }
                            else{
                                console.log('otp sent')
                            }
                        }
                    )
                    
                    ftoken=crypto.randomBytes(32).toString('hex')
                    ts = new Date().getTime()+180000
                    insertUser(doornumber,emailid,mobnumber,ftoken,motp,ts)
                    return res.render('otp.ejs',{vlink: ftoken, otpisvalid: '', timerlapsed: ''})


                
                    
                }
                else
                {
                    existingatt = ''
                    if (doornumber === result[0][0].doornumber)
                    {   
                        existingatt = 'Door Number'
                    }
                    else if(emailid === result[0][0].email)
                    {
                        existingatt = 'Email Address'
                    }
                    else if(mobnumber === result[0][0].mobilenumber)
                    {
                        existingatt = 'Mobile Number'
                    }
                    return res.render('regpage',{userexistingstatus: 'We already have an account with that '+ existingatt})
                }

            })
            .catch((err)=> {
                console.log(err)
            })


    }
    else
    {
        res.redirect('/signup')
    }

   
    
})







app.get('/login',(req, res, next) => {
    // console.log(req.session.isLoggedIn)

    
    
    res.render('loginpage',{LoginStatus: ''})
    



    
})



app.post('/login',(req, res, next) => {
    
    
    const username = req.body.username
    const pwd = req.body.pwd

    db.execute(
        'SELECT * FROM reguser WHERE username=?',
        [username]
    )
    .then(result => {
        if(result[0].length === 0)
        {
            res.render('loginpage',{LoginStatus: 'Not registered. Sign Up.'})
        }
        else
        {
            bcrypt.compare(pwd, result[0][0].password)
            .then(doMatch => {
                if(doMatch)
                {

                   

                    console.log('Passwords matched')
                    req.session.isLoggedIn = true;
                    req.session.user = result[0][0]
                    console.log(req.session.user.doornumber)


                    db.execute(
                        'INSERT INTO tenant (doornumber) VALUES (?)',
                        [req.session.user.doornumber]
                    )
                    .then(result => {
                        console.log('created tenant') 
                    })
                    .catch(err => {
                        console.log('error creating tenant')
                    })



                    return req.session.save(err => {
                        console.log('\n-------error saving session-------')
                        console.log(err)
                        console.log('--------\n')
                        res.redirect('/editdetails')

                    })
                    
                    
                    
                    
                }
                
               
                res.render('loginpage',{LoginStatus: 'Incorrect Password. Please Try Again.'})
                
                
            })
            .catch(err => {
                console.log('error comparing database and entered passwords')
                res.render('loginpage',{LoginStatus: 'Incorrect Details. Please Try Again.'})
            })
        }
    })


})





app.post('/getotp/:vlink',(req, res, next) => {
    const vl = req.params.vlink
    console.log(vl)
    const fotp = req.body['otp']

    db.execute(
        'SELECT * FROM reguser where validationlink=?',
        [vl]
        
        )
        .then((result) => {
            if(result[0].length > 0)
            {
                dbotp = result[0][0].otp
                otpts = result[0][0].otptimestamp
                if (dbotp == parseInt(fotp))
                {
                    if(new Date().getTime() < otpts)
                    {
                        transporter.sendMail({
                            to:result[0][0].email,
                            from:'aparti',
                            subject:'Aparti Verification Mail',
                            html:"<form action ='http://localhost:3001/verifymail/" + result[0][0].validationlink
                             + "' method='POST'><button type='submit'>Verify Account</button></form>"
                            
                            // html: "<a href='https://localhost:3001/editdetails/" +result[0][0].validationlink + "'>Verify</a>"
                            
                            
                    
                            })
                            .catch(err => {
                                console.log('Error Sending email')
                            })
                            return res.render('checkmail.ejs')
                    }
                    else
                    {
                        return res.render('otp.ejs',{vlink: ftoken, otpisvalid: '', timerlapsed: 'OTP expired'})
                    }
                }
                else
                {
                    return res.render('otp.ejs',{vlink: ftoken, otpisvalid: 'Incorrect OTP', timerlapsed: ''})

                }

            }
            else
            {
                console.log('no records found')
            }
            
        })
        .catch((err)=> {
            console.log(err)
        })

})



app.post('/verifymail/:vlink', (req, res, next) => {
    const vl = req.params.vlink

        db.execute(
        'SELECT * FROM reguser where validationlink=?',
        [vl]
        
        )
        .then((result) => {
            if (result[0].length == 1)
            {    
                res.render('setpassword',{vlink: vl, matchStatus:'' })
            }
            else
            {
                res.render('incorrectlink')
            }
        })
        .catch(err => {
            console.log('erro at verifymail route')
        })

})



app.post('/setpassword/:vlink',(req, res, next) => {


db.execute(
    'SELECT * FROM reguser where username=?',
    [req.body.username]
)
.then(result => {
    if (result[0].length > 0)
    {
        return res.render('setpassword',{vlink: req.params.vlink, matchStatus:'Username is taken'})
    }    




    const vl = req.params.vlink
        db.execute(
        'SELECT * FROM reguser where validationlink=?',
        [vl]
        
        )
        .then((result) => {

            db.execute(
                'UPDATE reguser SET username=? WHERE validationlink=?',
                [req.body.username, vl]
            )
            .then(result => {

            })
            .catch(err => {
                console.log('error inserting into doornumberusername')
            })




            epwd = req.body['enterpwd']
            cpwd = req.body['cnfpwd']

            if (!(epwd === cpwd))
            {
                return res.render('setpassword',{vlink: vl, matchStatus:'Passwords do not match'})
            }

            if (result[0].length > 0)
            {
                bcrypt.hash(epwd, 12)
                .then(hashedPassword => {

                    db.execute
                    (
                        'UPDATE reguser SET password=? WHERE validationlink=?',
                        [hashedPassword,vl]
                    )
                    .then(result => {
                     
                        res.redirect('/login')
                    })
                    .catch(err => {
                        console.log('error 1 in setpassword/vlink')
                    })

                })
                .catch(err => {
                    console.log('error in setpassword bcrypt')
                })
                    
                    
                

                // res.setHeader('Set-Cookie','loggedIn=True;
                // Expires= <predefined format. If not set cookie
                // expires on closing the browser> ,
                // Domain= <>;
                // Secure;
                // HttpOnly; cannot access the cookie value onn the client side.
                // Above prevents against cross site scripting attacks
                // Max-Age=10;')
                
            }

            
        })
        .catch(err => {
            console.log('error 2 in setpassword/vlink')
        })

})



})




//res.setHeader('Set-Cookie','loggedIn=True; Max-Age=10')
//req.get('Cookie')




//isAuth is a module imported from middleware folder to check if user is logged in
// the handlers are traversed from left to right 
app.get('/editdetails', isAuth, (req, res, next) => {

    if(!req.session.isLoggedIn)
    {
        return res.render('incorrectlink')
    }

    db.execute(
        'SELECT * FROM reguser where doornumber=?  ',
        [req.session.user.doornumber]
    )
    .then(result => {
        res.render('updateprofilepage' ,{isAuthenticated: true, 
            mnumber:result[0][0].mobilenumber,
            dnumber:result[0][0].doornumber,
            email:result[0][0].email,
            username: result[0][0].username
        
        })
    })


    
})



app.post('/editdetails', isAuth, (req, res, next) => {

    var aa=0
    var bb=0
    var cc=0
    dd=ee=ff=gg=hh=ii=jj=kk=0

    
    imgname='noprofilepic.png'
    console.log('in post editdetails')
    
    if(req.body.username)
    {
        kk = 1
        db.execute
        (
            'UPDATE reguser SET username=? WHERE doornumber=?',
            [req.body.username,req.body.doornumber]
        )
        .then(result => {
            kk=0
            console.log('updated username')
        })
        .catch(err => {
            console.log('error in updating username')
        })
    }





if(req.files){
    if(req.files.selfpic)
    {
        aa=1
        file = req.files.selfpic
        imgname = new Date().getTime().toString()+file.name
        file.mv('public/' + imgname, (err) => {
            if(err)
            {
                console.log('error saving image')
            }
            else
            {
                console.log('about to store photo for dno.')
                console.log(req.body.doornumber)
                db.execute
                (
                    'UPDATE reguser SET photourl=? WHERE doornumber=?',
                    [imgname,req.body.doornumber]
                )
                .then(result => {
                    aa=0
                    console.log('fetched')

                })
                .catch(err => {
                    console.log(err )
                })
            }
        })
    }

    if(req.files.idproof)
    {
        bb=1
        idfile = req.files.idproof
        idfilename = new Date().getTime().toString()+idfile.name
        idfile.mv('public/' + idfilename, (err) => {
            if(err)
            {
                console.log('error saving image')
            }
            else
            {
                console.log('about to store photo')
                db.execute
                (
                    'UPDATE reguser SET idproof=? WHERE doornumber=?',
                    [idfilename,req.body.doornumber]
                )
                    .then(result => {
                        bb=0
                        console.log('fetched')

                    })
                    .catch(err => {
                        console.log(err )
                    })
            }
        })
    }
    if(req.files.copyofsale)
    {
        cc=1
        copyofsalefile = req.files.copyofsale
        copyofsalefilename = new Date().getTime().toString()+copyofsalefile.name


        copyofsalefile.mv('public/' + copyofsalefilename, (err) => {
            if(err)
            {
                console.log('error saving image')
            }
            else
            {
                console.log('about to store photo')
                db.execute
                (
                    'UPDATE reguser SET copyofsale=? WHERE doornumber=?',
                    [copyofsalefilename,req.body.doornumber]
                )
                    .then(result => {
                        cc=0
                        console.log('fetched')

                    })
                    .catch(err => {
                        console.log(err )
                    })
            }

        })
    }
}


    



    if (req.body.flatnumber)
    {
        dd=1
        console.log('updating flatnumber')
        db.execute
        (
            'UPDATE reguser SET flatnumber=? WHERE doornumber=?',
            [req.body.flatnumber,req.body.doornumber]
        )
        .then(result => {
            dd=0
            console.log('updated flatnumber')
        })
        .catch(err => {
            console.log('error in updating flatnumber')
        })
        

    }
    if (req.body.fathername)
    {
        ee=1
        console.log('updating fathername')
        db.execute
        (
            'UPDATE reguser SET fathername=? WHERE doornumber=?',
            [req.body.fathername,req.body.doornumber]
        )
        .then(result => {
            ee=0
        })
        .catch(err => {
            console.log('error in updating fathername')
        })
        

    }
    if (req.body.mothername)
    {
        ff=1
        console.log('updating mothername')
        db.execute
        (
            'UPDATE reguser SET mothername=? WHERE doornumber=?',
            [req.body.mothername,req.body.doornumber]
        )
        .then(result => {
            ff=0
        })
        .catch(err => {
            console.log('error in updating mothername')
        })
        

    }

    
    if(req.body.yesradio === 'on')
    {
        gg=1    
        db.execute
        (
            'UPDATE reguser SET flatoccupancy=? WHERE doornumber=?',
            ['Yes',req.body.doornumber]
        )
        .then(result => {
            gg=0
        })
        .catch(err => {
            console.log('error in updating yesradio1')
        })
    }
    else
    {
        gg=1
        db.execute
        (
            'UPDATE reguser SET flatoccupancy=? WHERE doornumber=?',
            ['No',req.body.doornumber]
        )
        .then(result => {
            gg=0    
        })
        .catch(err => {
            console.log('error in updating yesradio2 ')
        })
    }

    if(req.body.resaddress)
    {
        hh=1
        db.execute
        (
            'UPDATE reguser SET resaddress=? WHERE doornumber=?',
            [req.body.resaddress,req.body.doornumber]
        )
        .then(result => {
            hh=0

        })
        .catch(err => {
            console.log('error in updating resaddress')
        })
    }

    if(req.body.permaddress)
    {
        ii=1
        db.execute
        (
        'UPDATE reguser SET permaddress=? WHERE doornumber=?',
        [req.body.permaddress,req.body.doornumber]
        )
        .then(result => {
            ii=0
                    
        })
        .catch(err => {
            console.log('error in updating permaddress')
        })
    }
            
    

    if(req.body.occupation)
    {
        jj=1
        db.execute
        (
            'UPDATE reguser SET occupation=? WHERE doornumber=?',
            [req.body.occupation,req.body.doornumber]
        )
        .then(result => {
            jj=0

        })
        .catch(err => {
            console.log('error in updating occupation')
        })

    }


    
    // res.redirect('/viewprofile')
    aa = setTimeout(() => {
        res.redirect('/viewprofile')
            
        
        
    },1000)


    

    



    

})


app.get('/viewprofile', isAuth, (req, res, next) => {

    console.log('you are in viewprofile')
    console.log(req.session.user.doornumber)

    db.execute
    (
        'SELECT * FROM reguser where doornumber=?',
        [req.session.user.doornumber]
    )
    .then(result => {
        res.render('viewprofile',{selfimage: result[0][0].photourl, 
            isAuthenticated:true, 
            flatnumber: result[0][0].flatnumber,
            fathername:result[0][0].fathername,
            mothername: result[0][0].mothername,
            mobilenumber: result[0][0].mobilenumber,
            emailid: result[0][0].email,
            flatoccupied: result[0][0].flatoccupancy,
            resaddress: result[0][0].resaddress,
            permaddress: result[0][0].permaddress,
            occupation: result[0][0].occupation,
            username: result[0][0].username

        })
    })
    .catch(err => {
        console.log('error in viewprofile route')
    })


    
})




app.get('/iddownload', isAuth, (req, res, next) => {
    
    db.execute
    (
        'SELECT * FROM reguser where doornumber=?',
        [req.session.user.doornumber]
    )
    .then(result => {

        fs.readFile(path.join('public',result[0][0].idproof),(err, data) => {
            if(err){
                console.log('error fetching id')
                return next(err)
            }  
            res.setHeader('Content-Type','application/pdf')
            res.setHeader('Content-disposition','inline; filename=\"Shouvik_cv.pdf\"')//also inline option can be used
            res.send(data)
            
        })


    })
    .catch(err => {
        console.log('error in iddownload')
    })



    
    
})





app.get('/copyofsaledownload', isAuth, (req, res, next) => {
    
    db.execute
    (
        'SELECT * FROM reguser where doornumber=?',
        [req.session.user.doornumber]
    )
    .then(result => {

        
        fs.readFile(path.join('public',result[0][0].copyofsale),(err, data) => {
            if(err){
                console.log('error fetching copyofsale')
                return next(err)
            }  
            res.setHeader('Content-Type','application/pdf')
            res.setHeader('Content-disposition','inline; filename=\"Shouvik_cv.pdf\"')//also inline option can be used
            res.send(data)
            
        })
    })
})




app.get('/logout',(req,res, next) => {
    req.session.destroy(err => {
        console.log('\n-------error deleting session-------')
        console.log(err)
        console.log('--------\n')
        res.redirect('/')
    })
})



app.get('/flatownerslist', isAuth, (req, res, next) => {
    db.execute
    (
        'SELECT * FROM reguser'
    )
    .then(result => {
        result[0].forEach((item, index) => {
            console.log(item.doornumber)
        })
        res.render('flatownerslist', {flatowners: result[0], user:req.session.user.doornumber})
    })


})


//Dealing with tenants
app.get('/updatetenant', isAuth, (req, res, next) => {
    
    
    
        db.execute(
            'SELECT * from tenant where doornumber=?',
            [req.session.user.doornumber]
        )
        .then(result => {
            res.render('updatetenant',{isAuthenticated: true, 
                tname: result[0][0].name,
                mnumber:result[0][0].mobilenumber,
                email:result[0][0].email
            
            })
        })

    
    
})


app.post('/updatetenant', isAuth, (req, res, next) => {

    
    aa=bb=cc=dd=ee=ff=gg=hh=ii=jj=0

    if(req.files)
    {
        if(req.files.selfpic)
        {
            aa=1
            file = req.files.selfpic
            imgname = new Date().getTime().toString()+file.name
            file.mv('public/' + imgname, (err) => {
                if(err)
                {
                    console.log('error saving image')
                }
                else
                {
                    console.log('about to store photo for tenant with doornumber')
                    console.log(req.session.user.doornumber)
                    db.execute
                    (
                        'UPDATE tenant SET photourl=? WHERE doornumber=?',
                        [imgname,req.session.user.doornumber]
                    )
                    .then(result => {
                        aa=0
                        console.log('fetched')
    
                    })
                    .catch(err => {
                        console.log(err )
                    })
                }
            })
        }
    
        if(req.files.idproof)
        {
            bb=1
            idfile = req.files.idproof
            idfilename = new Date().getTime().toString()+idfile.name
            idfile.mv('public/' + idfilename, (err) => {
                if(err)
                {
                    console.log('error saving image')
                }
                else
                {
                    console.log('about to store photo')
                    db.execute
                    (
                        'UPDATE tenant SET idproof=? WHERE doornumber=?',
                        [idfilename,req.session.user.doornumber]
                    )
                        .then(result => {
                            bb=0
                            console.log('fetched')
    
                        })
                        .catch(err => {
                            console.log(err )
                        })
                }
            })
        }
        if(req.files.permaddress)
        {
            cc=1
            permaddressfile = req.files.permaddress
            permaddressfilename = new Date().getTime().toString()+permaddressfile.name
    
    
            permaddressfile.mv('public/' + permaddressfilename, (err) => {
                if(err)
                {
                    console.log('error saving image')
                }
                else
                {
                    console.log('about to store photo')
                    db.execute
                    (
                        'UPDATE tenant SET permaddress=? WHERE doornumber=?',
                        [permaddressfilename,req.session.user.doornumber]
                    )
                        .then(result => {
                            cc=0
                            console.log('fetched')
    
                        })
                        .catch(err => {
                            console.log(err )
                        })
                }
    
            })
        }
    }


    if(req.body.tenantname)
    {
        dd=1
        db.execute
        (
        'UPDATE tenant SET name=? WHERE doornumber=?',
        [req.body.tenantname,req.session.user.doornumber]
        )
        .then(result => {
            dd=0
                    // return res.redirect('/viewprofile')
        })
        .catch(err => {
            console.log('error in updating permaddress')
        })
    }
    

    if(req.body.fathername)
    {
        ee=1
        db.execute
        (
        'UPDATE tenant SET fathername=? WHERE doornumber=?',
        [req.body.fathername,req.session.user.doornumber]
        )
        .then(result => {
            ee=0
                    // return res.redirect('/viewprofile')
        })
        .catch(err => {
            console.log('error in updating permaddress')
        })
    }
    
    if(req.body.mothername)
    {
        ff=1
        db.execute
        (
        'UPDATE tenamt SET mothername=? WHERE doornumber=?',
        [req.body.mothername,req.session.user.doornumber]
        )
        .then(result => {
            ff=0
                    // return res.redirect('/viewprofile')
        })
        .catch(err => {
            console.log('error in updating permaddress')
        })
    }
    

    if(req.body.occupation)
    {
        gg=1
        db.execute
        (
        'UPDATE tenant SET occupation=? WHERE doornumber=?',
        [req.body.occupation,req.session.user.doornumber]
        )
        .then(result => {
            gg=0
                    // return res.redirect('/viewprofile')
        })
        .catch(err => {
            console.log('error in updating permaddress')
        })
    }
    

    if(req.body.mobilenumber)
    {
        hh=1
        db.execute
        (
        'UPDATE tenant SET mobilenumber=? WHERE doornumber=?',
        [req.body.mobilenumber,req.session.user.doornumber]
        )
        .then(result => {
            hh=0
                    // return res.redirect('/viewprofile')
        })
        .catch(err => {
            console.log('error in updating permaddress')
        })
    }
    
    if(req.body.emailid)
    {
        ii=1
        db.execute
        (
        'UPDATE tenant SET email=? WHERE doornumber=?',
        [req.body.emailid,req.session.user.doornumber]
        )
        .then(result => {
            ii=0
                    // return res.redirect('/viewprofile')
        })
        .catch(err => {
            console.log('error in updating permaddress')
        })
    }

    if(req.body.permaddress)
    {
        jj=1
        db.execute
        (
        'UPDATE tenant SET permaddress=? WHERE doornumber=?',
        [req.body.permaddress,req.session.user.doornumber]
        )
        .then(result => {
            jj=0
                    // return res.redirect('/viewprofile')
        })
        .catch(err => {
            console.log('error in updating permaddress')
        })
    }


    a = setTimeout(() => {
          res.redirect('/viewtenant')
            
        
        
        
    },1000)




    


})



app.get('/viewtenant', isAuth, (req, res, next) => {

    db.execute(
        'SELECT * FROM tenant where doornumber=?',
        [req.session.user.doornumber]
    )
    .then(result => {
        res.render('viewtenant', {isAuthenticated: true,
            tenantname: result[0][0].name,
            fathername: result[0][0].fathername,
            mothername: result[0][0].mothername,
            occupation: result[0][0].occupation,
            mnumber: result[0][0].mobilenumber,
            email: result[0][0].email,
            permaddress: result[0][0].permaddress,
            selfimage: result[0][0].photourl

    })


    
    
    
    
    })      




})


app.get('/tenantidproofdownload', isAuth, (req, res, next) => {
    
    db.execute
    (
        'SELECT * FROM tenant where doornumber=?',
        [req.session.user.doornumber]
    )
    .then(result => {

        fs.readFile(path.join('public',result[0][0].idproof),(err, data) => {
            if(err){
                console.log('error fetching id')
                return next(err)
            }  
            res.setHeader('Content-Type','application/pdf')
            res.setHeader('Content-disposition','inline; filename=\"Shouvik_cv.pdf\"')//also inline option can be used
            res.send(data)
            
        })


    })
    .catch(err => {
        console.log('error in iddownload')
    })



    
    
})











app.get('/',(req, res, next) => {
    
    res.render('sampleregpage')
})


    
app.listen(3001)









