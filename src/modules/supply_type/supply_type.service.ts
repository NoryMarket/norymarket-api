import { Injectable } from "@nestjs/common";
// import { CreateSupplyTypeDto } from "./dto/supplyType";
// import { UpdateSupplyTypeDto } from "./dto/update-supply_type.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SupplyTypeService {
  constructor(private prisma: PrismaService) {}

  // async create({ colors, sizes, name, quantityUnitId }: CreateSupplyTypeDto) {
  //   const colors = await this.prisma.color.findMany({
  //     where: {
  //       id: { in: colorsIds },
  //     },
  //   });

  //   const sizes = await this.prisma.size.findMany({
  //     where: {
  //       id: { in: sizesIds },
  //     },
  //   });

  //   const data = await this.prisma.supplyType.create({
  //     data: {
  //       name,
  //       quantityUnitId,
  //       colors: {
  //         connect: colors,
  //       },
  //       sizes: { connect: sizes },
  //     },
  //   });

  //   return "This action adds a new supplyType";
  // }

  // findAll() {
  //   return `This action returns all supplyType`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} supplyType`;
  // }

  // update(id: number, updateSupplyTypeDto: UpdateSupplyTypeDto) {
  //   return `This action updates a #${id} supplyType`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} supplyType`;
  // }
}
