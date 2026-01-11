import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateCurrencyTypeDTO,
  CurrencyTypeDTO,
  UpdateCurrencyTypeDTO,
} from "./types/currencyType";

@Injectable()
export class ConfigurationService {
  constructor(private prisma: PrismaService) {}

  async createCurrencyType({ name, shortName }: CreateCurrencyTypeDTO) {
    const data = await this.prisma.currencyType.create({
      data: {
        name,
        shortName,
      },
    });

    return new CurrencyTypeDTO(data);
  }

  async getCurrencyTypes() {
    const data = await this.prisma.currencyType.findMany({
      where: {
        deletedAt: null,
      },
    });

    return data?.map((currencyType) => new CurrencyTypeDTO(currencyType)) ?? [];
  }

  async updateCurrencyType(id: string, data: UpdateCurrencyTypeDTO) {
    const updated = await this.prisma.currencyType.update({
      where: {
        id,
      },
      data,
    });

    return updated;
  }

  async deleteCurrencyType(id: string) {
    const softDeleted = await this.prisma.currencyType.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    if (!softDeleted) throw new Error("404");

    return softDeleted?.id;
  }
}
