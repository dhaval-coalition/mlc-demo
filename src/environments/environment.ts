export const environment = {
    production: false,
    apiUrl: process.env['NG_APP_API_URL'] || 'https://cdn.builder.io/api/v2/content/', // Default value if not provided
    builderAPI: process.env['NG_APP_BUILDER_API'] || ''
};  