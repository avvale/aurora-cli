/* eslint-disable complexity */
import { Command } from '@oclif/core';
import { cliterConfig } from '../config/cliter.config';
import { Cypher } from './cypher';
import { Property } from './property';
import { AdditionalApi } from './additional-api';
import { GlobalState } from '../store';
import templateEngine from './template-engine';
import * as chalk from 'chalk';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as _ from 'lodash';
import { LockFile } from '../types';

export class FileManager
{
    // TODO método no usado, prueba para nuevo aproach sin usar state métodos de utilidades
    /**
     * Render filename and folder name
     * @param {string} name - name that include key to replace
     * @return {string} - replaced name
     */
    static replaceFilename(
        name: string,
        {
            boundedContextName = '',
            moduleName = '',
            moduleNames = '',
            boundedContextPrefix = '',
            boundedContextSuffix = '',
            moduleNamePrefix = '',
            moduleNameSuffix = '',
            currentAdditionalApi,
            currentProperty,
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            boundedContextPrefix?: string;
            boundedContextSuffix?: string;
            moduleNamePrefix?: string;
            moduleNameSuffix?: string; // use to set i18n items
            currentAdditionalApi?: AdditionalApi;
            currentProperty?: Property;
        } = {},
    ): string
    {
        if (name.includes('__bounded_context_name__'))
        {
            if (boundedContextName === '') throw new Error('Variable boundedContextName is required to replace __bounded_context_name__ in filename');
            name = name.replace(/__bounded_context_name__/gi, (boundedContextPrefix ? boundedContextPrefix + '-' : '') + boundedContextName.toKebabCase() + (boundedContextSuffix ? '-' + boundedContextSuffix : ''));
        }

        if (name.includes('__module_name__'))
        {
            if (moduleName === '') throw new Error('Variable moduleName is required to replace __module_name__ in filename');
            name = name.replace(/__module_name__/gi, (moduleNamePrefix ? moduleNamePrefix + '-' : '') + moduleName.toKebabCase() + (moduleNameSuffix ? '-' + moduleNameSuffix : ''));
        }

        if (name.includes('__module_names__'))
        {
            if (moduleNames === '') throw new Error('Variable moduleNames is required to replace __module_names__ in filename');
            name = name.replace(/__module_names__/gi, moduleNames.toKebabCase());
        }

        if (name.includes('__additional_api_name__'))
        {
            name = name.replace(/__additional_api_name__/gi, (boundedContextPrefix ? boundedContextPrefix + '-' : '') + (currentAdditionalApi ? currentAdditionalApi.getApiFileName : ''));
        }

        if (name.includes('__property_name__') && currentProperty)
        {
            name = name.replace(/__property_name__/gi, currentProperty.name.toKebabCase());
        }

        if (name.includes('__property_native_name__') && currentProperty)
        {
            name = name.replace(/__property_native_name__/gi, currentProperty.originName.toKebabCase());
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
            force = false,
            verbose = false,
            excludeFiles = [],
            lockFiles = [],
            templateData = {},
            currentProperty, // property to render value object
            useTemplateEngine = true,
        }: {
            boundedContextName?: string;
            moduleName?: string;
            moduleNames?: string;
            force?: boolean;
            verbose?: boolean;
            excludeFiles?: string[];
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
            const nameReplaced = FileManager.replaceFilename(
                file,
                {
                    boundedContextName,
                    moduleName,
                    moduleNames,
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
                        path.join(...(originPath.replace(templatesPath + path.sep, '') + path.sep + file).split(path.sep)),
                    )
                ) continue;

                // check if file to create is excluded in schema.
                // schema may not exist if is a new project from master,
                // when we have not yet created any bounded context or module
                if (excludeFiles.includes(path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)))
                {
                    command.log(`%s ${path.join(relativeTargetBasePath, relativeTargetPath, nameReplaced)} excluded`,  chalk.yellow.inverse.bold('[EXCLUDED]'));
                    continue;
                }

                // generate file template
                FileManager.manageFileTemplate(
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
                        currentProperty,
                        useTemplateEngine,
                    },
                );
            }
            else if (stats.isDirectory())
            {
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
                        force,
                        verbose,
                        excludeFiles,
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
     * @returns void
     */
    static async manageFileTemplate(
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
            currentProperty?: Property;
            useTemplateEngine?: boolean;
        } = {},
    ): Promise<void>
    {
        // render filename according to bounded context name and module name
        const mappedFile = FileManager.replaceFilename(
            file,
            {
                boundedContextName,
                moduleName,
                moduleNames,
                boundedContextPrefix,
                boundedContextSuffix,
                moduleNamePrefix,
                moduleNameSuffix,
                currentProperty,
            },
        );

        // relative path with file to create, example: src/@app/common/lang/application/create/create-lang.command.ts
        const relativeFilePath = path.join(relativeTargetPath, mappedFile);

        // absolute path with file to create, example /Projects/aurora/src/@app/common/lang/application/create/create-lang.command.ts
        const writePath = path.join(targetBasePath, relativeFilePath);

        // check if file exists
        const existFile = fs.existsSync(writePath);

        // avoid render files like images, this image only will be copied
        if (!cliterConfig.allowedRenderExtensions.includes(path.extname(originFilePath)))
        {
            if (existFile && !force)
            {
                command.log(`%s ${mappedFile} exist`,  chalk.yellow.bold('[INFO]'));
            }
            else
            {
                fs.copyFileSync(originFilePath, writePath, fs.constants.COPYFILE_FICLONE);
                command.log(`%s ${mappedFile}`, chalk.green.bold('[FILE COPIED]'));
            }

            return;
        }

        // read file content from file template
        let contents = fs.readFileSync(originFilePath, 'utf8');

        if (useTemplateEngine)
        {
            // replace variables with handlebars template engine
            contents = await templateEngine.render(contents, {
                ...templateData,
                config: cliterConfig,
                currentProperty,
                boundedContextPrefix,
                boundedContextSuffix,
                moduleNamePrefix,
                moduleNameSuffix,
            });
        }

        // if exist file is has not force flag, avoid overwrite file
        if (existFile && !force)
        {
            command.log(`%s ${mappedFile} exist`, chalk.yellow.bold('[INFO]'));
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
                    command.log(`%s ${mappedFile}`, chalk.cyanBright.bold('[IGNORED FILE]'));
                }
                else if (!currentLockfile || currentLockfile.integrity === `sha1:${currentFileHash}`)
                {
                    // the file has been modified
                    fs.writeFileSync(writePath, contents, 'utf8');

                    if (verbose) command.log(`%s ${mappedFile}`, chalk.magenta.bold('[FILE OVERWRITE]'));
                }
                else
                {
                    // the file has been modified and we create under .origin the file that would be created
                    fs.writeFileSync(
                        writePath.replace(/\.(?=[^.]*$)/, '.origin.'),
                        contents,
                        'utf8',
                    );

                    const originFileName = mappedFile.replace(/\.(?=[^.]*$)/, '.origin.');

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

                command.log(`%s ${mappedFile}`, chalk.green.bold('[FILE CREATED]'));
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
