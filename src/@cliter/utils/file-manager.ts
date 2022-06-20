// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// imports
import { StateService } from '../services/state.service';
import { cliterConfig } from '../config/cliter.config';
import { Cypher } from './cypher';
import { Property } from './property';
import { TemplateEngine } from './template-engine';
import * as chalk from 'chalk';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as _ from 'lodash';

export class FileManager
{
    public static readonly stateService = container.resolve(StateService);

    /**
     * Delete all origin files from directory recursively.
     * @param currentPath
     * @param skipDirectories
     */
    static deleteOriginFiles(currentPath: string): void
    {
        // read all files/folders (1 level) from template folder
        const files = fs.readdirSync(currentPath);

        // loop each file/folder
        files.forEach(async file =>
        {
            const originFilePath = path.join(currentPath, file);

            // get stats about the current file
            const stats = fs.statSync(originFilePath);

            // skip files that should not be explorer
            if (FileManager.stateService.config.skipDirectories.includes(file)) return;

            if (stats.isFile() && (file.endsWith('.origin.ts') || file.endsWith('.origin.graphql') || file.endsWith('.origin.html')))
            {
                fs.unlinkSync(path.join(currentPath, file));
            }
            else if (stats.isDirectory())
            {
                // copy files/folder inside current folder recursively
                FileManager.deleteOriginFiles(path.join(currentPath, file));
            }
        });
    }

