import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { ProductoDto } from 'src/dto/producto.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}
  async getDatos() {
    return await this.prisma.producto.findMany({
      orderBy: [{ id: 'desc' }],
      include: { categoria: true },
    });
  }
  async getDato(id: number) {
    let datos = await this.prisma.producto.findFirst({
      where: {
        id: id,
      },
      include: { categoria: true },
    });
    if (!datos) {
      throw new HttpException(
        {
          estado: HttpStatus.BAD_REQUEST,
          error: 'El registro no existe en el sistema',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: { name: '', message: '' },
        },
      );
    } else {
      return datos;
    }
  }
  async addDatos(dto: ProductoDto) {
    let existe = await this.prisma.producto.findFirst({
      where: {
        nombre: dto.nombre,
      },
    });
    if (existe) {
      throw new HttpException(
        `El registro ${dto.nombre} ya existe en el sistema`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.prisma.producto.create({
        data: {
          nombre: dto.nombre,
          slug: slugify(dto.nombre.toLowerCase()),
          precio: dto.precio,
          descripcion: dto.descripcion,
          stock: dto.stock,
          categoria_id: dto.categoria_id,
        },
      });
    }
  }

  async updateDatos(id: number, dto: ProductoDto) {
    await this.prisma.producto.update({
      where: {
        id: id,
      },
      data: {
        nombre: dto.nombre,
        slug: slugify(dto.nombre.toLowerCase()),
        precio: dto.precio,
        descripcion: dto.descripcion,
        stock: dto.stock,
        categoria_id: dto.categoria_id,
      },
    });
  }

  async deleteDato(id: any) {
    let datos = await this.prisma.producto_foto.findMany({
      where: {
        producto_id: id,
      },
    });
    if (datos.length === 0) {
      await this.prisma.producto.delete({
        where: {
          id: id,
        },
      });
      return { estado: 'Ok', mensaje: 'Se elimino el registro' };
    } else {
      throw new HttpException(
        `No es posible eliminar el producto en la base de datos`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
