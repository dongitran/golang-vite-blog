import type { MetaFunction } from "@remix-run/node";
import { Welcome } from "~/components/Welcome/Welcome";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import { FooterLinks } from "~/components/footer/footer";
import { HeaderMegaMenu } from "~/components/header/header";
import { HeroBullets } from "~/components/hero/hero";
import { Content } from "~/components/content/content";
import {
  MDXEditor,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  SandpackConfig,
  ShowSandpackInfo,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  UndoRedo,
  CodeToggle,
  listsPlugin,
  quotePlugin,
  frontmatterPlugin,
  thematicBreakPlugin,
  directivesPlugin,
  tablePlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  headingsPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  KitchenSinkToolbar,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React from "react";

const defaultSnippetContent = `
export default function App() {
return (
<div className="App">
<h1>Hello CodeSandbox</h1>
<h2>Start editing to see some magic happen!</h2>
</div>
);
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

export const meta: MetaFunction = () => {
  return [{ title: "dongtranBlog" }, { name: "description", content: "" }];
};

export default function Index() {
  const ref = React.useRef<MDXEditorMethods>(null);
  return (
    <div>
      <ColorSchemeToggle />
      <button onClick={() => console.log(ref.current?.getMarkdown())}>
        Get markdown
      </button>

      <MDXEditor
        ref={ref}
        markdown="hello world"
        //className="dark-theme dark-editor"
        plugins={[
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          toolbarPlugin({
            toolbarContents: () => <KitchenSinkToolbar />,
          }),
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              txt: "text",
              tsx: "TypeScript",
            },
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
          markdownShortcutPlugin(),
        ]}
      />
    </div>
  );
}
