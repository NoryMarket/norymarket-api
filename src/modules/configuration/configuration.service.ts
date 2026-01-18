import { ConflictException, Injectable } from "@nestjs/common";
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
import {
  CreateQuantityUnitDto,
  QuantityUnitDto,
  UpdateQuantityUnitDto,
} from "./types/quantityUnit";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppConfigKey, appConfigKeys, AppConfiguration } from "./constants";
import {
  AppConfigurationDto,
  UpdateAppConfigurationDto,
  ValueOfAppConfigKey,
} from "./types/appConfiguration";

@Injectable()
export class ConfigurationService {
  constructor(private prisma: PrismaService) {}

  async createCurrencyType({
    name,
    shortName,
    decimals,
    symbol,
  }: CreateCurrencyTypeDTO) {
    const data = await this.prisma.currencyType.create({
      data: {
        name,
        shortName,
        decimals,
        symbol,
        rates: {
          create: {
            factor: 1,
            isReadonly: true,
          },
        },
      },
      include: {
        rates: true,
      },
    });

    return new CurrencyTypeDTO(
      data,
      data.rates?.map((rate) => new CurrencyExchangeDTO(rate)),
    );
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

  async deleteCurrencyType(ids: string[]) {
    const currencyExchanges = await this.getCurrencyExchanges(ids);

    if (currencyExchanges.length > 0) {
      throw new ConflictException(currencyExchanges);
    }

    const softDeleted = await this.prisma.currencyType.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: { deletedAt: new Date() },
    });

    if (!softDeleted) throw new Error("404");

    return ids;
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

  async getCurrencyExchanges(currencyTypesIds?: string[]) {
    const data = await this.prisma.currencyRate.findMany({
      distinct: "currencyTypeId",
      where: {
        deletedAt: null,
        currencyTypeId: currencyTypesIds
          ? {
              in: currencyTypesIds,
            }
          : undefined,
      },
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
        isReadonly: false,
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

  //QuantityUnit

  async createQuantityUnit({
    shortName,
    name,
    allowDecimals,
    description,
  }: CreateQuantityUnitDto) {
    const data = await this.prisma.quantityUnit.create({
      data: { shortName, name, allowDecimals, description },
    });

    return new QuantityUnitDto(data);
  }

  async getQuantityUnits() {
    const data = await this.prisma.quantityUnit.findMany({
      where: {
        deletedAt: null,
      },
    });

    return data?.map((unit) => new QuantityUnitDto(unit)) ?? [];
  }

  async updateQuantityUnit(
    id: string,
    { shortName, name, allowDecimals, description }: UpdateQuantityUnitDto,
  ) {
    const data = await this.prisma.quantityUnit.update({
      where: { id },
      data: { shortName, name, allowDecimals, description },
    });

    return new QuantityUnitDto(data);
  }

  async deleteQuantityUnits(ids: string[]) {
    await this.prisma.quantityUnit.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: { deletedAt: new Date() },
    });

    return ids;
  }

  async getAppConfig() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const data = await this.prisma.appConfiguration.findMany({
      where: {
        key: { in: appConfigKeys as string[] },
      },
    });

    const valuesMap: Partial<Record<AppConfigKey, unknown>> =
      Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        data.map(({ key, value }) => [key, value] as [AppConfigKey, unknown]),
      );

    const appConfig = new AppConfigurationDto();

    for (const key of appConfigKeys) {
      switch (key) {
        case AppConfigKey.DEFAULT_CURRENCY:
          {
            let value = valuesMap[key];

            if (!value) {
              const firstCurrency = await this.prisma.currencyType.findFirst();

              if (firstCurrency) value = firstCurrency.id;
            }

            appConfig[AppConfigKey.DEFAULT_CURRENCY] =
              value as ValueOfAppConfigKey<AppConfigKey>;
          }
          break;
      }
    }

    return appConfig;
  }

  async updateAppConfig(data: UpdateAppConfigurationDto) {
    for (const key in data) {
      switch (key) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        case AppConfigKey.DEFAULT_CURRENCY:
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const currentValue = await this.prisma.appConfiguration.findFirst({
              where: { key },
            });

            if (currentValue) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              await this.prisma.appConfiguration.update({
                where: {
                  key,
                },
                data: {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  value: data[key] as any,
                },
              });
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              await this.prisma.appConfiguration.create({
                data: {
                  key,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  value: data[key] as any,
                },
              });
            }
          }
          break;
      }
    }

    return await this.getAppConfig();
  }
}
