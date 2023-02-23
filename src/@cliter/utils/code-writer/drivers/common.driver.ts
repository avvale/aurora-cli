import { IndentationText, Project, QuoteKind, SourceFile } from 'ts-morph';
import { NewLineKind } from 'typescript';
import * as path from 'node:path';

export class CommonDriver
{
    public static createProject(tsconfigPath: string[]): Project
    {
        return new Project({
            tsConfigFilePath    : path.join(process.cwd(), ...tsconfigPath),
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
    }

    public static createSourceFile(project: Project, filePath: string[]): SourceFile
    {
        return project?.addSourceFileAtPath(path.join(process.cwd(), ...filePath));
    }
}
