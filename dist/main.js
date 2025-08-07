"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    const hbs = require('hbs');
    hbs.registerPartials((0, path_1.join)(__dirname, '..', 'views/partials'));
    app.set('view options', { layout: 'layouts/main' });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Portfolio application is running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map