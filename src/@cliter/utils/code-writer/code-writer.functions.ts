/* eslint-disable max-params */
import * as path from 'node:path';
import { IndentationText, Project, QuoteKind } from 'ts-morph';
import { NewLineKind } from 'typescript';
import { cliterConfig } from '../../config';
import { ExportDriver } from './drivers/export.driver';

export const createProject = (): Project =>
{
    return new Project({
        tsConfigFilePath    : path.join(process.cwd(), 'tsconfig.json'),
        // these are the defaults
        manipulationSettings: {
            // TwoSpaces, FourSpaces, EightSpaces, or Tab
            indentationText                : IndentationText.FourSpaces,
            // LineFeed or CarriageReturnLineFeed
            newLineKind                    : NewLineKind.LineFeed,
            // Single or Double
            quoteKind                      : QuoteKind.Single,
            // Whether to change shorthand property assignments to property assignments
            // and add aliases to import & export specifiers (see more information in
            // the renaming section of the documentation).
            usePrefixAndSuffixTextForRename: false,
            // Whether to use trailing commas in multi-line scenarios where trailing
            // commas would be used.
            useTrailingCommas              : false,
        },
    });
};

/****************************************************************
 * Add exports of principal application elements to src/index.ts
 * this is to have access to all elements from index.ts
 *
 * @param {Project} project - ts morph project.
 * @param {string} srcDirectory - The source directory path.
 * @param {string} boundedContextName - The bounded context name.
 * @param {string} moduleName - The module name.
 * @param {string} aggregateName - The aggregate name.
 * @param {string[]} excluded - Files avoid create references by to be excluded.
 * @return {void}
 ****************************************************************/
export const declareBackApplicationItemsExports = (
    project: Project,
    srcDirectory: string,
    boundedContextName: string,
    moduleName: string,
    aggregateName: string,
    excluded: string[] = [],
): void =>
{
    const sourceFile = project.addSourceFileAtPath(path.join(process.cwd(), srcDirectory, 'index.ts'));

    if (!excluded.includes(`src/${cliterConfig.apiContainer}/${boundedContextName.toKebabCase()}/${boundedContextName.toKebabCase()}.module.ts`))
    {
        // export module
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.apiContainer}/${boundedContextName.toKebabCase()}/${boundedContextName.toKebabCase()}.module`,
            [`${boundedContextName.toPascalCase()}Module`],
        );
    }

    if (!excluded.includes(`src/${cliterConfig.apiContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/dto/${boundedContextName.toKebabCase()}-${moduleName.toKebabCase()}.dto.ts`))
    {
        // export DTO
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.apiContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/dto/${boundedContextName.toKebabCase()}-${moduleName.toKebabCase()}.dto`,
            [`${boundedContextName.toPascalCase()}${moduleName.toPascalCase()}Dto`],
        );
    }

    if (!excluded.includes(`src/${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/domain/${boundedContextName.toKebabCase()}-${moduleName.toKebabCase()}.aggregate.ts`))
    {
        // export aggregate
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/domain/${boundedContextName.toKebabCase()}-${moduleName.toKebabCase()}.aggregate`,
            [`${aggregateName}`],
        );
    }

    if (!excluded.includes(`src/${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/infrastructure/sequelize/${boundedContextName.toKebabCase()}-sequelize-${moduleName.toKebabCase()}.model.ts`))
    {
        // export model
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}`,
            [`${boundedContextName.toPascalCase()}${moduleName.toPascalCase()}Model`],
        );
    }

    if (!excluded.includes(`src/${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/domain/${boundedContextName.toKebabCase()}-${moduleName.toKebabCase()}.response.ts`))
    {
        // export response
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/domain/${boundedContextName.toKebabCase()}-${moduleName.toKebabCase()}.response`,
            [`${boundedContextName.toPascalCase()}${moduleName.toPascalCase()}Response`],
        );
    }

    if (!excluded.includes(`src/${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/domain/${boundedContextName.toKebabCase()}-${moduleName.toKebabCase()}.mapper.ts`))
    {
        // export mapper
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/domain/${boundedContextName.toKebabCase()}-${moduleName.toKebabCase()}.mapper`,
            [`${boundedContextName.toPascalCase()}${moduleName.toPascalCase()}Mapper`],
        );
    }

    if (!excluded.includes(`src/${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/infrastructure/mock/${boundedContextName.toKebabCase()}-mock-${moduleName.toKebabCase()}.data.ts`))
    {
        // export seed
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.appContainer}/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}/infrastructure/mock/${boundedContextName.toKebabCase()}-mock-${moduleName.toKebabCase()}.data`,
            [`${boundedContextName.toCamelCase()}Mock${moduleName.toPascalCase()}Data`],
        );
    }

    sourceFile?.saveSync();
};
