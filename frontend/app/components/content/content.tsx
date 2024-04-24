import { Container, Title } from "@mantine/core";
import classes from "./content.module.css";
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
