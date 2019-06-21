import axios, { AxiosResponse } from "axios";
import project from "../../project-configuration";
import { Giphy } from "../../model/entities/giphy.entity";

export interface PaginationResponse {
    offset: number;
    total_count: number;
    count: number;
}

export interface MetaResponse {
    msg?: string;
    status?: number;
    response_id?: string;
}

export interface GiphySearchResponse {
    data: Giphy[];
    pagination: PaginationResponse;
    meta: MetaResponse
}

export class GiphySearchParameters {
    constructor(
        public q: string = "a",
        public rating: string = "",
        public limit: number = project.config.PAGINATION_DEFAULT_LIMIT,
        public offset: number = 0,
        public lang?: string,
        public fmt?: string
    ) {

    }
}

export class GiphyService {

    public search(searchParameters?: GiphySearchParameters): Promise<AxiosResponse<GiphySearchResponse>> {

        if (!searchParameters)
            searchParameters = new GiphySearchParameters();

        if (!searchParameters.q)
            searchParameters.q = "a";

        if (!searchParameters.lang)
            searchParameters.lang = "en";

        if (searchParameters.limit < 1 || searchParameters.limit > project.config.MAX_PAGINATION_LIMIT)
            throw new Error("Limit is out of the range 1  to 500, current value is " + searchParameters.limit + " in the Giphy Search Service. Please check");

        let url = project.config.GIPHY_REST_BASE_URL +
            "/v1/gifs/search?api_key=" + project.config.GIPHY_API_KEY +
            "&limit=" + searchParameters.limit +
            "&lang=" + searchParameters.lang;

        if (searchParameters.q)
            url += "&q=" + searchParameters.q;

        if (searchParameters.offset > 0)
            url += "&offset=" + searchParameters.offset;


        if (searchParameters.rating)
            url += "&rating=" + searchParameters.rating;

        if (searchParameters.fmt)
            url += "&fmt=" + searchParameters.fmt;

        return axios.get<GiphySearchResponse>(url);
    }
}