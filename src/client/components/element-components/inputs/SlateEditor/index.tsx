import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Node,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Icon } from "../../../content-components";
import { Buttons } from "../..";
import { Flex } from "../../../layout-components";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const RichTextExample = () => {
  const [value, setValue] = useState<Node[]>(defaultValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Flex>
        <MarkButton helperText="Help" format="bold" icon="format_bold" />
        <MarkButton helperText="Help" format="italic" icon="format_italic" />
        <MarkButton
          helperText="Help"
          format="underline"
          icon="format_underlined"
        />
        <MarkButton helperText="Help" format="code" icon="code" />
        <BlockButton helperText="Help" format="heading-one" icon="looks_one" />
        <BlockButton helperText="Help" format="heading-two" icon="looks_two" />
        <BlockButton
          helperText="Help"
          format="block-quote"
          icon="format_quote"
        />
        <BlockButton
          helperText="Help"
          format="numbered-list"
          icon="format_list_numbered"
        />
        <BlockButton
          helperText="Help"
          format="bulleted-list"
          icon="format_list_bulleted"
        />
      </Flex>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    // match: (n: Node) =>
    //   LIST_TYPES.includes(
    //     !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
    //   ),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon, helperText }) => {
  const editor = useSlate();
  return (
    <Buttons.Editor
      helperText={helperText}
      iconConfig={{ name: icon, color: "disabled" }}
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    ></Buttons.Editor>
  );
};

const MarkButton = ({ format, icon, helperText }) => {
  const editor = useSlate();
  const active = isMarkActive(editor, format)
  console.log(active);
  
  return (
    <Buttons.Editor
      helperText={helperText}
      active={active}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      iconConfig={{ name: icon, color: "disabled" }}
    ></Buttons.Editor>
  );
};

const defaultValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default RichTextExample;
