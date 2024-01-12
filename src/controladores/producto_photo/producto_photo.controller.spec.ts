import { Test, TestingModule } from '@nestjs/testing';
import { ProductoPhotoController } from './producto_photo.controller';

describe('ProductoPhotoController', () => {
  let controller: ProductoPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoPhotoController],
    }).compile();

    controller = module.get<ProductoPhotoController>(ProductoPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
