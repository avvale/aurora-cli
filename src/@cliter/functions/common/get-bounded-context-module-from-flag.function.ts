import { Command } from '@oclif/core';

export const getBoundedContextModuleFromFlag = (
    command: Command,
    module: string,
): { boundedContextName: string; moduleName: string } =>
{
    const boundedContextSection = module.split('/');
    if (boundedContextSection.length !== 2) command.error('Must input bounded context and module name, with format: bounded-context/module');

    return {
        boundedContextName: boundedContextSection[0],
        moduleName        : boundedContextSection[1],
    };
};
