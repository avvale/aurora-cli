/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamResetPasswordUserDto {
    @ApiProperty({
        type: String,
        description: 'token [input here api field description]',
    })
    token: string;

    @ApiProperty({
        type: String,
        description: 'token [input here api field description]',
    })
    password: string;
}
