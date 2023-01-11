// container
import 'reflect-metadata';
import { container } from 'tsyringe';

// node
import * as fs from 'node:fs';
import * as path from 'node:path';

// imports
import { StateService } from '../functions/state.service';
import { TemplateElement } from '../types';
import { TemplateGenerator } from '../utils/template-generator';
import { generateJsonLockFile } from '../functions/common';
import { addReferences, generateAdditionalApiFiles, generateApiFiles, generateI18NApiFiles, generateI18nModuleFiles, generateModuleFiles, generatePivotTables, generatePostmanFiles, generateTestingFiles, generateYamlConfigFile } from '../functions/back';

export class FrontHandler
{
    public static readonly stateService = container.resolve(StateService);
}
