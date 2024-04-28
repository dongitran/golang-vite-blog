import { Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { RecentPost } from "../recent-post/recent-post";
import { Tag } from "../tag/tag";
import classes from "./recent-posts-card.module.css";
import { useNavigate } from "@remix-run/react";

interface Post {
  id: string;
  title: string;
  banner_image: string;
  params: {
    tags: string[];
  };
}

interface ApiResponse {
  content: Post[];
}

export function RecentPostsCard() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("import.meta.env.VITE_API_URL", import.meta.env.VITE_API_URL);
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/recent-posts?tag=${selectedTag?.toLowerCase()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedTag]);

  const handlePostClick = (id: string) => {
    navigate(`/content/${id}`);
  };

  const selectPost = (tag: string) => {
    setSelectedTag(tag);
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
          <Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Recent Posts
          </Text>
        </div>
        <Tag
          setValue={(value) => {
            selectPost(value);
          }}
        />
      </div>

      {data &&
        data?.content
          ?.filter((item) => {
            const tags = item?.params?.tags;
            if (
              selectedTag?.toLowerCase() === "all" &&
              tags?.includes("trending")
            ) {
              return false;
            }
            return true;
          })
          ?.map((post: { id: string; title: string; banner_image: string }) => (
            <RecentPost
              key={post.id}
              title={post.title}
              bannerImage={post.banner_image}
              onClick={() => handlePostClick(post.id)}
            />
          ))}
    </Paper>
  );
}
