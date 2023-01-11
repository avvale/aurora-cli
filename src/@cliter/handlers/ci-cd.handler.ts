/* eslint-disable unicorn/no-static-only-class */
import * as path from 'node:path';
import { TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';

export class CiCdHandler
{
    static async generatePipeline(app: 'front' | 'back', from: string, to: string, service: string): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.CI_CD,
            '.',
            '.',
            {
                templateElementPath: path.join(app, from.toKebabCase(), to.toKebabCase(), service.toKebabCase()),
            },
        );
    }
}
