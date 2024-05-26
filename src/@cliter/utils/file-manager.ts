/* eslint-disable complexity */
import { Command } from '@oclif/core';
import * as chalk from 'chalk';
import * as _ from 'lodash';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cliterConfig } from '../config/cliter.config';
import { GlobalState } from '../store';
import { AdditionalApi, LockFile, Property } from '../types';
import { getAdditionalApiFileName } from './additional-api.functions';
import { Cypher } from './cypher';
import { getPropertyName } from './property.functions';
import templateEngine from './template-engine';
import { excludeOperations } from './exclude-operations.functions';
import { excludeFiles } from './exclude-files.functions';

export class FileManager
{
    /**
     * Render file name and folder name
     * @param {string} name - name that include key to replace
     * @param {string} currentProperty - property to render value object or pivot table
     * @return {string} - replaced name
     */
    static replaceFilename(
        name: string,
        {
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            additionalApi,
            boundedContextPrefix = '',
            boundedContextSuffix = '',
            moduleNamePrefix = '',
            moduleNameSuffix = '',
            currentProperty,
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            additionalApi?: AdditionalApi;
            boundedContextPrefix?: string;
            boundedContextSuffix?: string;
            moduleNamePrefix?: string;
            moduleNameSuffix?: string; // use to set i18n items
            currentProperty?: Property;
        } = {},
    ): string
    {
        // remove .hbs extension
        if (name.endsWith('.hbs')) name = name.replace(/\.hbs$/, '');

        if (name.includes('__bounded_context_name__'))
        {
            if (boundedContextName === '') throw new Error('Variable boundedContextName is required to replace __bounded_context_name__ in file name');
            name = name.replace(/__bounded_context_name__/gi, (boundedContextPrefix ? boundedContextPrefix + '-' : '') + boundedContextName.toKebabCase() + (boundedContextSuffix ? '-' + boundedContextSuffix : ''));
        }

        if (name.includes('__module_name__'))
        {
            if (moduleName === '') throw new Error('Variable moduleName is required to replace __module_name__ in file name');
            name = name.replace(/__module_name__/gi, (moduleNamePrefix ? moduleNamePrefix + '-' : '') + moduleName.toKebabCase() + (moduleNameSuffix ? '-' + moduleNameSuffix : ''));
        }

        if (name.includes('__module_names__'))
        {
            if (moduleNames === '') throw new Error('Variable moduleNames is required to replace __module_names__ in file name');
            name = name.replace(/__module_names__/gi, moduleNames.toKebabCase());
        }

        if (name.includes('__additional_api_name__'))
        {
            name = name.replace(/__additional_api_name__/gi, (boundedContextPrefix ? boundedContextPrefix + '-' : '') + (additionalApi ? getAdditionalApiFileName(additionalApi) : ''));
        }

        if (name.includes('__property_name__') && currentProperty)
        {
            name = name.replace(/__property_name__/gi, getPropertyName(currentProperty).toKebabCase());
        }

        if (name.includes('__property_origin_name__') && currentProperty)
        {
            name = name.replace(/__property_origin_name__/gi, currentProperty.name.toKebabCase());
        }

        if (name.includes('__property_relationship_singular_name__') && currentProperty?.relationship?.singularName)
        {
            name = name.replace(/__property_relationship_singular_name__/gi, currentProperty.relationship.singularName.toKebabCase());
        }

        return name;
    }

    /**
     * Delete all origin files from directory recursively.
     * @param {string} currentPath - current path to explore
     * @return {void}
     */
    static deleteOriginFiles(currentPath: string): void
    {
        // read all files/folders (1 level) from template folder
        const files = fs.readdirSync(currentPath);

        // loop each file/folder
        for (const file of files)
        {
            const originFilePath = path.join(currentPath, file);

            // get stats about the current file
            const stats = fs.statSync(originFilePath);

            // skip files that should not be explorer
            if (cliterConfig.skipDirectories.includes(file)) continue;

            if (stats.isFile() && (file.endsWith('.origin.ts') || file.endsWith('.origin.graphql') || file.endsWith('.origin.html')))
            {
                fs.unlinkSync(path.join(currentPath, file));
            }
            else if (stats.isDirectory())
            {
                // copy files/folder inside current folder recursively
                FileManager.deleteOriginFiles(path.join(currentPath, file));
            }
        }
    }

