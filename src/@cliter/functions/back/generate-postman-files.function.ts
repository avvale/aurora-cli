// imports
import { TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const generatePostmanFiles = async (): Promise<void> =>
{
    await TemplateGenerator.createDirectory('', 'postman');
    await TemplateGenerator.generateStaticContents(TemplateElement.BACK_POSTMAN, '', 'postman');
};
