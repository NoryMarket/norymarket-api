export const configuration = () => {
  return {
    supabase: {
      url: process.env["SUPABASE_URL"],
      anonKey: process.env["SUPABASE_ANON_KEY"],
      serviceRoleKey: process.env["SUPABASE_SERVICE_ROLE_KEY"],
    },
  };
};

export type Configuration = ReturnType<typeof configuration>;
