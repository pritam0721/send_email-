require("dotenv").config();

const nodemailer = require("nodemailer");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendEmailethernal = async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user, // use testAccount credentials
        pass: testAccount.pass, // use testAccount credentials
      },
    });

    let info = await transporter.sendMail({
      from: '"PRITAM GAYEN" <pritamgayen629@gmail.com>', // corrected email address
      to: "bar@example.com", // corrected email address
      subject: "Hello",
      html: "<h2>SENDING MAIL WITH NODE.JS</h2>", // html body
    });

    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
const sendEmail = async (req, res) => {
  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "Excited User <pritamgayen629@gmail.com>",
      to: ["gayenpritam920@gmail.com"],
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>",
    });
    console.log(response); // logs response data
    res.status(200).send("The mail has been delivered");
  } catch (error) {
    console.error(error); // logs any error
    res.status(500).json({ error: "Failed to send email" });
  }

};

module.exports = {
  sendEmailethernal,
  sendEmail,
};
