require('dotenv').config({
  path: `${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza on  my local',
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'zr36wiwl',
        dataset: 'production',
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        graphqlTag: 'default',
      },
    },
  ],
};
