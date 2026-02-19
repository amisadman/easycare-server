import nodemailer from "nodemailer";
import { envVars } from "../config";
import AppError from "../errorsHelpers/AppError";
import status from "http-status";
import path from "path";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER_SMTP_HOST,
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER_SMTP_USER,
    pass: envVars.EMAIL_SENDER_SMTP_PASS,
  },
  port: Number(envVars.EMAIL_SENDER_SMTP_PORT),
});

interface ISendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, unknown>;
  attachments?: {
    fileName: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  subject,
  templateData,
  templateName,
  to,
  attachments,
}: ISendEmailOptions) => {
  try {
    const templatePath = path.resolve(
      process.cwd(),
      `src/app/templates/${templateName}.ejs`,
    );
    const html = await ejs.renderFile(templatePath, templateData);

    const email = transporter.sendMail({
      from: envVars.EMAIL_SENDER_SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachments) => ({
        filename: attachments.fileName,
        content: attachments.content,
        contentType: attachments.contentType,
      })),
    });

    console.log(`Email send to: ${to}: ${(await email).messageId}`);
  } catch (error: any) {
    console.log("Error Sending Email", error.message);
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Email Sending failed");
  }
};
