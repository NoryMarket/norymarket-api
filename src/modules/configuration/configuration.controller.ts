import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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

  @Delete("currencyType/:currencyTypeId")
  async deleteCurrencyType(@Param("currencyTypeId", ParseUUIDPipe) id: string) {
    return await this.configurationService.deleteCurrencyType(id);
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
}
