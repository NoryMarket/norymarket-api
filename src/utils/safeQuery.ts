export const safeQuery = async <R>(
  caller: () => Promise<R>,
): Promise<{ data?: R; error?: unknown }> => {
  try {
    return {
      data: await caller(),
    };
  } catch (error: unknown) {
    return { error };
  }
};
