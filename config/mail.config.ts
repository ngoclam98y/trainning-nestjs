export default (): Record<string, any> => ({
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASS,
    mailFrom: process.env.MAIL_FROM
});
