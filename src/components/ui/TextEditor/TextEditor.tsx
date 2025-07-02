import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";
import { Button, Tooltip } from "@heroui/react";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaHeading,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaCode,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { useEffect } from "react";

interface Proptypes {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor = (props: Proptypes) => {
  const { value, onChange } = props;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      OrderedList,
      BulletList,
      ListItem,
      Blockquote,
      Code,
      CodeBlock,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p>Tulis disini....</p>");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="bg-white shadow-sm p-4 border border-neutral-300 rounded-lg">
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex gap-1 bg-white shadow-lg p-1 border border-gray-200 rounded"
        >
          <Button
            isIconOnly
            size="sm"
            onPress={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-gray-200" : ""}
          >
            <FaBold />
          </Button>
          <Button
            isIconOnly
            size="sm"
            onPress={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-gray-200" : ""}
          >
            <FaItalic />
          </Button>
          <Button
            isIconOnly
            size="sm"
            onPress={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "bg-gray-200" : ""}
          >
            <FaUnderline />
          </Button>
          <Button
            isIconOnly
            size="sm"
            onPress={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-gray-200" : ""}
          >
            <FaStrikethrough />
          </Button>
        </BubbleMenu>
      )}

      <div className="flex flex-wrap gap-2 bg-gray-50 mb-3 p-2 rounded-md">
        <Tooltip content="Bold" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? "bg-primary-100 text-primary-600" : ""
            }
          >
            <FaBold />
          </Button>
        </Tooltip>

        <Tooltip content="Italic" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "bg-primary-100 text-primary-600" : ""
            }
          >
            <FaItalic />
          </Button>
        </Tooltip>

        <Tooltip content="Underline" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline")
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaUnderline />
          </Button>
        </Tooltip>

        <Tooltip content="Strikethrough" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike") ? "bg-primary-100 text-primary-600" : ""
            }
          >
            <FaStrikethrough />
          </Button>
        </Tooltip>

        <div className="bg-gray-300 mx-1 w-px h-6"></div>

        <Tooltip content="Heading 1" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? "bg-primary-100 text-primary-600 "
                : ""
            }
          >
            <FaHeading className="text-xs" />1
          </Button>
        </Tooltip>

        <Tooltip content="Heading 2" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaHeading className="text-xs" />2
          </Button>
        </Tooltip>

        <Tooltip content="Heading 3" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 })
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaHeading className="text-xs" />3
          </Button>
        </Tooltip>

        <div className="bg-gray-300 mx-1 w-px h-6"></div>

        <Tooltip content="Bullet List" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList")
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaListUl />
          </Button>
        </Tooltip>

        <Tooltip content="Ordered List" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList")
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaListOl />
          </Button>
        </Tooltip>

        <div className="bg-gray-300 mx-1 w-px h-6"></div>

        <Tooltip content="Blockquote" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive("blockquote")
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaQuoteLeft />
          </Button>
        </Tooltip>

        <Tooltip content="Code" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleCode().run()}
            className={
              editor.isActive("code") ? "bg-primary-100 text-primary-600" : ""
            }
          >
            <FaCode />
          </Button>
        </Tooltip>

        <Tooltip content="Code Block" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().toggleCodeBlock().run()}
            className={
              editor.isActive("codeBlock")
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaCode className="text-base" />
          </Button>
        </Tooltip>

        <div className="bg-gray-300 mx-1 w-px h-6"></div>

        <Tooltip content="Align Left" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" })
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaAlignLeft />
          </Button>
        </Tooltip>

        <Tooltip content="Align Center" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" })
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaAlignCenter />
          </Button>
        </Tooltip>

        <Tooltip content="Align Right" placement="bottom">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" })
                ? "bg-primary-100 text-primary-600"
                : ""
            }
          >
            <FaAlignRight />
          </Button>
        </Tooltip>
      </div>

      <EditorContent
        editor={editor}
        className="mx-auto p-4 border border-gray-200 rounded-md min-h-[200px] max-h-[300px] overflow-y-auto prose scrollbar-hide"
      />
    </div>
  );
};

export default TextEditor;
