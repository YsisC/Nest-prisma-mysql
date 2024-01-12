import { Test, TestingModule } from '@nestjs/testing';
import { ProductoPhotoService } from './producto_photo.service';

describe('ProductoPhotoService', () => {
  let service: ProductoPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoPhotoService],
    }).compile();

    service = module.get<ProductoPhotoService>(ProductoPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
