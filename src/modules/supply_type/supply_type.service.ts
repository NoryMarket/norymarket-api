import { Injectable } from "@nestjs/common";
import {
  CreateSupplyTypeDto,
  SupplyTypeDto,
  UpdateSupplyTypeDto,
} from "./dto/supplyType";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SupplyTypeService {
  constructor(private prisma: PrismaService) {}

  async create({ colors, sizes, name, quantityUnitId }: CreateSupplyTypeDto) {
    const data = await this.prisma.supplyType.create({
      data: {
        name,
        quantityUnitId,
        colors: {
          connect: colors.map((id) => ({ id })),
        },
        sizes: { connect: sizes.map((id) => ({ id })) },
      },
      include: {
        sizes: {
          select: {
            id: true,
          },
        },
        colors: {
          select: { id: true },
        },
      },
    });

    return new SupplyTypeDto(data);
  }

  async findAll() {
    const data = await this.prisma.supplyType.findMany({
      where: { deletedAt: null },
      include: {
        sizes: {
          select: {
            id: true,
          },
        },
        colors: {
          select: { id: true },
        },
      },
    });

    return data.map((supplyType) => new SupplyTypeDto(supplyType));
  }

  async update(
    id: string,
    { colors, name, quantityUnitId, sizes }: UpdateSupplyTypeDto,
  ) {
    const data = await this.prisma.supplyType.update({
      where: { id },
      data: {
        name,
        quantityUnitId,
        colors: {
          set: colors?.map((id) => ({ id })) ?? [],
        },
        sizes: { set: sizes?.map((id) => ({ id })) ?? [] },
      },
      include: {
        sizes: {
          select: {
            id: true,
          },
        },
        colors: {
          select: { id: true },
        },
      },
    });

    return new SupplyTypeDto(data);
  }

  async remove(ids: string[]) {
    await this.prisma.supplyType.updateMany({
      where: { id: { in: ids } },
      data: {
        deletedAt: new Date(),
      },
    });

    return ids;
  }
}
