/* eslint-disable complexity */
// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import { StateService } from '../functions/state.service';
import { cliterConfig } from '../config/cliter.config';
import { Cypher } from './cypher';
import { Property } from './property';
import templateEngine from './template-engine';
import { AdditionalApi } from './additional-api';
import * as chalk from 'chalk';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as _ from 'lodash';
import { GlobalState } from '../store';
import { Command } from '@oclif/core';

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

    public static readonly stateService = container.resolve(StateService);

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
            if (cliterConfig.skipDirectories.includes(file)) return;

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
     * Render filename and folder name
     * @param name name of file or folder
     * @return {string} string with replaced keys
     */
    static renderFilename(
        name: string,
        {
            boundedContextPrefix = '',
            boundedContextSuffix = '',
            moduleNamePrefix = '',
            moduleNameSuffix = '',
            currentProperty,
        }: {
            boundedContextPrefix?: string;
            boundedContextSuffix?: string;
            moduleNamePrefix?: string;
            moduleNameSuffix?: string; // use to set i18n items
            currentProperty?: Property;
        } = {},
    ): string
    {
        if (name.includes('__bounded_context_name__'))                      name = name.replace(/__bounded_context_name__/gi, (boundedContextPrefix ? boundedContextPrefix + '-' : '') + FileManager.stateService.schema.boundedContextName.toKebabCase() + (boundedContextSuffix ? '-' + boundedContextSuffix : ''));
        if (name.includes('__module_name__'))                               name = name.replace(/__module_name__/gi, (moduleNamePrefix ? moduleNamePrefix + '-' : '') + FileManager.stateService.schema.moduleName.toKebabCase() + (moduleNameSuffix ? '-' + moduleNameSuffix : ''));
        if (name.includes('__module_names__'))                              name = name.replace(/__module_names__/gi, FileManager.stateService.schema.moduleNames.toKebabCase());
        if (name.includes('__property_name__') && currentProperty)          name = name.replace(/__property_name__/gi, currentProperty.name.toKebabCase());
        if (name.includes('__property_native_name__') && currentProperty)   name = name.replace(/__property_native_name__/gi, currentProperty.originName.toKebabCase());
        if (name.includes('__additional_api_name__'))                       name = name.replace(/__additional_api_name__/gi, (boundedContextPrefix ? boundedContextPrefix + '-' : '') + (FileManager.stateService.currentAdditionalApi ? FileManager.stateService.currentAdditionalApi.getApiFileName : ''));

        return name;
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

            // get stats about the current file
            const stats = fs.statSync(originFilePath);

            if (stats.isFile())
            {
                // avoid overwriting some files that cannot be overwritten, if file exist
                if (
                    fs.existsSync(path.join(relativeTargetBasePath, relativeTargetPath, FileManager.replaceFilename(file))) &&
                    force &&
                    cliterConfig.avoidOverwritingFilesIfExist.includes(
                        path.join(...(originPath.replace(templatesPath + path.sep, '') + path.sep + file).split(path.sep)),
                    )
                ) return;

                // check if file to create is excluded in schema.
                // schema may not exist if is a new project from master,
                // when we have not yet created any bounded context or module
                if (excludeFiles.includes(path.join(relativeTargetBasePath, relativeTargetPath, FileManager.replaceFilename(file))))
                {
                    command.log(`%s ${path.join(relativeTargetBasePath, relativeTargetPath, FileManager.replaceFilename(file))} excluded`,  chalk.yellow.inverse.bold('[EXCLUDED]'));
                    return;
                }

                // generate file template
                FileManager.manageFileTemplate(
                    command,
                    originFilePath,
                    file,
                    path.join(relativeTargetBasePath, relativeTargetPath),
                    {
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
                const mappedDirectory = FileManager.replaceFilename(file);

                if (fs.existsSync(path.join(targetBasePath, relativeTargetBasePath, relativeTargetPath, mappedDirectory)))
                {
                    if (verbose) command.log(`${chalk.yellow.bold('[DIRECTORY EXIST]')} Directory ${mappedDirectory} exist`);
                }
                else
                {
                    // create folder in destination folder
                    fs.mkdirSync(path.join(targetBasePath, relativeTargetBasePath, relativeTargetPath, mappedDirectory), { recursive: true });
                    command.log(`${chalk.greenBright.bold('[DIRECTORY CREATED]')} Directory ${mappedDirectory} created`);
                }

                // copy files/folder inside current folder recursively
                FileManager.generateContents(
                    command,
                    path.join(originPath, file),
                    relativeTargetBasePath,
                    path.join(relativeTargetPath, mappedDirectory),
                    {
                        force,
                        verbose,
                        excludeFiles,
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

        // relative path with file to create, example: src/@apps/common/lang/application/create/create-lang.command.ts
        const relativeFilePath = path.join(relativeTargetPath, mappedFile);

        // absolute path with file to create, example /Projects/aurora/src/@apps/common/lang/application/create/create-lang.command.ts
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
                const currentLockfile           = FileManager.stateService.lockFiles.find(lockFile => lockFile.path === relativeFilePath);
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
