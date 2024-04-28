import { Container } from "@mantine/core";
import classes from "./content.module.css";
import { RecentPostsCard } from "../recent-posts-card/recent-posts-card";
import { TrendPostList } from "../trend-post-list/trend-post-list";

export function Content() {
  return (
    <Container size="xl">
      <div className={classes.inner}>
        <div className={classes.content} style={{ flex: 3 }}>
          <RecentPostsCard />
        </div>
        <div className={classes.content} style={{ flex: 2 }}>
          <TrendPostList />
        </div>
      </div>
    </Container>
  );
}
