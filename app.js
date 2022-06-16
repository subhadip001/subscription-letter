const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended : true}))

app.get("/" , (req , res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/" , (req , res) => {
    const firstName = req.body.fname 
    const lastName = req.body.lname 
    const email = req.body.email
    // console.log(firstName , lastName , email)
    // res.send("Name : " + firstName + " " +lastName + " Email : " + email)
    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/ff5d00f77c";
    const options = {
        method : "POST" ,
        auth : "subha01:c3452a84010de6f3940097077a329d9f-us14"
    }

    const request = https.request(url , options , (response) => {
        
        if(response.statusCode === 200 && (email !=="") ){
            res.sendFile(__dirname + "/success.html")
            
        }
        else{
           res.sendFile(__dirname + "/failure.html")
        }
        
        response.on("data" , (d) => {
            //(JSON.parse(d).new_members[0].email_address);
            
        })
        
    }) 
    request.write(jsonData)
    request.end();
    

})

app.post("/failure" , (req , res) => {
    res.redirect("/")
})



app.listen(process.env.PORT || 3000 , () => {
    console.log("server started at port 3000")
})

//c3452a84010de6f3940097077a329d9f-us14
// ff5d00f77c