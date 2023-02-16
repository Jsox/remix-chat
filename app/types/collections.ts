export type BlogPost = {
    id: ID;
    title: string;
};

export type BlogSettings = {
    display_promotions: boolean;
};

export type MyCollections = {
    posts: BlogPost;
    settings: BlogSettings;
};
