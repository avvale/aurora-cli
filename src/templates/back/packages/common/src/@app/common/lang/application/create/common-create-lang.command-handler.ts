/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateLangCommand } from './common-create-lang.command';
import { CommonCreateLangService } from './common-create-lang.service';
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

@CommandHandler(CommonCreateLangCommand)
export class CommonCreateLangCommandHandler implements ICommandHandler<CommonCreateLangCommand>
{
    constructor(
        private readonly createLangService: CommonCreateLangService,
    ) {}

    async execute(command: CommonCreateLangCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createLangService.main(
            {
                id: new CommonLangId(command.payload.id),
                name: new CommonLangName(command.payload.name),
                image: new CommonLangImage(command.payload.image),
                iso6392: new CommonLangIso6392(command.payload.iso6392),
                iso6393: new CommonLangIso6393(command.payload.iso6393),
                ietf: new CommonLangIetf(command.payload.ietf),
                customCode: new CommonLangCustomCode(command.payload.customCode),
                dir: new CommonLangDir(command.payload.dir),
                sort: new CommonLangSort(command.payload.sort),
                isActive: new CommonLangIsActive(command.payload.isActive),
            },
            command.cQMetadata,
        );
    }
}
