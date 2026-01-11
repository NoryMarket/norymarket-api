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
import { ColorDTO, CreateColorDTO, UpdateColorDTO } from "./types/color";
import { CreateSizeDTO, SizeDTO, UpdateSizeDTO } from "./types/sizes";

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

  async createColor({ color, name }: CreateColorDTO) {
    const data = await this.prisma.color.create({
      data: { color, name },
    });

    return new ColorDTO(data);
  }

  async getColors() {
    const data = await this.prisma.color.findMany({
      where: {
        deletedAt: null,
      },
    });

    return data?.map((color) => new ColorDTO(color)) ?? [];
  }

  async updateColor(id: string, { color, name }: UpdateColorDTO) {
    const data = await this.prisma.color.update({
      where: { id },
      data: { color, name },
    });

    return new ColorDTO(data);
  }

  async deleteColors(ids: string[]) {
    await this.prisma.color.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: { deletedAt: new Date() },
    });

    return ids;
  }

  //Sizes

  async createSize({ shortName, name }: CreateSizeDTO) {
    const data = await this.prisma.size.create({
      data: { shortName, name },
    });

    return new SizeDTO(data);
  }

  async getSizes() {
    const data = await this.prisma.size.findMany({
      where: {
        deletedAt: null,
      },
    });

    return data?.map((size) => new SizeDTO(size)) ?? [];
  }

  async updateSize(id: string, { shortName, name }: UpdateSizeDTO) {
    const data = await this.prisma.size.update({
      where: { id },
      data: { shortName, name },
    });

    return new SizeDTO(data);
  }

  async deleteSizes(ids: string[]) {
    await this.prisma.size.updateMany({
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
