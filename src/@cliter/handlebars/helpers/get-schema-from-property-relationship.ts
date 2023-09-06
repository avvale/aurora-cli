import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, getSchemaFromPropertyRelationship } from '../..';

handlebars.registerHelper('getSchemaFromPropertyRelationship', function(
    modulePath: string,
): ModuleDefinitionSchema | null
{
    return getSchemaFromPropertyRelationship(
        modulePath,
    );
});
