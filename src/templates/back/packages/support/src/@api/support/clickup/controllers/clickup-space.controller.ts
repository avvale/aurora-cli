/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClickupSpaceDto } from '../dto';
import { ClickupSpaceHandler } from '../handlers/clickup-space.handler';

@ApiTags('[clickup] space')
@Controller('clickup/team/:teamId/space')
@Auth('clickup.space.get')
export class ClickupSpaceController {
  constructor(private readonly handler: ClickupSpaceHandler) {}

  @Get()
  @ApiOperation({ summary: 'Defines the operation of this controller' })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: [ClickupSpaceDto],
  })
  async main(@Param('teamId') teamId?: string) {
    return await this.handler.main(teamId);
  }
}