    /**
     * Render all files and folders from template folder recursively.
     * @param {Command} command - command
     * @param {string} originPath - path to template folder
     * @param {string} relativeTargetBasePath - relative path to target folder
     * @param {string} relativeTargetPath - relative path to target folder
     * @param {string} currentProperty - property to render value object or pivot table
     *
     * @return {void}
     */
    static generateContents(
        command: Command,
        originPath: string,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        {
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            additionalApi,
            force = false,
            verbose = false,
            excludedFiles = [],
            excludedOperations = [],
            lockFiles = [],
            templateData = {},
            currentProperty,
            useTemplateEngine = true,
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            additionalApi?: AdditionalApi;
            force?: boolean;
            verbose?: boolean;
            excludedFiles?: string[];
            excludedOperations?: string[];
            lockFiles?: LockFile[];
            templateData?: any;
            currentProperty?: Property;
            useTemplateEngine?: boolean;
        } = {},
    ): void
    {
        const targetBasePath    = process.cwd();
        const templatesPath     = path.join(__dirname, '..', '..', 'templates');

        // read all files/folders (1 level) from template folder
        const filesToCreate = fs.readdirSync(originPath);

        // loop each file/folder
        for (const file of filesToCreate)
        {
            const originFilePath = path.join(originPath, file);

            // replace file name wildcards by bounded context name and module name, and remove .hbs extension
            const nameReplaced = FileManager.replaceFilename(
                file,
                {
                    boundedContextName,
                    moduleName,
                    moduleNames,
                    additionalApi,
                },
            );

            // get stats about the current file
            const stats = fs.statSync(originFilePath);

            if (stats.isFile())
            {
                // avoid overwriting some files that cannot be overwritten, if file exist
                if (
                    fs.existsSync(path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)) &&
                    force &&
                    cliterConfig.avoidOverwritingFilesIfExist.includes(
                        path.join(...(originPath.replace(templatesPath + path.sep, '') + path.sep + file.replace(/\.hbs$/, '')).split(path.sep)),
                    )
                ) continue;

                // check if file to create is excluded in schema.
                // schema may not exist if is a new project from master,
                // when we have not yet created any bounded context or module
                if (
                    !excludeFiles(excludedFiles).isAllowPath(path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)) ||
                    !excludeOperations(excludedOperations).isAllowPath(path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced))
                )
                {
                    command.log(`%s ${path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)} excluded`,  chalk.yellow.inverse.bold('[EXCLUDED]'));
                    continue;
                }

