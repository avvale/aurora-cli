import { GenerateCommandState } from '../../types';
import { cliterConfig } from '../../config';
import { CodeWriter, createProject, declareBackApiItemsExports, declareBackAppItemsExports, getManyToManyRelationshipProperties, hasI18nProperties } from '../../utils';
import * as path from 'node:path';

export const addPivotReferences = (generateCommandState: GenerateCommandState): void =>
{
    if (!Array.isArray(generateCommandState.schema.aggregateProperties)) return;

    for (const property of getManyToManyRelationshipProperties(generateCommandState.schema.aggregateProperties))
    {
        if (!property.relationship?.pivot) throw new Error('Pivot property is not defined in relationship many to many property ' + property.name);

        const codeWriter = new CodeWriter(
            path.join('src'),
            path.join(cliterConfig.appContainer),
            cliterConfig.apiContainer,
            property.relationship.pivot.boundedContextName.toLowerCase(),
            property.relationship.pivot.moduleName.toLowerCase(),
            property.relationship.pivot.moduleNames.toLowerCase(),
            property.relationship.pivot.aggregateName,
            hasI18nProperties(property.relationship.pivot.aggregateProperties),
        );
        codeWriter.generateBackAppBoundedContextReferences(
            property.relationship.pivot.aggregateProperties,
            generateCommandState.schema.excludedFiles,
        );
        codeWriter.declareBackApplicationItemsInModule();
        codeWriter.declareBackBoundedContextModuleInApplicationModule();

        const project = createProject();

        declareBackAppItemsExports(
            project,
            path.join('src'),
            property.relationship.pivot.boundedContextName.toLowerCase(),
            property.relationship.pivot.moduleName.toLowerCase(),
            property.relationship.pivot.aggregateName,
            generateCommandState.schema.excludedFiles,
        );

        declareBackApiItemsExports(
            project,
            path.join('src'),
            property.relationship.pivot.boundedContextName.toLowerCase(),
            property.relationship.pivot.moduleName.toLowerCase(),
            generateCommandState.schema.excludedFiles,
        );
    }
};
