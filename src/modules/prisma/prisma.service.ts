// import { configuration } from "src/configuration";

import { PrismaPg } from "@prisma/adapter-pg";

import { OnModuleInit } from "@nestjs/common";
import { configuration } from "src/configuration";
import { PrismaClient } from "src/generated/prisma/client";

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const {
      database: { url },
    } = configuration();

    if (!url) throw new Error("Missing data url configuration");

    super({
      adapter: new PrismaPg({
        connectionString: url,
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
