import attributes from "./attributes.json";
import { StoryWrapper } from "../StoryWrapper/StoryWrapper";
import { HeroBullets } from "./HeroBullets";

export default { title: "HeroBullets" };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={HeroBullets} />;
}
