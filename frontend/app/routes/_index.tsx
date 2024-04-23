import type { MetaFunction } from "@remix-run/node";
import { Welcome } from "~/components/Welcome/Welcome";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import { FooterLinks } from "~/components/footer/footer";
import { HeaderMegaMenu } from "~/components/header/header";
import { HeroBullets } from "~/components/hero/hero";
import { Content } from "~/components/content/content";

export const meta: MetaFunction = () => {
  return [{ title: "dongtranBlog" }, { name: "description", content: "" }];
};

export default function Index() {
  return (
    <div>
      <HeroBullets />
      <Content />
    </div>
  );
}
