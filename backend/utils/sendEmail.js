const nodeMailer=require('nodemailer')

const sendEmail=async(subject,message,send_to,send_from,reply_to)=>{
    const transporter=nodeMailer.createTransport({
        service: 'gmail',
    auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
    debug: false,
    logger: true 
    })
    const options={
        from:send_from,
        to:send_to,
        replyTo:reply_to,
        subject:subject,
        html:message
    }
    //send Email
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}
module.exports=sendEmail