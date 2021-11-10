import { container } from 'tsyringe';
import { Options } from 'ejs';
import { StateService } from './../services/state.service';
import { Cypher } from './cypher';
import * as chalk from 'chalk';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as handlebarsHelpers from 'handlebars-helpers';
import * as path from 'path';
import * as _ from 'lodash';
import './../prototypes/string-to-kebab-case.interface';
import './../prototypes/string-to-kebab-case';
import './../prototypes/string-to-snake-case.interface';
import './../prototypes/string-to-snake-case';
import './../prototypes/string-to-camel-case.interface';
import './../prototypes/string-to-camel-case';
import './../prototypes/string-to-pascal-case.interface';
import './../prototypes/string-to-pascal-case';
import './../handlebars/helpers/string-to-camel-case';
import './../handlebars/helpers/string-to-kebab-case';
import './../handlebars/helpers/string-to-pascal-case';
import './../handlebars/helpers/string-to-snake-case';
import './../handlebars/helpers/has-items';
import './../handlebars/helpers/not-in-array';
import './../handlebars/helpers/faker';
import './../handlebars/helpers/faker-property';
import './../handlebars/helpers/set-var';
import './../handlebars/helpers/loops';

export class FileManager
{
    public static readonly stateService = container.resolve(StateService);

    /**
     * Delete all origin files from directory recursively.
     * @param currentPath
     * @param skipDirectories
     */
    static deleteOriginFiles(currentPath: string)
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
            if (FileManager.stateService.config.skipDirectories.indexOf(file) > -1) return;

            if (stats.isFile() && (file.endsWith('.origin.ts') || file.endsWith('.origin.graphql')))
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
     * Render templates with handlebars template engine.
     * @param content
     * @param data
     * @param opts
     */
    static renderContent(content: string, data: any, opts?: Options)
    {
        const ejsRendered = ejs.render(content, data, opts);

        // add helpers to handlebars template engine
        handlebarsHelpers({ handlebars: handlebars });
        return handlebars.compile(ejsRendered)(data, {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        });
    }

    /**
     * Render filename and folder name
     * @param name
     */
    static renderFilename(name: string): string
    {
        if (name.includes('__bounded_context_name__'))                                              name = name.replace(/__bounded_context_name__/gi, FileManager.stateService.schema.boundedContextName.toKebabCase());
        if (name.includes('__module_name__'))                                                       name = name.replace(/__module_name__/gi, FileManager.stateService.schema.moduleName.toKebabCase());
        if (name.includes('__module_names__'))                                                      name = name.replace(/__module_names__/gi, FileManager.stateService.schema.moduleNames.toKebabCase());
        if (name.includes('__property_name__') && FileManager.stateService.currentProperty)         name = name.replace(/__property_name__/gi, FileManager.stateService.currentProperty.name.toKebabCase());
        if (name.includes('__property_native_name__') && FileManager.stateService.currentProperty)  name = name.replace(/__property_native_name__/gi, FileManager.stateService.currentProperty.nativeName.toKebabCase());

        return name;
    }

    /**
     * Render all files and folders from template folder
     * @param originPath
     * @param relativePath
     */
    static generateContents(
        originPath: string,
        relativePath: string,
        rootTemplatePath: string,
    ): void
    {
        const projectDirectory  = process.cwd();
        const templatesPath     = path.join(__dirname, '../..', 'templates');

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
                    fs.existsSync(originPath.replace(templatesPath + '/', '') + '/' + file) &&
                    FileManager.stateService.flags.force &&
                    FileManager.stateService.config.avoidOverwritingFilesIfExist.includes(originPath.replace(templatesPath + '/', '') + '/' + file)
                ) return;

                // check if file to create is excluded in schema.
                // schema may not exist if is a new project from master, when we have not yet created any bounded context or module
                if (FileManager.stateService.schema?.excluded?.includes(path.join(rootTemplatePath, relativePath, FileManager.renderFilename(file))))
                {
                    FileManager.stateService.command.log(`%s ${path.join(rootTemplatePath, relativePath, FileManager.renderFilename(file))} excluded`,  chalk.yellow.inverse.bold('[EXCLUDED]'));
                    return;
                }

