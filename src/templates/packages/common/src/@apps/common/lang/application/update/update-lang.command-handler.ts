/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLangCommand } from './update-lang.command';
import { UpdateLangService } from './update-lang.service';
import {
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangCustomCode,
    LangDir,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(UpdateLangCommand)
export class UpdateLangCommandHandler implements ICommandHandler<UpdateLangCommand>
{
    constructor(
        private readonly updateLangService: UpdateLangService,
    ) {}

    async execute(command: UpdateLangCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateLangService.main(
            {
                id: new LangId(command.payload.id),
                name: new LangName(command.payload.name, { undefinable: true }),
                image: new LangImage(command.payload.image),
                iso6392: new LangIso6392(command.payload.iso6392, { undefinable: true }),
                iso6393: new LangIso6393(command.payload.iso6393, { undefinable: true }),
                ietf: new LangIetf(command.payload.ietf, { undefinable: true }),
                customCode: new LangCustomCode(command.payload.customCode),
                dir: new LangDir(command.payload.dir, { undefinable: true }),
                sort: new LangSort(command.payload.sort),
                isActive: new LangIsActive(command.payload.isActive, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}