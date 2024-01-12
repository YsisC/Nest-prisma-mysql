import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductoDto } from 'src/dto/producto.dto';
import { ProductosService } from 'src/servicios/productos/productos.service';

@Controller('productos')
export class ProductosController {
    constructor(private productosService: ProductosService){}
    @Get()
    metodoGet() {
      return this.productosService.getDatos();
    }
    @Get(':id')
    metodoGetPorId(@Param() params) {
      return this.productosService.getDato(parseInt(params.id));
    }
    @Post()
    metodoPost(@Body() dto: ProductoDto)
    {
        return this.productosService.addDatos(dto);
    }
    @Put(':id')
    metodoPut(@Param() params, @Body() dto: ProductoDto) {
      this.productosService.updateDatos(parseInt(params.id), dto);
      return { estado: 'Ok', mensaje: 'Se modifico el registro' };
    }
    @Delete(':id')
    metodoDelete(@Param() params){
    
        return this.productosService.deleteDato(parseInt(params.id));
    }
}