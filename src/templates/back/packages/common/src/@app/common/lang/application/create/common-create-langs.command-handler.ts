/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateLangsCommand } from './common-create-langs.command';
import { CommonCreateLangsService } from './common-create-langs.service';
import {
    CommonLangId,
    CommonLangName,
    CommonLangImage,
    CommonLangIso6392,
    CommonLangIso6393,
    CommonLangIetf,
    CommonLangCustomCode,
    CommonLangDir,
    CommonLangSort,
    CommonLangIsActive,
    CommonLangCreatedAt,
    CommonLangUpdatedAt,
    CommonLangDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CommonCreateLangsCommand)
export class CommonCreateLangsCommandHandler implements ICommandHandler<CommonCreateLangsCommand>
{
    constructor(
        private readonly createLangsService: CommonCreateLangsService,
    ) {}

    async execute(command: CommonCreateLangsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createLangsService.main(
            command.payload
                .map(lang =>
                {
                    return {
                        id: new CommonLangId(lang.id),
                        name: new CommonLangName(lang.name),
                        image: new CommonLangImage(lang.image),
                        iso6392: new CommonLangIso6392(lang.iso6392),
                        iso6393: new CommonLangIso6393(lang.iso6393),
                        ietf: new CommonLangIetf(lang.ietf),
                        customCode: new CommonLangCustomCode(lang.customCode),
                        dir: new CommonLangDir(lang.dir),
                        sort: new CommonLangSort(lang.sort),
                        isActive: new CommonLangIsActive(lang.isActive),
                    };
                }),
            command.cQMetadata,
        );
    }
}
