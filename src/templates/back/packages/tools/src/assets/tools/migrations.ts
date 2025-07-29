import { ToolsCreateMigrationTemplateInput } from '@api/graphql';

export const migrations: ToolsCreateMigrationTemplateInput[] = [
    {
        id      : '1cd0c79e-b83b-4ebf-b112-063669703cdc',
        name    : 'IAM Permissions',
        version : 'v1.0.0',
        sort    : 1,
        upScript: `
INSERT INTO public."IamPermission" (id, "name", "boundedContextId")
VALUES('752a72f1-940d-49f7-9702-44f7b95a7ff5'::uuid, 'aurora.test', 'f405132f-786d-4a6a-a262-0e6a6518aec3'::uuid);
        `,
        downScript: `
DELETE FROM public."IamPermission"
WHERE id='752a72f1-940d-49f7-9702-44f7b95a7ff5'::uuid;
        `,
    },
];