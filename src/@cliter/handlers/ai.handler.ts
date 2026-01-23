/* eslint-disable unicorn/no-static-only-class */
import { GenerateAiCommandState, TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import * as path from 'node:path';

export class AiHandler
{
    static async generateAi(generateAiCommandState: GenerateAiCommandState): Promise<void>
    {
        // create ai files
        await TemplateGenerator.generateStaticContents(
            generateAiCommandState.command,
            TemplateElement.AI,
            '.',
            '.',
            {
                templateElementPath: path.join(
                    generateAiCommandState.scope === 'front' ? 'front' : 'back',
                    generateAiCommandState.from.toKebabCase(),
                    generateAiCommandState.to.toKebabCase(),
                    generateAiCommandState.service.toKebabCase(),
                ),
            },
        );
    }
}
