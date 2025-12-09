/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ClickupFolderHandler } from '@api/support/clickup';
import { Auth } from '@aurora/decorators';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClickupFolderDto } from '../dto';

@ApiTags('[clickup] folder')
@Controller('clickup/space/:spaceId/folder')
@Auth('clickup.folder.get')
export class ClickupFolderController {
    constructor(private readonly handler: ClickupFolderHandler) {}

    @Get()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({
        description: 'Defines the action performed',
        type: [ClickupFolderDto],
    })
    async main(@Param('spaceId') spaceId?: string) {
        return await this.handler.main(spaceId);
    }
}
