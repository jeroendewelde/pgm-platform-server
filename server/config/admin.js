module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f019fbeaf896cbddf119d2b8910aa0c9'),
  },
});
