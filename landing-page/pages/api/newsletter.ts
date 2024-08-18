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
      const formData = req.body;
      const email = formData.email as string;

      await transporter.sendMail({
        from: process.env.SMTP_USERNAME,
        to: email, 
        replyTo: email,
        subject: `Website activity from ${process.env.SMTP_USERNAME}`,
        html: `<p>Email: ${process.env.SMTP_USERNAME}</p>`,
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
