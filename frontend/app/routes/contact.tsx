/* eslint-disable import/no-unresolved */
import type { MetaFunction } from "@remix-run/node";
import { Contact } from "~/components/contact/contact";

export const meta: MetaFunction = () => {
  return [{ title: "dongtranBlog" }, { name: "description", content: "" }];
};

export default function Index() {
  return (
    <div>
      <Contact />
    </div>
  );
}
