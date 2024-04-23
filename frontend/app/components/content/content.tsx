import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Paper,
} from "@mantine/core";
import { IconCheck, IconColorSwatch } from "@tabler/icons-react";
import image from "./image.svg";
import classes from "./content.module.css";
import { Tag } from "../tag/tag";
import { TagSelect } from "../tag-select/tag-select";
import {
  IconReceiptOff,
  IconFlame,
  IconCircleDotted,
  IconFileCode,
} from "@tabler/icons-react";
import { TrendArticle } from "../trend-article/trend-article";
import { RecentPostsCard } from "../recent-posts-card/recent-posts-card";

export function Content() {
  return (
    <Container size="xl">
      <div className={classes.inner}>
        <div className={classes.content} style={{ flex: 3 }}>
          <RecentPostsCard />
        </div>
        <div className={classes.content} style={{ flex: 2 }}>
          <Title className={classes.title}>Trending</Title>
          <TrendArticle />
          <TrendArticle />
        </div>
      </div>
    </Container>
  );
}
