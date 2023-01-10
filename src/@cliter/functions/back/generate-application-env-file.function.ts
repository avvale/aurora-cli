// imports
import { TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generateApplicationEnvFile = async (applicationName: string): Promise<void> =>
{
    await TemplateGenerator.generateStaticContents(TemplateElement.BACK_ENV, '', applicationName);
};
