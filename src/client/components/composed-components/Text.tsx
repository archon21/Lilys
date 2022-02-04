import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { toJS } from "mobx";

import store from "../../store";
import { Typography, Inputs } from "../index";
import Util from "../../util";

const _deserialize = ({ type, children }) => {
  switch (type) {
    case "block-quote":
      return <blockquote>{children}</blockquote>;
    case "bulleted-list":
      return <ul>{children}</ul>;
    case "heading-one":
      return (
        <Typography.Typography variant="h1">{children}</Typography.Typography>
      );
    case "heading-two":
      return (
        <Typography.Typography variant="h2">{children}</Typography.Typography>
      );
    case "heading-three":
      return (
        <Typography.Typography variant="h3">{children}</Typography.Typography>
      );
    case "heading-four":
      return (
        <Typography.Typography variant="h4">{children}</Typography.Typography>
      );
    case "heading-five":
      return (
        <Typography.Typography variant="h5">{children}</Typography.Typography>
      );
    case "heading-six":
      return (
        <Typography.Typography variant="h6">{children}</Typography.Typography>
      );

    //   case "list-item":
    //     return <li {...attributes}>{children}</li>;
    //   case "numbered-list":
    //     return <ol {...attributes}>{children}</ol>;
    case "align-left":
      return <div style={{ textAlign: "left" }}>{children}</div>;
    case "align-right":
      return <div style={{ textAlign: "right" }}>{children}</div>;
    case "align-center":
      return <div style={{ textAlign: "center" }}>{children}</div>;
    default:
      return <span >{children}</span>;
  }
};

const _recursivelyCreateTextNodes = ({ curr, arr }) => {

  if (Array.isArray(curr)) {
    for (let i = 0; i < curr.length; i++) {
      if(curr[i].children) {
          for(let j  = 0; j < curr.length; j++) {
              
          }
      }
      arr.push(_recursivelyCreateTextNodes({ curr: curr[i], arr }));
    }
  } else if (curr?.text) {
    arr.push(_deserialize({ type: curr?.type, children: curr?.text }));
  } else {

  }
  return arr;
};

interface RenderedTextProps {
  contentObjects: any;
}

const RenderedText: React.FC<RenderedTextProps> = memo(
  (props) => {
    const { contentObjects } = props;
    const [mounted, setMounted] = useState(false);

    const Components = _recursivelyCreateTextNodes({
      curr: contentObjects,
      arr: [],
    });



    return Components ? <Fragment>{Components}</Fragment> : <div />;
  },
  (prevProps, nextProps) => {
    return true;
  }
);

interface TextProps {
  accessor: string;
  page: string;
}

const Text: React.FC<TextProps> = (props) => {
  const { accessor, page } = props;

  const [contentObjects, setContentObjects] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {


    const newContentObjects = Util.Object.stringAccessor({
      object: store.content,
      accessor: `${page}.${accessor}`,
    });

    setContentObjects(
      newContentObjects || [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ]
    );
    setMounted(true);
  }, []);



  return mounted ? (
    Boolean(store.user?.roles?.includes("admin")) ? (
      <Inputs.SlateEditor
        accessor={accessor}
        page={page}
        defaultValue={toJS(contentObjects)}
      />
    ) : (
      <RenderedText contentObjects={toJS(contentObjects)} />
    )
  ) : (
    <div />
  );
};

export default observer(Text);
