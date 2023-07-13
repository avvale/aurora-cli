export const translocoLoader = ['en', 'es']
    .reduce((acc, lang) =>
    {
        acc[lang] = async () => import(`./i18n/${lang}.json`);
        return acc;
    },
    {},
);