import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from '../dto/product.dto';
import {
  ProductListResponseDTO,
  ProductResponseDTO,
  SimpleResponseDTO,
} from '../dto/product-response.dto';
import * as crypto from 'crypto';

@Injectable()
export class ProductsPrismaRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1): Promise<ProductListResponseDTO> {
    const PAGE_SIZE = 12;
    const skip = (page - 1) * PAGE_SIZE;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: PAGE_SIZE,
        include: { categories: true },
      }),
      this.prisma.product.count(),
    ]);

    return {
      code: 200,
      message: 'Products retrieved successfully',
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: product.qty,
        categories: product.categories.map((category) => ({
          value: category.id,
          label: category.label,
        })),
        photo: product.photo,
      })),
      total,
      page,
      pageSize: PAGE_SIZE,
    };
  }

  async findById(id: string): Promise<ProductResponseDTO> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      code: 200,
      message: 'Product retrieved successfully',
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        qty: product.qty,
        categories: product.categories.map((category) => ({
          value: category.id,
          label: category.label,
        })),
        photo: product.photo,
      },
    };
  }

  async create(data: CreateProductDTO): Promise<ProductResponseDTO> {
    const exists = await this.prisma.product.findFirst({
      where: { name: data.name },
    });

    if (exists) {
      throw new ConflictException('Product name already exists');
    }

    const product = await this.prisma.product.create({
      data: {
        id: crypto.randomUUID(),
        name: data.name,
        price: data.price,
        qty: data.qty,
        photo: data.photo,
        categories: {
          connect: data.categories.map((category) => ({
            id: category.value,
          })),
        },
      },
      include: { categories: true },
    });

    return {
      code: 201,
      message: 'Product created successfully',
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        qty: product.qty,
        categories: product.categories.map((category) => ({
          value: category.id,
          label: category.label,
        })),
        photo: product.photo,
      },
    };
  }

  async update(
    id: string,
    data: CreateProductDTO,
  ): Promise<ProductResponseDTO> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const nameConflict = await this.prisma.product.findFirst({
      where: {
        name: data.name,
        NOT: { id },
      },
    });

    if (nameConflict) {
      throw new ConflictException('Product name already exists');
    }

    const updated = await this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        qty: data.qty,
        photo: data.photo,
        categories: {
          set: [],
          connect: data.categories.map((category) => ({
            id: category.value,
          })),
        },
      },
      include: { categories: true },
    });

    return {
      code: 200,
      message: 'Product updated successfully',
      product: {
        id: updated.id,
        name: updated.name,
        price: updated.price,
        qty: updated.qty,
        categories: updated.categories.map((category) => ({
          value: category.id,
          label: category.label,
        })),
        photo: updated.photo,
      },
    };
  }

  async delete(id: string): Promise<SimpleResponseDTO> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({ where: { id } });

    return {
      code: 200,
      message: 'Product deleted successfully',
    };
  }
}
