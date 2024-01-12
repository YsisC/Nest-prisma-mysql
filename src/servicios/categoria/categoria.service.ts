import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { CategoriaDto } from 'src/dto/categoria.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriaService {
 
    constructor(private prisma: PrismaService) {}
  async getDatos() {
    return await this.prisma.categoria.findMany({
      orderBy: [{ id: 'desc' }],
    });
  }

  async getDato(id: number) {
    let datos = await this.prisma.categoria.findFirst({
      where: {
        id: id,
      },
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

  async addDatos(dto: CategoriaDto) {
    let existe = await this.prisma.categoria.findFirst({
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
      return this.prisma.categoria.create({
        data: {
          nombre: dto.nombre,
          slug: slugify(dto.nombre.toLowerCase()),
        },
      });
    }
  }

  async updateDatos(id: number, dto: CategoriaDto) {
    await this.prisma.categoria.update({
      where: {
        id: id,
      },
      data: {
        nombre: dto.nombre,
        slug: slugify(dto.nombre.toLowerCase()),
      },
    });
  }

  async deleteDato(id: any){
    let datos = await this.prisma.producto.findMany(
        {
            where:
            {
                categoria_id: id
            }
        });
    if(datos.length === 0){
        await this.prisma.categoria.delete({
            where: {
                id: id
            }
        })
        return { estado: 'Ok', mensaje: 'Se elimino el registro' };
    } else {
        throw new HttpException(
            `No es posible eliminar el registro en este momento`,
            HttpStatus.BAD_REQUEST,
          );
    }
  }
}
