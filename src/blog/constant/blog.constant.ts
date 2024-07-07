export const BLOG = {
  WORDPRESS: {
    /**
     *
     * @param site yoursite.worpress.com
     * @param path The api path that you will call. For example, `/posts/:postId`
     * @returns https://public-api.wordpress.com/rest/v1.1/sites/:site/:path
     */
    PUBLIC_API_SITE_ENDPOINT: (site: string, path: string) =>
      `https://public-api.wordpress.com/rest/v1.1/sites/${site}${path}`,
  },
};
