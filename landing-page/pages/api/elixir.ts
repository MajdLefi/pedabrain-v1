import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import nodemailerSmtpTransport from 'nodemailer-smtp-transport';

// Consider using secure secret management
const transporter = nodemailer.createTransport(
  nodemailerSmtpTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;

      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: process.env.RECIPIENT_EMAIL, 
        replyTo: email,
        subject: `Contact Form Submission from Dima: ${name}`,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      });

      console.log("Email sent successfully");
      return res.status(200).json({ message: "Success: email was sent" });
    } catch (error) {
      console.error("Error sending email: ", error);
      return res.status(500).json({ message: "COULD NOT SEND MESSAGE", error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
