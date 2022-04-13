export default (): Record<string, any> => ({
    googleClient: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    githubClient: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_SECRET,
    jwtSecret: process.env.SECRET_KEY
});
