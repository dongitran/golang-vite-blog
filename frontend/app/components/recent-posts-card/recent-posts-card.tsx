import { Paper, Text } from "@mantine/core";
import { IconFlame } from "@tabler/icons-react";
import { RecentPost } from "../recent-post/recent-post";
import { Tag } from "../tag/tag";
import classes from "./recent-posts-card.module.css";

export function RecentPostsCard() {
  return (
    <Paper withBorder radius="md" className={classes.tagCard}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <IconFlame />
          <Text>Recent Posts</Text>
        </div>
        <Tag />
      </div>

      <RecentPost />
      <RecentPost />
      <RecentPost />
      <RecentPost />
    </Paper>
  );
}
