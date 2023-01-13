import { Command } from '@oclif/core';
import { TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateEnvFile = async (command: Command, applicationName: string): Promise<void> =>
{
    await TemplateGenerator.generateStaticContents(
        command,
        TemplateElement.BACK_ENV,
        '',
        applicationName,
    );
};
