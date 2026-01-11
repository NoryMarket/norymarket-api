export const configuration = () => {
  const DATABASE_URL_ENV_NAME = "DATABASE_POOLER_URL";
  const DATABASE_PASSWORD_ENV_NAME = "DATABASE_PASSWORD";

  const rawDatabaseUrl = process.env[DATABASE_URL_ENV_NAME];
  const rawDatabasePassword = process.env[DATABASE_PASSWORD_ENV_NAME];

  const databasePasswordExpression = `$\{${DATABASE_PASSWORD_ENV_NAME}}`;

  const databaseUrl =
    !!rawDatabasePassword &&
    rawDatabaseUrl?.includes(databasePasswordExpression)
      ? rawDatabaseUrl.replace(databasePasswordExpression, rawDatabasePassword)
      : rawDatabaseUrl;

  console.log("databaseUrl", databaseUrl);
  return {
    supabase: {
      url: process.env["SUPABASE_URL"],
      anonKey: process.env["SUPABASE_ANON_KEY"],
      serviceRoleKey: process.env["SUPABASE_SERVICE_ROLE_KEY"],
    },
    database: {
      url: databaseUrl,
    },
  };
};

export type Configuration = ReturnType<typeof configuration>;
