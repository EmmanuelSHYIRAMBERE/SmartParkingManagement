import nodemailer from "nodemailer";

export const sendEmail = (userEmail, userNames) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: process.env.Email,
    to: userEmail,
    subject: "Welcome to Holidays Planners - Your Journey Begins Here",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Holidays Planners</title>

    <style>
      body {
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .header {
        background-color: #009688;
        padding: 20px;
        text-align: center;
      }

      .header img {
        max-width: 200px;
        height: auto;
      }

      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #333;
        font-size: 28px;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }

      p {
        color: #666;
        font-size: 16px;
        margin: 0;
        text-align: center;
      }

      .button-container {
        text-align: center;
        margin-top: 20px;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #009688;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }

      .button:hover {
        background-color: #007a6e;
      }

      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <a
        href="https://holiday-planer-project.onrender.com/holidays/tours/gettours"
        ><img src="https://html.geekcodelab.com/holiday-planners/assets/images/logo.png" alt="HolidaysPlanners logo"
      /></a>
    </div>
    <div class="content">
      <h1>Welcome to Holidays Planners!</h1>
      <p>
        Dear ${userNames?.split(" ")[0]},
        <br /><br />
        We're delighted to welcome you to Holidays Planners, your gateway to unforgettable adventures and travel experiences. Your decision to join us marks the beginning of a journey filled with exploration, discovery, and cherished memories.
      </p>
      <div class="button-container">
        <a href="https://holiday-planer-project.onrender.com/holidays/tours/gettours" class="button">Explore the World</a>
      </div>
    </div>
    <div class="footer">
      Thank you for choosing Holidays Planners as your travel partner. We can't
      wait to be a part of your travel stories and help you create memories that
      will last a lifetime. Your adventure starts here!<br /><br />

      Feel free to explore and familiarize yourself with our platform.<br />
      If you have any questions or need assistance with anything, don't hesitate
      to reach out.<br />
      We are here to ensure your experience with us is as smooth and enjoyable
      as possible.<br /><br /><br />

      Best regards,
    </div>
  </body>
</html>

`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
