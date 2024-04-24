import type { MetaFunction } from "@remix-run/node";
import { rem, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "dongtranBlog" }, { name: "description", content: "" }];
};

export default function Index() {
  const { id } = useParams();
  const [data, setData] = useState<{ title: string; content: string } | null>(
    null
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/post/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <div style={{ maxWidth: rem(1000), margin: "0 auto" }}>
      <Title
        style={{
          textAlign: "center",
          marginBottom: rem(30),
          marginTop: rem(35),
          maxWidth: rem(1200),
        }}
      >
        {data?.title}
      </Title>
      <div style={{}}>
        <Markdown>{data && data?.content}</Markdown>
      </div>
    </div>
  );
}
