import { ToolsCreateProcedureTemplateInput, ToolsProcedureType } from '@api/graphql';

export const procedures: ToolsCreateProcedureTemplateInput[] = [
    /* {
        id      : '1cd0c79e-b83b-4ebf-b112-063669703cdc',
        name    : 'insert_user',
        type    : ToolsProcedureType.PROCEDURE,
        version : 'v1.0.0',
        sort    : 1,
        upScript: `
CREATE OR REPLACE PROCEDURE insert_user(name_input VARCHAR, age_input INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (name, age)
    VALUES (name_input, age_input);
END;
$$;
        `,
        downScript: `
DROP PROCEDURE insert_user(VARCHAR, INTEGER);
        `,
    }, */
];