                // generate file template
                FileManager.manageTemplateFile(
                    command,
                    originFilePath,
                    file,
                    path.join(relativeTargetBasePath, relativeTargetPath),
                    {
                        force,
                        verbose,
                        lockFiles,
                        templateData,
                        boundedContextName,
                        moduleName,
                        moduleNames,
                        additionalApi,
                        currentProperty,
                        useTemplateEngine,
                    },
                );
            }
            else if (stats.isDirectory())
            {
                if (!excludeOperations(excludedOperations).isAllowPath(path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)))
                {
                    command.log(`%s ${path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)} excluded`,  chalk.yellow.inverse.bold('[EXCLUDED]'));
                    continue;
                }

                if (fs.existsSync(path.join(targetBasePath, relativeTargetBasePath, relativeTargetPath, nameReplaced)))
                {
                    if (verbose) command.log(`${chalk.yellow.bold('[DIRECTORY EXIST]')} Directory ${nameReplaced} exist`);
                }
                else
                {
                    // create folder in destination folder
                    fs.mkdirSync(path.join(targetBasePath, relativeTargetBasePath, relativeTargetPath, nameReplaced), { recursive: true });
                    command.log(`${chalk.greenBright.bold('[DIRECTORY CREATED]')} Directory ${nameReplaced} created`);
                }

                // copy files/folder inside current folder recursively
                FileManager.generateContents(
                    command,
                    path.join(originPath, file),
                    relativeTargetBasePath,
                    path.join(relativeTargetPath, nameReplaced),
                    {
                        boundedContextName,
                        moduleName,
                        moduleNames,
                        additionalApi,
                        force,
                        verbose,
                        excludedFiles,
                        excludedOperations,
                        lockFiles,
                        templateData,
                        currentProperty,
                        useTemplateEngine,
                    },
                );
            }
        }
    }

    /**
     * Create and render file template
     * @param {Command} command Command
     * @param originFilePath Absolute path to template file
     * @param file File name of template without get target name
     * @param relativeTargetPath Relative path to folder where save file
     * @param targetBasePath Absolute path to project
     * @param {string} currentProperty - property to render value object or pivot table
     * @returns void
     */
    static manageTemplateFile(
        command: Command,
        originFilePath: string,
        file: string,
        relativeTargetPath: string,
        {
            force = false,
            verbose = false,
            lockFiles = [],
            templateData = {},
            targetBasePath = process.cwd(),
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            boundedContextPrefix = '',
            boundedContextSuffix = '',
            moduleNamePrefix = '',
            moduleNameSuffix = '',
            additionalApi,
            currentProperty,
            useTemplateEngine = true,
        }: {
            force?: boolean;
            verbose?: boolean;
            lockFiles?: LockFile[];
            templateData?: any;
            targetBasePath?: string;
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            boundedContextPrefix?: string;
            boundedContextSuffix?: string;
            moduleNamePrefix?: string;
            moduleNameSuffix?: string; // use to set i18n items
            additionalApi?: AdditionalApi;
            currentProperty?: Property;
            useTemplateEngine?: boolean;
        } = {},
    ): void
    {
        // replace file name wildcards by bounded context name and module name, and remove .hbs extension
        const nameReplaced = FileManager.replaceFilename(
            file,
            {
                boundedContextName,
                moduleName,
                moduleNames,
                additionalApi,
                boundedContextPrefix,
                boundedContextSuffix,
                moduleNamePrefix,
                moduleNameSuffix,
                currentProperty,
            },
        );

        // relative path with file to create, example: src/@app/common/lang/application/create/create-lang.command.ts
        const relativeFilePath = path.join(relativeTargetPath, nameReplaced);

        // absolute path with file to create, example /Projects/aurora/src/@app/common/lang/application/create/create-lang.command.ts
        const writePath = path.join(targetBasePath, relativeFilePath);

        // check if file exists
        const existFile = fs.existsSync(writePath);

        // avoid render files like images, this image only will be copied, before check, delete .hbs extension
        if (!cliterConfig.allowedRenderExtensions.includes(path.extname(originFilePath.replace(/\.hbs$/, ''))))
        {
            if (existFile && !force)
            {
                command.log(`%s ${nameReplaced} exist`,  chalk.yellow.bold('[INFO]'));
            }
            else
            {
                fs.copyFileSync(originFilePath, writePath, fs.constants.COPYFILE_FICLONE);
                command.log(`%s ${nameReplaced}`, chalk.green.bold('[FILE COPIED]'));
            }

            return;
        }

        // read file content from file template
        let contents = fs.readFileSync(originFilePath, 'utf8');

        if (useTemplateEngine)
        {
            // replace variables with handlebars template engine
            contents = templateEngine
                .render(
                    contents,
                    {
                        ...templateData,
                        config: cliterConfig,
                        currentProperty,
                        boundedContextPrefix,
                        boundedContextSuffix,
                        moduleNamePrefix,
                        moduleNameSuffix,
                    },
                );
        }

        // if exist file is has not force flag, avoid overwrite file
        if (existFile && !force)
        {
            command.log(`%s ${nameReplaced} exist`, chalk.yellow.bold('[INFO]'));
        }
        else
        {
            // check hash for overwrite
            if (existFile)
            {
                // find lockFile by path
                const currentLockfile           = lockFiles.find(lockFile => lockFile.path === relativeFilePath);
                const currentFile               = fs.readFileSync(writePath, 'utf8');
                const currentFileFirstLine      = _.head(currentFile.split(/\r?\n/));
                const currentFileFirstLineHash  = currentFileFirstLine ? Cypher.sha1(currentFileFirstLine) : undefined;
                const currentFileHash           = Cypher.sha1(currentFile);

                if (
                    currentFileHash === cliterConfig.fileTags.ignoredFile ||
                    currentFileFirstLineHash === cliterConfig.fileTags.ignoredFile ||
                    currentFileHash === cliterConfig.fileTags.ignoredGraphQLFile ||
                    currentFileFirstLineHash === cliterConfig.fileTags.ignoredGraphQLFile ||
                    currentFileHash === cliterConfig.fileTags.ignoredHtmlFile ||
                    currentFileFirstLineHash === cliterConfig.fileTags.ignoredHtmlFile
                )
                {
                    command.log(`%s ${nameReplaced}`, chalk.cyanBright.bold('[IGNORED FILE]'));
                }
                else if (!currentLockfile || currentLockfile.integrity === `sha1:${currentFileHash}`)
                {
                    // the file has been modified
                    fs.writeFileSync(writePath, contents, 'utf8');

                    if (verbose) command.log(`%s ${nameReplaced}`, chalk.magenta.bold('[FILE OVERWRITE]'));
                }
                else
                {
                    // the file has been modified and we create under .origin the file that would be created
                    fs.writeFileSync(
                        writePath.replace(/\.(?=[^.]*$)/, '.origin.'),
                        contents,
                        'utf8',
                    );

                    const originFileName = nameReplaced.replace(/\.(?=[^.]*$)/, '.origin.');

                    // save origin files in global state to be checked after in reviewOverwrites method
                    if (GlobalState.hasValue('originFiles'))
                    {
                        GlobalState.getValue('originFiles')
                            .push(
                                path.join(
                                    relativeTargetPath,
                                    originFileName,
                                ),
                            );
                    }
                    else
                    {
                        GlobalState.setValue('originFiles', [
                            path.join(
                                relativeTargetPath,
                                originFileName,
                            ),
                        ]);
                    }

                    command.log(`%s ${originFileName}`, chalk.redBright.bold('[ORIGIN FILE CREATED]'));
                }
            }
            else
            {
                fs.writeFileSync(writePath, contents, 'utf8');

                command.log(`%s ${nameReplaced}`, chalk.green.bold('[FILE CREATED]'));
            }

            // adapt separator from current OS
            const posixRelativeFilePath = path.sep === '\\' ? relativeFilePath.replace(/\\/g, '/') : relativeFilePath;

            // save lock files in global state to be stored in a file
            if (GlobalState.hasValue('lockFiles'))
            {
                GlobalState.getValue('lockFiles')
                    .push({
                        path     : posixRelativeFilePath,
                        integrity: `sha1:${Cypher.sha1(contents)}`,
                    });
            }
            else
            {
                GlobalState.setValue('lockFiles', [{
                    path     : posixRelativeFilePath,
                    integrity: `sha1:${Cypher.sha1(contents)}`,
                }]);
            }
        }
    }
}
