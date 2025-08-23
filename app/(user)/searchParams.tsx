import { parseAsString, createLoader } from "nuqs/server";

export const filterSearchParams = {
  tier: parseAsString.withDefault("all"),
  search: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(filterSearchParams);
