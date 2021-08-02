
export default () => ({
    // port: parseInt(process.env.PORT, 10) || 3000,
    secret_key : process.env.SECRET_KEY,
    email_host: process.env.EMAIL_HOST,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    email_port: process.env.EMAIL_PORT,

  });