import { Paper, Title, Text } from "@mantine/core";
import { IconFlame } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import classes from "./trend-post-list.module.css";
import { useNavigate } from "@remix-run/react";
import { TrendingPost } from "../trend-post/trend-post";

interface Post {
  id: string;
  title: string;
  banner_image: string;
}

interface ApiResponse {
  content: Post[];
}

export function TrendPostList() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/trending-posts`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePostClick = (id: string) => {
    navigate(`/content/${id}`);
  };

  return (
    <Paper withBorder radius="md" className={classes.tagCard}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <IconFlame />

        <div
          style={{
            display: "flex",
          }}
        >
          <Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Trending
          </Text>
        </div>
      </div>

      {data &&
        data?.content?.map(
          (post: { id: string; title: string; banner_image: string }) => (
            <TrendingPost
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
