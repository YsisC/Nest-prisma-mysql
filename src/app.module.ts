import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriaService } from './servicios/categoria/categoria.service';
import { CategoriaController } from './controladores/categoria/categoria.controller';
import { PrismaService } from './servicios/prisma/prisma.service';
import { ProductosService } from './servicios/productos/productos.service';
import { ProductosController } from './controladores/productos/productos.controller';
import { ProductoPhotoController } from './controladores/producto_photo/producto_photo.controller';
import { ProductoPhotoService } from './servicios/producto_photo/producto_photo.service';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'assets'),}),
  ],
  controllers: [AppController, CategoriaController, ProductosController, ProductoPhotoController],
  providers: [AppService, PrismaService, ProductosService, CategoriaService, ProductoPhotoService],
})
export class AppModule {}
