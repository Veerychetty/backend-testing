const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, phone, address, services, budget, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'veerychetty123@gmail.com',
        pass: 'tkjn glof hgrf femv',
      },
    });

    const mailOptions = {
      from: 'veerychetty123@gmail.com',
      to: 'kalaikumarwriter@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}
        Services: ${Array.isArray(services) ? services.join(', ') : services}
        Budget: ${Array.isArray(budget) ? budget.join(', ') : budget}
        Message: ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
