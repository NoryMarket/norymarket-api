import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateCurrencyTypeDTO,
  CurrencyTypeDTO,
  UpdateCurrencyTypeDTO,
} from "./types/currencyType";
import {
  CreateCurrencyExchangeDTO,
  CurrencyExchangeDTO,
} from "./types/currencyExchange";

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

  async createCurrencyExchange({
    currencyTypeId,
    factor,
  }: CreateCurrencyExchangeDTO) {
    const data = await this.prisma.currencyRate.create({
      data: {
        factor,
        currencyTypeId,
      },
    });

    return new CurrencyExchangeDTO(data);
  }

  async getCurrencyExchanges() {
    const data = await this.prisma.currencyRate.findMany({
      distinct: "currencyTypeId",
      where: { deletedAt: null },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data?.map((exchange) => new CurrencyExchangeDTO(exchange)) ?? [];
  }

  async getCurrencyExchangeHistory(currencyTypeId: string) {
    const data = await this.prisma.currencyRate.findMany({
      where: {
        currencyTypeId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data?.map((exchange) => new CurrencyExchangeDTO(exchange)) ?? [];
  }

  async deleteCurrencyExchanges(ids: string[]) {
    await this.prisma.currencyRate.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: { deletedAt: new Date() },
    });

    return ids;
  }
}
