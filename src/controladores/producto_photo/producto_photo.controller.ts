import {
  Controller,
  Param,
  Body,
  Put,
  Get,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Callbacks } from 'cypress/types/jquery';
import { ProductoPhotoService } from '../../servicios/producto_photo/producto_photo.service';
import { nombreArchivo } from 'src/helpers/helpers';
import { diskStorage } from 'multer';
export class SampleDto
{
    producto_id: string;
}
@Controller('producto-photo')
export class ProductoPhotoController {
  constructor(private productoPhotoService: ProductoPhotoService) {}
  
  @Get(':id')
  metodoGet(@Param() params ){
      return this.productoPhotoService.getDatosPorProducto(parseInt(params.id));
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/uploads/productos',
        filename: (req, file, callback) => {
            callback(null, nombreArchivo(file.originalname));
        },
      }),
    }),
  )
  metodoPost(
    @Body() dto: SampleDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.png|jpeg|jpg' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    this.productoPhotoService.addDatos({foto: file.filename, producto_id: parseInt(dto.producto_id)});
    return {estado:'ok', mensaje: "Se creó el registro exitosamente"}
  }

  @Delete(':id')
  metodoDelete(@Param() params ){
    return this.productoPhotoService.deleteDato(parseInt( params.id))

  }
  
}
