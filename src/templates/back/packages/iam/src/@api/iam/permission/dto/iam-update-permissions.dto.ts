/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdatePermissionsDto {
  @ApiProperty({
    type: String,
    description:
      'Unique identifier for the permission. UUID v4 format, generated automatically on creation. Used as primary key for referencing this permission across the system.',
  })
  id?: string;

  @ApiProperty({
    type: String,
    description:
      'Unique permission name used to evaluate authorization. Format follows convention: [BoundedContext].[Action][Resource] (e.g., &#x27;Iam.CreateUser&#x27;). Used by the authorization system to check if a user can access specific resources or perform certain actions.',
  })
  name?: string;

  @ApiProperty({
    type: String,
    description:
      'Foreign key reference to the bounded context this permission belongs to. Each permission is scoped to a specific bounded context, grouping all permissions related to a particular business domain. Used to organize permissions by functional areas of the application.',
    example: '97419405-ebb7-5d5a-83e1-7416a72a28d6',
  })
  boundedContextId?: string;

  @ApiProperty({
    type: [String],
    description:
      'Many-to-many relationship with roles. Represents all roles that have been granted this permission. Used to determine which roles can perform the actions covered by this permission.',
  })
  roleIds?: string[];
}
