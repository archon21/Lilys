import React from "react";
import { observer } from "mobx-react";
import { siteConfig } from "../../../../site-config";
import store from "../../../store";

import { Layout, Links } from "../../index";
import { Buttons, Inputs } from "../../element-components";

interface Props {}

const DesktopMenu: React.FC<Props> = () => {
  const { mode } = store.defaultState;

  const calculatedNavHeight =
    global.document?.getElementById("navigation")?.clientHeight || 0;

  return (
    <Layout.Flex column>
      {/* {mode === "edit" ? (
        <Layout.Grid layout={[50, 50]}>
          <Layout.Flex yAlign='flex-start'>
            <Inputs.Field >
            </Inputs.Field>
          </Layout.Flex>
          <Buttons.Button onClick={() => {
              
          }}>Logout</Buttons.Button>
        </Layout.Grid>
      ) : <div></div>} */}
      <Layout.Flex yAlign="center" xAlign="center">
        {siteConfig.client.nav.links.map(({ url, text, id }) => {
          return (
            <Links.Link
              margin="0 20px"
              typographyConfig={{
                color: "textQuinary",
                variant: "p",
                weight: "500",
              }}
              transitionConfig={{
                underline: true,
              }}
              key={text}
              to={url}
              externalConfig={null}
              onClick={() => {
                if (id) {
                  const content = global.document.getElementById(id);
                  if (content) {
                    const { x, y } = content.getBoundingClientRect();

                    const scrollTo = content.offsetTop - calculatedNavHeight;

                    global.window.scroll({ top: scrollTo, behavior: "smooth" });
                  }
                }
              }}>
              {text}
            </Links.Link>
          );
        })}
      </Layout.Flex>
    </Layout.Flex>
  );
};

export default observer(DesktopMenu);
