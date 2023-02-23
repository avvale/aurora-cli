// node
import * as path from 'node:path';

// imports
import { AddCommandState, TemplateElement } from '../../types';
import { TemplateGenerator } from '../../utils';

export const addPackageFiles = async (addCommandState: AddCommandState): Promise<void> =>
{
    await TemplateGenerator.generateStaticContents(
        addCommandState.command,
        TemplateElement.FRONT_PACKAGES,
        path.join('.'),
        '',
        {
            force              : addCommandState.flags.force,
            useTemplateEngine  : false,
            templateElementPath: path.join(addCommandState.packageName.toKebabCase()),
        },
    );
};
