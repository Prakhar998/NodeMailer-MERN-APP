const express=require('express')
const bodyParser=require('body-parser')
const nodeMailer=require('nodemailer')
const dotenv=require('dotenv')
const cors=require('cors')
const sendEmail = require('./utils/sendEmail')

const app=express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hi')
})
app.post('/api/sendmail',async(req,res)=>{
    const {email}=req.body
    try {
        const send_to=email
        const send_from=process.env.EMAIL_USER
        const reply_to=email
        const subject="Thank you message"
        const message=`
            <h3>Hello Tutor</h3>
            <p>Thank you for maths tution</p>
            <p>Regards.....</p>
        `
        await sendEmail(message,subject,send_to,send_from,reply_to)
        res.status(200).json({success:true,message:'Email sent'})
    } catch (e) {
        res.status(500).json(e.message)
    }
})
const PORT=process.env.PORT||5000

app.listen(PORT,()=>console.log(`server start at ${PORT}...`))