"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_js_1 = require("./app.module.js");
const app_key_guard_js_1 = require("./shared/guards/app-key.guard.js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule);
    app.set('trust proxy', 1);
    /*
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Allibaas API')
        .setDescription('The Allibaas E-commerce API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .addApiKey({ type: 'apiKey', name: 'x-app-secret', in: 'header' }, 'x-app-secret')
        .addSecurityRequirements({ 'x-app-secret': [] })
        .build();
    
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const docsUser = process.env.SWAGGER_USER || 'admin';
    const docsPass = process.env.SWAGGER_PASS || 'admin123';
    app.use(['/docs', '/docs-json'], (req, res, next) => {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
        if (login && password && login === docsUser && password === docsPass) {
            return next();
        }
        res.set('WWW-Authenticate', 'Basic realm="Allibaas API Documentation"');
        res.status(401).send('Authentication required to access API documentation.');
    });
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.enableCors();
    app.useGlobalGuards(new app_key_guard_js_1.AppKeyGuard());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    */
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map