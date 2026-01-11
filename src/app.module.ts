import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./configuration";
import { SupabaseModule } from "./modules/supabase/supabase.module";
import { APP_GUARD } from "@nestjs/core";
import { SupabaseAuthGuard } from "./modules/auth/guards/supabase.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { ConfigurationModule } from "./modules/configuration/configuration.module";

@Module({
  imports: [
    ConfigModule.forRoot<ReturnType<typeof configuration>>({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    SupabaseModule,
    PrismaModule,
    ConfigurationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class AppModule {}