                // generate file template
                FileManager.manageFileTemplate(
                    originFilePath,
                    file,
                    path.join(rootTemplatePath, relativePath)
                );
            }
            else if (stats.isDirectory())
            {
                const mappedDirectory = FileManager.renderFilename(file);

                if (fs.existsSync(path.join(projectDirectory, rootTemplatePath, relativePath, mappedDirectory)))
                {
                    if (FileManager.stateService.flags.verbose) FileManager.stateService.command.log(`${chalk.yellow.bold('[DIRECTORY EXIST]')} Directory ${mappedDirectory} exist`);
                }
                else
                {
                    // create folder in destination folder
                    fs.mkdirSync(path.join(projectDirectory, rootTemplatePath, relativePath, mappedDirectory), {recursive: true});
                    FileManager.stateService.command.log(`${chalk.greenBright.bold('[DIRECTORY CREATED]')} Directory ${mappedDirectory} created`);
                }

                // copy files/folder inside current folder recursively
                this.generateContents(path.join(originPath, file), path.join(relativePath, mappedDirectory), rootTemplatePath);
            }
        });
    }

    /**
     * Create and render file template
     * @param originFilePath
     * @param file
     * @param relativeDirectoryPath
     * @param projectDirectory
     */
    static manageFileTemplate(
        originFilePath: string,
        file: string,
        relativeDirectoryPath: string,
        projectDirectory: string = process.cwd()
    )
    {
        // read file content
        let contents = fs.readFileSync(originFilePath, 'utf8');

        // replace variables with ejs template engine
        contents = FileManager.renderContent(contents, FileManager.stateService, { filename: originFilePath });

        // render name of file
        const mappedFile = FileManager.renderFilename(file);

        // relative path to project for create/read file lock.json
        const relativeFilePath = path.join(relativeDirectoryPath, mappedFile);

        // write file to destination folder
        const writePath = path.join(projectDirectory, relativeFilePath);

        // check if file exists
        const existFile = fs.existsSync(writePath);

        if (existFile && !FileManager.stateService.flags.force)
        {
            FileManager.stateService.command.log(`%s ${mappedFile} exist`,  chalk.yellow.bold('[INFO]'));
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
                    currentFileFirstLineHash === FileManager.stateService.config.fileTags.ignoredGraphQLFile
                )
                {
                    FileManager.stateService.command.log(`%s ${mappedFile} ignored`, chalk.cyanBright.bold('[IGNORED FILE]'));
                }
                else if (!currentLockfile || currentLockfile.integrity === `sha1:${currentFileHash}`)
                {
                    // the file has not been modified
                    fs.writeFileSync(writePath, contents, 'utf8');

                    if (FileManager.stateService.flags.verbose) FileManager.stateService.command.log(`%s ${mappedFile} overwritten`, chalk.magenta.bold('[FILE OVERWRITE]'));
                }
                else
                {
                    // the file has been modified and we create under .origin the file that would be created
                    fs.writeFileSync(writePath.replace(/\.(?=[^.]*$)/, '.origin.'), contents, 'utf8');

                    const originFileName = mappedFile.replace(/\.(?=[^.]*$)/, '.origin.');

                    FileManager.stateService.originFiles.push(path.join(relativeDirectoryPath, originFileName));

                    FileManager.stateService.command.log(`%s ${originFileName} created`, chalk.redBright.bold('[ORIGIN FILE CREATED]'));
                }
            }
            else
            {
                fs.writeFileSync(writePath, contents, 'utf8');

                FileManager.stateService.command.log(`%s ${mappedFile} created`, chalk.green.bold('[FILE CREATED]'));
            }

            // exclude e2e-spec.ts files from lock files
            if (!relativeFilePath.endsWith('.e2e-spec.ts'))
            {
                // add file to lockFiles
                FileManager.stateService.newLockFiles.push({
                    path        : relativeFilePath,
                    integrity   : `sha1:${Cypher.sha1(contents)}`
                });
            }
        }
    }
}