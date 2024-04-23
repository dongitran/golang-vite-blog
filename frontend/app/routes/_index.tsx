import type { MetaFunction } from "@remix-run/node";
import { HeroBullets } from "~/components/hero/hero";
import { Content } from "~/components/content/content";
import { useEffect, useState } from "react";
import dotenv from "dotenv";
dotenv.config();

export const meta: MetaFunction = () => {
  return [{ title: "dongtranBlog" }, { name: "description", content: "" }];
};

export default function Index() {
  const [data, setData] = useState(null);

  console.log(process.env.BACKEND_URL, "3289adjsf");

  useEffect(() => {
    fetch("https://example.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(data, "data");
  return (
    <div>
      <HeroBullets />
      <Content />
    </div>
  );
}
