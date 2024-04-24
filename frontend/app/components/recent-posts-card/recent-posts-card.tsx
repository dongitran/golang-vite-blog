import { Paper, Text } from "@mantine/core";
import { IconFlame } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { RecentPost } from "../recent-post/recent-post";
import { Tag } from "../tag/tag";
import classes from "./recent-posts-card.module.css";
import { useNavigate } from "@remix-run/react";

interface Post {
  id: string;
  title: string;
  banner_image: string;
}

interface ApiResponse {
  content: Post[];
}

export function RecentPostsCard() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recent-posts`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePostClick = (id: string) => {
    console.log("clicked");
    navigate(`/content/${id}`);
  };

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

      {data &&
        data?.content?.map(
          (post: { id: string; title: string; banner_image: string }) => (
            <RecentPost
              key={post.id}
              title={post.title}
              bannerImage={post.banner_image}
              onClick={() => handlePostClick(post.id)}
            />
          )
        )}
    </Paper>
  );
}
