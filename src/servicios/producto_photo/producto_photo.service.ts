import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductoPhotoDto } from 'src/dto/producto_photo.dto';
import slugify from 'slugify';
import * as fs from 'fs';

@Injectable()
export class ProductoPhotoService {
  constructor(private prisma: PrismaService) {}
    async getDatosPorProducto(id: number) {
      return await this.prisma.producto_foto.findMany({
        where: {producto_id: id},
        include: { producto: true },
      });

    }

  async addDatos(dto: ProductoPhotoDto) {
    try {
      return this.prisma.producto_foto.create({
        data: {
          foto: dto.foto,
          producto_id: dto.producto_id,
        },
      });
    } catch (error) {
      throw new HttpException(`Ocurrio un error`, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteDato(id: any) {
    let datos = await this.prisma.producto_foto.findFirst({
      where: {
        id: id,
      },
    });
    if (datos) {
      fs.unlinkSync(`./assets/uploads/productos/${datos.foto}`);
      await this.prisma.producto_foto.delete({
        where: {
          id: id,
        },
      });
      return { estado: 'Ok', mensaje: 'Se elimino el registro' };
    } else {
      throw new HttpException(
        `Ocurrió un error, por favor vuelva a intentarlo más tarde`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
