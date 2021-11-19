
import { Options } from 'ejs';
import { Liquid } from 'liquidjs';
import { liquidPlugins } from './../liquid-plugins';
import * as ejs from 'ejs';
import * as handlebars from 'handlebars';
import * as handlebarsHelpers from 'handlebars-helpers';
import './../prototypes/string-to-kebab-case.interface';
import './../prototypes/string-to-kebab-case';
import './../prototypes/string-to-snake-case.interface';
import './../prototypes/string-to-snake-case';
import './../prototypes/string-to-camel-case.interface';
import './../prototypes/string-to-camel-case';
import './../prototypes/string-to-pascal-case.interface';
import './../prototypes/string-to-pascal-case';
import './../handlebars/helpers/allow-i18n-property';
import './../handlebars/helpers/is-i18n-relation-property';
import './../handlebars/helpers/string-to-camel-case';
import './../handlebars/helpers/string-to-kebab-case';
import './../handlebars/helpers/string-to-pascal-case';
import './../handlebars/helpers/string-to-snake-case';
import './../handlebars/helpers/has-items';
import './../handlebars/helpers/not-in-array';
import './../handlebars/helpers/faker';
import './../handlebars/helpers/faker-property';
import './../handlebars/helpers/set-var';
import './../handlebars/helpers/loops';

export class TemplateEngine
{
    static liquidFiles: string[] = [
        '__module_name__.sagas.ts'
    ];

    /**
     * Render templates with handlebars template engine.
     * @param content
     * @param data
     * @param opts
     */
    static async render(content: string, data: any, opts?: Options, file: string): Promise<string>
    {
        if (this.liquidFiles.includes(file))
        {
            // liquid engine
            const liquidEngine = new Liquid();
            liquidPlugins(liquidEngine);
            return await liquidEngine.parseAndRender(content, data);
        }
        else
        {
            const ejsRendered = ejs.render(content, data, opts);

            // add helpers to handlebars template engine
            handlebarsHelpers({ handlebars });

            return handlebars.compile(ejsRendered)(data, {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault   : true,
            });
        }
    }
}