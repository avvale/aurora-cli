import * as handlebars from 'handlebars';
import { ConstructorInjectionStatement } from '../../types';

handlebars.registerHelper('constructorInjectorManager', function(
    {
        injections = [],
        sortInjections = true,
        nTabulations = 2,
    }: {
        injections: ConstructorInjectionStatement[];
        sortInjections?: boolean;
        nTabulations?: number,
    },
    context,
)
{
    // tabulation can be changed to 4 spaces or 2 spaces or 1 tabulation \t
    const tabulation = '    ';
    const injectionsResponse: ConstructorInjectionStatement[] = [];

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
            const nameA = a.variableName.toLowerCase();
            const nameB = b.variableName.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    let response = '';
    for (const [i, injectionResponse] of injectionsResponse.entries())
    {
        response += `${tabulation.repeat(nTabulations)}${injectionResponse.scope} ${injectionResponse.readonly && 'readonly'} ${injectionResponse.variableName}: ${injectionResponse.className},`;
        if (i !== injectionsResponse.length - 1) response += '\n';
    }

    return response;
});
