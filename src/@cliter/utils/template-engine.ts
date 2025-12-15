import * as handlebars from 'handlebars';
import * as handlebarsHelpers from 'handlebars-helpers';
import '../handlebars/helpers';
import '../handlebars/partials';
import '../prototypes/string-to-camel-case';
import '../prototypes/string-to-camel-case.interface';
import '../prototypes/string-to-kebab-case';
import '../prototypes/string-to-kebab-case.interface';
import '../prototypes/string-to-pascal-case';
import '../prototypes/string-to-pascal-case.interface';
import '../prototypes/string-to-snake-case';
import '../prototypes/string-to-snake-case.interface';
import { formatCode } from './prettier-engine';

const templateEngine = {
    /**
     * Render templates with handlebars template engine.
     * @param {string} content - Template content
     * @param {any} data - Data helper to render templates
     * @return {string} Rendered template
     */
    async render(content: string, data: any): Promise<string> {
        // add helpers to handlebars template engine
        handlebarsHelpers({ handlebars });

        const code = handlebars.compile(content)(data, {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        });

        return formatCode(code, data.writePath, process.cwd());
    },
};

export default templateEngine;
