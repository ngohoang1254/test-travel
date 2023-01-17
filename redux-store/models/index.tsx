import { Models } from "@rematch/core";
import { destination } from "./destination-reducer";
import { home } from "./home-reducer";
import { posts } from "./posts-reducer";
import { tourplace } from "./tourplace-reducer";
export interface RootModel extends Models<RootModel> {
  destination: typeof destination;
  posts: typeof posts;
  tourplace: typeof tourplace;
  home: typeof home;
}
export const models: RootModel = {
  destination,
  posts,
  tourplace,
  home
};
