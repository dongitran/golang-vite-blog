import { Pagination, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { RecentPost } from "../recent-post/recent-post";
import { Tag } from "../tag/tag";
import classes from "./recent-posts-card.module.css";
import { useNavigate } from "@remix-run/react";

export function RecentPostsCard() {
  const [data, setData] = useState(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/recent-posts?tag=${selectedTag?.toLowerCase()}&skip=${
        (selectedPage - 1) * 8
      }&limit=8`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalPage(Math.ceil(data?.total / 8));
        const recentPosts = data?.content
          ?.filter(
            (item: {
              id: string;
              title: string;
              banner_image: string;
              params: { tags: string[] };
            }) => {
              const tags = item?.params?.tags;

              if (
                selectedTag?.toLowerCase() === "all" &&
                tags?.includes("trending")
              ) {
                return false;
              }
              return true;
            }
          )
          ?.map(
            (post: {
              id: string;
              title: string;
              banner_image: string;
              params: { tags: string[] };
            }) => (
              <RecentPost
                key={post.id}
                title={post.title}
                bannerImage={post.banner_image}
                tags={post?.params?.tags}
                onClick={() => handlePostClick(post.id)}
              />
            )
          );

        setData(recentPosts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag, selectedPage]);

  const handlePostClick = (id: string) => {
    navigate(`/content/${id}`);
  };

  const selectPost = (tag: string) => {
    setSelectedTag(tag);
    setSelectedPage(1);
  };

  const handlePageChange = (page: number) => {
    setSelectedPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {data}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Pagination total={totalPage} onChange={handlePageChange} />
      </div>
    </Paper>
  );
}
