import * as handlebars from 'handlebars';
import { VariableInjectionStatement } from '../../types';

handlebars.registerHelper('variablesInjectorManager', function(
    {
        injections = [],
        sortInjections = true,
        nTabulations = 1,
    }: {
        injections: VariableInjectionStatement[];
        sortInjections?: boolean;
        nTabulations?: number,
    },
    context,
)
{
    // tabulation can be changed to 4 spaces or 2 spaces or 1 tabulation \t
    const tabulation = '    ';
    const injectionsResponse: VariableInjectionStatement[] = [];

    // add injections
    for (const injection of injections)
    {
        const injectionFound = injectionsResponse.find(injectionResponse => injectionResponse.variableName === injection.variableName);
        if (!injectionFound)
        {
            injectionsResponse.push(injection);
        }
    }

    // sort injections by variableName
    if (sortInjections)
    {
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
        response += `${tabulation.repeat(nTabulations)}const ${injectionResponse.variableName} = inject(${injectionResponse.className});`;
        if (i !== injectionsResponse.length - 1) response += '\n';
    }

    return response;
});
