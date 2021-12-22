module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2917f60c46ad0199c8520002718d4b46'),
  },
});
