import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { param } from 'cypress/types/jquery';
import { CategoriaDto } from 'src/dto/categoria.dto';
import { CategoriaService } from 'src/servicios/categoria/categoria.service';

@Controller('categorias')
export class CategoriaController {
  constructor(private categoriasService: CategoriaService) {}

  @Get()
  metodoGet() {
    return this.categoriasService.getDatos();
  }
  @Get(':id')
  metodoGetPorId(@Param() params) {
    return this.categoriasService.getDato(parseInt(params.id));
  }
  @Post()
  metodoPost(@Body() dto: CategoriaDto) {
    return this.categoriasService.addDatos(dto);
  }

  @Put(':id')
  metodoPut(@Param() params, @Body() dto: CategoriaDto) {
    this.categoriasService.updateDatos(parseInt(params.id), dto);
    return { estado: 'Ok', mensaje: 'Se modifico el registro' };
  }
  @Delete(':id')
  metodoDelete(@Param() params){
    return this.categoriasService.deleteDato(parseInt(params.id))
  }
}