    /**
     * Render filename and folder name
     * @param name
     * @param prefix
     * @param suffix
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

        return name;
    }

    /**
     * Render all files and folders from template folder recursively.
     * @param originPath
     * @param relativeTargetPath
     * @param relativeTargetBasePath
     */
    static generateContents(
        originPath: string,
        relativeTargetBasePath: string,
        relativeTargetPath: string,
        {
            currentProperty,
            useTemplateEngine = true,
        }: {
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
        filesToCreate.forEach(async file =>
        {
            const originFilePath = path.join(originPath, file);

            // get stats about the current file
            const stats = fs.statSync(originFilePath);

            if (stats.isFile())
            {
                // avoid overwriting some files that cannot be overwritten, if file exist
                if (
                    fs.existsSync(path.join(relativeTargetBasePath, relativeTargetPath, FileManager.renderFilename(file))) &&
                    FileManager.stateService.flags.force &&
                    FileManager.stateService.config.avoidOverwritingFilesIfExist.includes(
                        path.join(...(originPath.replace(templatesPath + path.sep, '') + path.sep + file).split(path.sep)),
                    )
                ) return;

                // check if file to create is excluded in schema.
                // schema may not exist if is a new project from master, when we have not yet created any bounded context or module
                if (FileManager.stateService.schema?.excluded?.includes(path.join(relativeTargetBasePath, relativeTargetPath, FileManager.renderFilename(file))))
                {
                    FileManager.stateService.command.log(`%s ${path.join(relativeTargetBasePath, relativeTargetPath, FileManager.renderFilename(file))} excluded`,  chalk.yellow.inverse.bold('[EXCLUDED]'));
                    return;
                }

                // generate file template
                FileManager.manageFileTemplate(
                    originFilePath,
                    file,
                    path.join(relativeTargetBasePath, relativeTargetPath),
                    {
                        currentProperty,
                        useTemplateEngine,
                    },
                );
            }
            else if (stats.isDirectory())
            {
                const mappedDirectory = FileManager.renderFilename(file);

                if (fs.existsSync(path.join(targetBasePath, relativeTargetBasePath, relativeTargetPath, mappedDirectory)))
                {
                    if (FileManager.stateService.flags.verbose) FileManager.stateService.command.log(`${chalk.yellow.bold('[DIRECTORY EXIST]')} Directory ${mappedDirectory} exist`);
                }
                else
                {
                    // create folder in destination folder
                    fs.mkdirSync(path.join(targetBasePath, relativeTargetBasePath, relativeTargetPath, mappedDirectory), { recursive: true });
                    FileManager.stateService.command.log(`${chalk.greenBright.bold('[DIRECTORY CREATED]')} Directory ${mappedDirectory} created`);
                }

                // copy files/folder inside current folder recursively
                this.generateContents(
                    path.join(originPath, file),
                    relativeTargetBasePath,
                    path.join(relativeTargetPath, mappedDirectory),
                    { currentProperty },
                );
            }
        });
    }

    /**
     * Create and render file template
     * @param originFilePath absolute path to template file
     * @param file file name of template without get target name
     * @param relativeTargetPath relative path to folder where save file
     * @param targetBasePath absolute path to project
     * @returns void
     */
    static async manageFileTemplate(
        originFilePath: string,
        file: string,
        relativeTargetPath: string,
        {
            targetBasePath = process.cwd(),
            boundedContextPrefix = '',
            boundedContextSuffix = '',
            moduleNamePrefix = '',
            moduleNameSuffix = '',
            currentProperty,
            useTemplateEngine = true,
        }: {
            targetBasePath?: string;
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
        const mappedFile = FileManager.renderFilename(
            file,
            {
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
            if (existFile && !FileManager.stateService.flags.force)
            {
                FileManager.stateService.command.log(`%s ${mappedFile} exist`,  chalk.yellow.bold('[INFO]'));
            }
            else
            {
                fs.copyFileSync(originFilePath, writePath, fs.constants.COPYFILE_FICLONE);
                FileManager.stateService.command.log(`%s ${mappedFile}`, chalk.green.bold('[FILE COPIED]'));
            }

            return;
        }

        // read file content from file template
        let contents = fs.readFileSync(originFilePath, 'utf8');

        if (useTemplateEngine)
        {
            // replace variables with handlebars template engine
            contents = await TemplateEngine.render(contents, {
                ...FileManager.stateService,
                currentProperty,
                boundedContextPrefix,
                boundedContextSuffix,
                moduleNamePrefix,
                moduleNameSuffix,
            });
        }

        // if exist file is has not force flag, avoid overwrite file
        if (existFile && !FileManager.stateService.flags.force)
        {
            FileManager.stateService.command.log(`%s ${mappedFile} exist`, chalk.yellow.bold('[INFO]'));
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
                    currentFileHash === FileManager.stateService.config.fileTags.ignoredFile ||
                    currentFileFirstLineHash === FileManager.stateService.config.fileTags.ignoredFile ||
                    currentFileHash === FileManager.stateService.config.fileTags.ignoredGraphQLFile ||
                    currentFileFirstLineHash === FileManager.stateService.config.fileTags.ignoredGraphQLFile ||
                    currentFileHash === FileManager.stateService.config.fileTags.ignoredHtmlFile ||
                    currentFileFirstLineHash === FileManager.stateService.config.fileTags.ignoredHtmlFile
                )
                {
                    FileManager.stateService.command.log(`%s ${mappedFile}`, chalk.cyanBright.bold('[IGNORED FILE]'));
                }
                else if (!currentLockfile || currentLockfile.integrity === `sha1:${currentFileHash}`)
                {
                    // the file has been modified
                    fs.writeFileSync(writePath, contents, 'utf8');

                    if (FileManager.stateService.flags.verbose) FileManager.stateService.command.log(`%s ${mappedFile}`, chalk.magenta.bold('[FILE OVERWRITE]'));
                }
                else
                {
                    // the file has been modified and we create under .origin the file that would be created
                    fs.writeFileSync(writePath.replace(/\.(?=[^.]*$)/, '.origin.'), contents, 'utf8');

                    const originFileName = mappedFile.replace(/\.(?=[^.]*$)/, '.origin.');

                    FileManager.stateService.originFiles.push(path.join(relativeTargetPath, originFileName));

                    FileManager.stateService.command.log(`%s ${originFileName}`, chalk.redBright.bold('[ORIGIN FILE CREATED]'));
                }
            }
            else
            {
                fs.writeFileSync(writePath, contents, 'utf8');

                FileManager.stateService.command.log(`%s ${mappedFile}`, chalk.green.bold('[FILE CREATED]'));
            }

            // add file to lockFiles
            FileManager.stateService.newLockFiles.push({
                path     : relativeFilePath,
                integrity: `sha1:${Cypher.sha1(contents)}`,
            });
        }
    }
}
