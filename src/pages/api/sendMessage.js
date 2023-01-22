import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function sendMessage(req, res) {

    const client = twilio(process.env.ACCOUNTSID, process.env.SMSAUTHTOKEN);
    const { phone, message } = req.body;

    console.log('phone :>>', phone, 'message :>>', message);

    client.messages
        .create({
            body: message,
            messagingServiceSid: process.env.MESSAGESERVICEID,
            to: phone,
        })
        .then((message) =>
            res.json({
                success: true,
            })
        )
        .catch((error) => {
            console.log(error);
            res.json({
                success: false,
            });
        });

}
