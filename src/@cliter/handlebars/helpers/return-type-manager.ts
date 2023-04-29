import * as handlebars from 'handlebars';
import { ReturnTypeStatement } from '../../types';

handlebars.registerHelper('returnTypeManager', function(
    {
        returnTypes = [],
        sortReturnTypes = true,
        nTabulations = 1,
    }: {
        returnTypes: ReturnTypeStatement[];
        sortReturnTypes?: boolean;
        nTabulations?: number,
    },
    context,
)
{
    const tabulation = '\t';
    const returnTypesResponse: ReturnTypeStatement[] = [];

    for (const returnType of returnTypes)
    {
        const returnTypeFound = returnTypesResponse.find(returnTypeResponse => returnTypeResponse.variableName === returnType.variableName);
        if (!returnTypeFound) returnTypesResponse.push(returnType);
    }

    if (sortReturnTypes)
    {
        // sort injections by variableName
        returnTypesResponse.sort((a, b) =>
        {
            const nameA = a.variableName.toLowerCase();
            const nameB = b.variableName.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    let response = '';
    for (const [i, returnTypeResponse] of returnTypesResponse.entries())
    {
        response += `${tabulation.repeat(nTabulations)}${returnTypeResponse.variableName}: ${returnTypeResponse.className};`;
        if (i !== returnTypesResponse.length - 1) response += '\n';
    }

    return response;
});
