/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class OAuthUpdateApplicationsClientsDto {
    @ApiProperty({
        type: String,
        description: 'applicationId [input here api field description]',
        example: '209e8dce-ce93-5b3d-a4f3-06ce49207393',
    })
    applicationId?: string;

    @ApiProperty({
        type: String,
        description: 'clientId [input here api field description]',
        example: '467dc818-05a8-5053-9ec3-7ae4e2f225c0',
    })
    clientId?: string;
}
