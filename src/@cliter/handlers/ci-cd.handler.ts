/* eslint-disable unicorn/no-static-only-class */
import { GeneratePipelineCommandState, TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import * as path from 'node:path';

export class CiCdHandler
{
    static async generatePipeline(generatePipelineCommandState: GeneratePipelineCommandState): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            generatePipelineCommandState.command,
            TemplateElement.CI_CD,
            '.',
            '.',
            {
                templateElementPath: path.join(
                    generatePipelineCommandState.flags.dashboard ? 'front' : 'back',
                    generatePipelineCommandState.from.toKebabCase(),
                    generatePipelineCommandState.to.toKebabCase(),
                    generatePipelineCommandState.service.toKebabCase(),
                ),
            },
        );
    }
}
