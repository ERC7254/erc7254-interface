import tokensClient from "@/configs/tokens.client";
import { tTokenRevenue } from "@/types/token-revenue";

import { PaginationParam, PaginationResponse } from "./types";

const getTokenList = async (
  params: PaginationParam<tTokenRevenue>,
): Promise<PaginationResponse<tTokenRevenue>> => {
  return await tokensClient.get(`/created-token-list`, {
    params,
  });
};

const tokensService = {
  getTokenList,
};

export default tokensService;
