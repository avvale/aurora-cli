import * as handlebars from 'handlebars';
import { InjectionStatement } from '../../types';

handlebars.registerHelper('constructorInjectorManager', function(
    {
        injections = [],
        sortInjections = true,
        tabulation = '\t\t',
    }: {
        injections: InjectionStatement[];
        sortInjections?: boolean;
        tabulation?: string,
    },
    context,
)
{
    const injectionsResponse: InjectionStatement[] = [];

    for (const injection of injections)
    {
        const injectionFound = injectionsResponse.find(injectionResponse => injectionResponse.variableName === injection.variableName);
        if (!injectionFound)
        {
            // set default values it not exists
            if (!injection.scope) injection.scope = 'private';
            if (injection.readonly === undefined) injection.readonly = true;

            injectionsResponse.push(injection);
        }
    }

    if (sortInjections)
    {
        // sort injections by variableName
        injectionsResponse.sort((a, b) =>
        {
            const nameA = a.variableName;
            const nameB = b.variableName;
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    let response = '';
    for (const [i, injectionResponse] of injectionsResponse.entries())
    {
        response += `${tabulation}${injectionResponse.scope} ${injectionResponse.readonly && 'readonly'} ${injectionResponse.variableName}: ${injectionResponse.className},`;
        if (i !== injectionsResponse.length - 1) response += '\n';
    }

    return response;
});
