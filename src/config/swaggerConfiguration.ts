import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfiguration = () => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Articles CRUD - API Specification')
    .setDescription(
      'API Specification to detail and test APIs for Articles Application',
    )
    .addServer(`http://localhost:${process.env.SERVER_PORT}/`, 'LOCAL')
    .setVersion('0.1')
    .addTag('api')
    .build();

  return swaggerConfig;
};
