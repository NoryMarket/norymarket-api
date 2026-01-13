import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { ConfigurationService } from "./configuration.service";
import {
  CreateCurrencyTypeDTO,
  CurrencyTypeDTO,
  UpdateCurrencyTypeDTO,
} from "./types/currencyType";

import { ApiOkResponse } from "@nestjs/swagger";
import {
  CreateCurrencyExchangeDTO,
  CurrencyExchangeDTO,
  DeleteCurrencyExchangesDTO,
} from "./types/currencyExchange";
import {
  ColorDTO,
  CreateColorDTO,
  DeleteColorDTO,
  UpdateColorDTO,
} from "./types/color";
import {
  CreateSizeDTO,
  DeleteSizeDTO,
  SizeDTO,
  UpdateSizeDTO,
} from "./types/sizes";
import {
  CreateQuantityUnitDto,
  QuantityUnitDto,
  UpdateQuantityUnitDto,
} from "./types/quantityUnit";
import { MultiDeleteEntityDTO } from "../types/common.dto";
import {
  AppConfigurationDto,
  UpdateAppConfigurationDto,
} from "./types/appConfiguration";
import { Public } from "../auth/decorators/public";

@Controller("configuration")
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Post("currencyType")
  @ApiOkResponse({ type: CurrencyTypeDTO })
  async createCurrencyType(
    @Body() data: CreateCurrencyTypeDTO,
  ): Promise<CurrencyTypeDTO> {
    return await this.configurationService.createCurrencyType(data);
  }

  @Patch("currencyType/:currencyTypeId")
  @ApiOkResponse({ type: CurrencyTypeDTO })
  async updateCurrencyType(
    @Param("currencyTypeId", ParseUUIDPipe) id: string,
    @Body() data: UpdateCurrencyTypeDTO,
  ) {
    return await this.configurationService.updateCurrencyType(id, data);
  }

  @ApiOkResponse({ type: "string", isArray: true })
  @Delete("currencyType")
  async deleteCurrencyType(@Body() { ids }: MultiDeleteEntityDTO) {
    return await this.configurationService.deleteCurrencyType(ids);
  }

  @ApiOkResponse({ type: CurrencyTypeDTO, isArray: true })
  @Get("currencyTypes")
  async getCurrencyType() {
    return await this.configurationService.getCurrencyTypes();
  }

  @ApiOkResponse({ type: CurrencyExchangeDTO, isArray: true })
  @Get("currencyTypes/exchanges")
  async getCurrencyExchanges() {
    return await this.configurationService.getCurrencyExchanges();
  }

  @ApiOkResponse({ type: CurrencyExchangeDTO, isArray: true })
  @Get("currencyTypes/exchanges/:currencyTypeId")
  async getCurrencyTypeExchangeHistory(
    @Param("currencyTypeId", ParseUUIDPipe) id: string,
  ) {
    return await this.configurationService.getCurrencyExchangeHistory(id);
  }

  @ApiOkResponse({ type: CurrencyExchangeDTO })
  @Post("currencyTypes/exchanges")
  async createCurrencyExchange(@Body() data: CreateCurrencyExchangeDTO) {
    return await this.configurationService.createCurrencyExchange(data);
  }

  @Delete("currencyTypes/exchanges")
  @ApiOkResponse({ type: "string", isArray: true })
  async deleteCurrencyExchanges(@Body() { ids }: DeleteCurrencyExchangesDTO) {
    return await this.configurationService.deleteCurrencyExchanges(ids);
  }

  @ApiOkResponse({ type: ColorDTO, isArray: true })
  @Get("colors")
  async getColors() {
    return await this.configurationService.getColors();
  }

  @ApiOkResponse({ type: ColorDTO })
  @Post("color")
  async createColor(@Body() data: CreateColorDTO) {
    return await this.configurationService.createColor(data);
  }

  @ApiOkResponse({ type: ColorDTO })
  @Patch("color/:colorId")
  async updateColor(
    @Body() data: UpdateColorDTO,
    @Param("colorId", ParseUUIDPipe) id: string,
  ) {
    return await this.configurationService.updateColor(id, data);
  }

  @ApiOkResponse({ type: "string", isArray: true })
  @Delete("colors")
  async deleteColors(@Body() { ids }: DeleteColorDTO) {
    return await this.configurationService.deleteColors(ids);
  }

  //Sizes

  @ApiOkResponse({ type: SizeDTO, isArray: true })
  @Get("sizes")
  async getSizes() {
    return await this.configurationService.getSizes();
  }

  @ApiOkResponse({ type: SizeDTO })
  @Post("size")
  async createSize(@Body() data: CreateSizeDTO) {
    return await this.configurationService.createSize(data);
  }

  @ApiOkResponse({ type: SizeDTO })
  @Patch("size/:sizeId")
  async updateSize(
    @Body() data: UpdateSizeDTO,
    @Param("sizeId", ParseUUIDPipe) id: string,
  ) {
    return await this.configurationService.updateSize(id, data);
  }

  @ApiOkResponse({ type: "string", isArray: true })
  @Delete("sizes")
  async deleteSizes(@Body() { ids }: DeleteSizeDTO) {
    return await this.configurationService.deleteSizes(ids);
  }

  //QuantityUnits

  @ApiOkResponse({ type: QuantityUnitDto, isArray: true })
  @Get("quantityUnits")
  async getQuantityUnits() {
    return await this.configurationService.getQuantityUnits();
  }

  @ApiOkResponse({ type: QuantityUnitDto })
  @Post("quantityUnit")
  async createQuantityUnit(@Body() data: CreateQuantityUnitDto) {
    return await this.configurationService.createQuantityUnit(data);
  }

  @ApiOkResponse({ type: QuantityUnitDto })
  @Patch("quantityUnit/:quantityUnitId")
  async updateQuantityUnit(
    @Body() data: UpdateQuantityUnitDto,
    @Param("quantityUnitId", ParseUUIDPipe) id: string,
  ) {
    return await this.configurationService.updateQuantityUnit(id, data);
  }

  @ApiOkResponse({ type: "string", isArray: true })
  @Delete("quantityUnits")
  async deleteQuantityUnits(@Body() { ids }: MultiDeleteEntityDTO) {
    return await this.configurationService.deleteQuantityUnits(ids);
  }

  @ApiOkResponse({ type: AppConfigurationDto })
  @Get("appConfiguration")
  @Public()
  async getAppConfiguration() {
    return await this.configurationService.getAppConfig();
  }

  @Put("appConfiguration")
  @Public()
  async setAppConfiguration(@Body() data: UpdateAppConfigurationDto) {
    return await this.configurationService.updateAppConfig(data);
  }
}
