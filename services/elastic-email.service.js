import { ApiClient, EmailsApi } from "@elasticemail/elasticemail-client";
import "dotenv/config";
import * as logService from "#services/log.service.js";

const defaultClient = ApiClient.instance;
const api_key = defaultClient.authentications["apikey"];
api_key.apiKey = process.env.ELASTIC_EMAIL_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const api = new EmailsApi();

export const sendEmail = (options, res) => {
  const { to, subject = "Verification email", htmlTemplate } = options;

  const emailData = {
    Recipients: {
      To: [to],
    },
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Charset: "utf-8",
          Content: htmlTemplate,
        },
      ],
      From: ADMIN_EMAIL,
      Subject: subject,
    },
  };

  const callback = (error) => {
    if (error) {
      logService.error(error);
      return res.status(500);
    } else {
      logService.success(`Email sent to ${to}`);
    }
  };

  api.emailsTransactionalPost(emailData, callback);
};
