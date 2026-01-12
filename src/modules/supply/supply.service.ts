import { Injectable } from "@nestjs/common";
// import { CreateSupplyDto } from "./dto/supply.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SupplyService {
  constructor(private prisma: PrismaService) {}

  // create({}: CreateSupplyDto) {
  //   return "This action adds a new supply";
  // }

  // findAll() {
  //   return `This action returns all supply`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} supply`;
  // }

  // update(id: number, updateSupplyDto: UpdateSupplyDto) {
  //   return `This action updates a #${id} supply`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} supply`;
  // }
}
