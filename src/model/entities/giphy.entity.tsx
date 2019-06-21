import { GiphyUser } from "./giphy-user.entity";
import { GiphyImage } from "./giphy-image.entity";

export class Giphy {
    constructor(
        public type?: string,
        public id?: string,
        public slug?: string,
        public url?: string,
        public bitly_url?: string,
        public embed_url?: string,
        public username?: string,
        public source?: string,
        public rating?: string,
        public content_url?: string,
        public user?: GiphyUser,
        public source_tld?: string,
        public source_post_url?: string,
        public update_datetime?: string,
        public create_datetime?: string,
        public import_datetime?: string,
        public trending_datetime?: string,
        public images?: GiphyImage,
        public title?: string
    ) {

    }
}
