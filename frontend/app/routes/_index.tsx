import type { MetaFunction } from "@remix-run/node";
import { Content } from "../components/content/content";

export const meta: MetaFunction = () => {
  return [{ title: "dongtranBlog" }, { name: "description", content: "" }];
};

export default function Index() {
  return (
    <div>
      <Content />
    </div>
  );
}
