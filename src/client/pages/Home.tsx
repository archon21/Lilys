import React, { Fragment, useEffect, useState } from "react";
import { observer } from "mobx-react";
import store from "../store";

import {
  Layout,
  Typography,
  Content,
  Inputs,
  
  Element,
  Composed,
} from "../components";
import { siteConfig } from "../../site-config";
import NavMenu from "../components/Nav/NavMenus";
import NavLogo from "../components/Nav/NavLogo";
import DesktopMenu from "../components/Nav/NavMenus/DesktopMenu";
import Util from "../util";
import { toJS } from "mobx";

interface DefaultState {
  base: Array<string>;
}

interface Props {
  defaultState: DefaultState;
}

const Home: React.FC<Props> = (props) => {
  // const [defaultState, setDefaultState] = useState({});
  const [pageConfig, setPageConfig] = useState({ mounted: false });

  const handleMount = async () => {
    await store.defaultStateGetter({ htmlRouteAccess: "Home" });
    

    setPageConfig({ ...pageConfig, mounted: true });
  };

  useEffect(() => {
    
    // if(!store.defaultState?.menus?.default) {
    handleMount();

    // }
  }, []);

  return pageConfig.mounted ? (
    <React.Fragment>
      <Layout.WindoW
        id="home"
        backgroundUrl={{
          url: store.defaultState.content.home.images.backgroundImage,
        }}
        init
        xAlign="flex-start"
        yAlign="flex-start"
        column>
        <Layout.Flex
          margin="1em 0 0 0"
          column
          xAlign="center"
          yAlign="flex-start">
          <NavLogo></NavLogo>
          <Inputs.Field></Inputs.Field>

          {store.window.clientWidth >
            siteConfig.client.required.layouts.tablet && (
            <Layout.Flex margin="1em 0 0" xAlign="center" yAlign="center">
              <DesktopMenu></DesktopMenu>
            </Layout.Flex>
          )}
          <Composed.Text accessor="homeLandingText" page='home'></Composed.Text>
          <Typography.Typography
            color="textQuinary"
            variant="h3"
            displayAlign={{ alignSelf: "center" }}
            textAlign="center"
            margin="1em 0 0 0"
            weight="bold">
            Lily's is now open and we look forward to seeing you!{" "}
          </Typography.Typography>
          <Typography.Typography
            color="textQuinary"
            variant="p"
            displayAlign={{ alignSelf: "center" }}
            textAlign="center"
            margin="2em 0 0"
            weight="500">
            Lily's is now open and we look forward to seeing you! Come in to
            enjoy a concise menu of premium steaks, seafood, sandwiches, and
            salads along with a selection of daily specials.
          </Typography.Typography>
          <Typography.Typography
            color="textQuinary"
            variant="p"
            displayAlign={{ alignSelf: "center" }}
            textAlign="center"
            margin="2em 0 0"
            weight="500">
            The space is intimate with 8 tables in the main dining room, and 5
            tables on the patio. There are 2 high tops on the patio considered
            our bar dining that has a high level of energy from the bar situated
            between the kitchen and patio.
          </Typography.Typography>
          <Typography.Typography
            color="textQuinary"
            variant="p"
            displayAlign={{ alignSelf: "center" }}
            textAlign="center"
            margin="2em 0 0"
            weight="500">
            Friendly, knowledgeable bartenders craft classic cocktails alongside
            a chef chosen wine and beer selection to complement the menu. We
            recommend making reservations and walk-ins are always welcome.
          </Typography.Typography>

          <Element.Buttons.Button
            color="textQuinary"
            background="backgroundPrimary"
            variant="h5"
            margin="2em 0"
            onClick={() => {
              const calculatedNavHeight =
                global.document?.getElementById("navigation")?.clientHeight ||
                0;
              const content =
                global.document.getElementById("diningGuidelines");
              if (content) {
                const { x, y } = content.getBoundingClientRect();

                const scrollTo = content.offsetTop - calculatedNavHeight;

                global.window.scroll({ top: scrollTo, behavior: "smooth" });
              }
            }}>
            {" "}
            Dining Guidelines
          </Element.Buttons.Button>
        </Layout.Flex>
      </Layout.WindoW>
      <Layout.WindoW
        xAlign="center"
        yAlign="center"
        column
        background="backgroundSecondary">
        <Layout.Flex
          id="menu"
          margin="2em 0"
          column
          yAlign="center"
          xAlign="center">
          <Composed.Menu id="default">
            {" "}
            <Layout.Flex yAlign="center" xAlign="center" width="80%">
              <Typography.Typography
                color="textTertiary"
                variant="span"
                displayAlign={{ alignSelf: "center" }}
                textAlign="center"
                margin="1em 0 0">
                * CONSUMING RAW OR UNDERCOOKED MEATS, POULTRY, SEAFOOD,
                SHELLFISH OR EGGS MAY INCREASE YOUR RISK OF FOODBORNE ILLNESS,
                ESPECIALLY IF YOU HAVE CERTAIN MEDICAL CONDITIONS.
              </Typography.Typography>
              <Typography.Typography
                color="textTertiary"
                variant="span"
                displayAlign={{ alignSelf: "center" }}
                textAlign="center"
                margin="1em 0 0">
                Menu subject to change
              </Typography.Typography>
            </Layout.Flex>
          </Composed.Menu>
        </Layout.Flex>

        <Layout.Flex
          id="cocktails"
          margin="2em 0"
          column
          yAlign="center"
          xAlign="center">
          <Composed.Menu id="drinks"></Composed.Menu>
        </Layout.Flex>

        <Layout.Flex
          id="gallery"
          margin="2em 0"
          column
          yAlign="center"
          xAlign="center">
          <Composed.Gallery
            layoutConfig={{
              mobile: 50,
              desktop: 33,
              tablet: 33,
            }}
            imageConfig={{
              items: store.defaultState.content.gallery.images,
              itemSpacing: "0",
              dimensionsConfig: {
                maxWidth: "100%",
                minWidth: '5em'
              },
            }}></Composed.Gallery>
        </Layout.Flex>
      </Layout.WindoW>
      <Layout.WindoW id="aboutUs" xAlign="center" yAlign="flex-start" column>
        <Layout.Flex maxWidth="45em">
          <Layout.Grid
            gridGap="1.5em"
            centerMobile
            margin="2.5em 0 "
            layout={[50, 50]}>
            <Content.Image
              boxShadow={true}
              maxWidth="14em"
              width="100%"
              src="/assets/images/family.jpeg"></Content.Image>
            <Typography.Typography
              color="textQuinary"
              variant="p"
              displayAlign={{ alignSelf: "center", justifySelf: "center" }}
              textAlign="left">
              Born in the Carolinas, Lily made her way to Connecticut at a young
              age. Tough as nails, and soft as silk; one would never know the
              hardships she’d endured by the sparkle in her eyes and smile
              across her face. Seeing people happy and healthy has always been a
              vigilant endeavor for her, and she’s as quick to hug and kiss as
              she is to selflessly protect those in need. She’s been the soul of
              our family since the beginning. And so, it’s only fitting that we
              name our first restaurant after our beloved dog, Lily.
            </Typography.Typography>
          </Layout.Grid>
          <Layout.Grid
            gridGap="1.5em"
            centerMobile
            margin="2.5em 0 "
            layout={[40, 60]}>
            <Typography.Typography
              color="textQuinary"
              variant="p"
              displayAlign={{ alignSelf: "center", justifySelf: "center" }}
              textAlign="left">
              Chef Michael and Emily Alfeld’s menu is simple, and focused on
              using the freshest ingredients possible. With a love for local
              food, wine, and beer the cuisine highlights the best that
              Connecticut has to offer, and much more.
            </Typography.Typography>
            <Content.Image
              boxShadow={true}
              maxWidth="14em"
              width="100%"
              src="/assets/images/building.jpeg"></Content.Image>
          </Layout.Grid>
          <Layout.Grid
            gridGap="1.5em"
            centerMobile
            margin="2.5em 0 "
            layout={[50, 50]}>
            <Content.Image
              boxShadow={true}
              maxWidth="14em"
              width="100%"
              src="/assets/images/dining.jpeg"></Content.Image>
            <Typography.Typography
              color="textQuinary"
              variant="p"
              displayAlign={{ alignSelf: "center", justifySelf: "center" }}
              textAlign="left">
              A simple and elegant dining room and bar, along with a beautiful
              wrap around porch, is a quaint and quiet setting in the uniquely
              historical and lively town of Colchester. With a full bar, and
              generous beer and wine menus, Lily’s is the perfect spot for a
              sumptuous dinner of the finest steaks and seafood, or just a
              cocktail and some laughs with friends. With more than 40 years of
              experience, Michael and Emily have brought their repertoires from
              around the country back to our home here in one of the most
              beautiful parts of New England. A fertile cornucopia with
              incomparable farm land and food products.
            </Typography.Typography>
          </Layout.Grid>
        </Layout.Flex>
      </Layout.WindoW>
      <Layout.WindoW
        id="diningGuidelines"
        xAlign="center"
        yAlign="flex-start"
        column
        background="backgroundSecondary"

        // backgroundUrl="/assets/"
      >
        <Layout.Flex
          margin="2em 0"
          column
          yAlign="center"
          xAlign="center"
          maxWidth="30em">
          <Typography.Typography
            color="textTertiary"
            variant="h3"
            textAlign="center"
            margin="0 0 .5em">
            Dining Guidelines & Dress Code
          </Typography.Typography>
          <Typography.Typography
            color="textTertiary"
            variant="h5"
            displayAlign={{ alignSelf: "center" }}
            textAlign="center"
            margin="2em 0 0 0">
            Dress Code
          </Typography.Typography>
          <Typography.Typography
            color="textTertiary"
            variant="p"
            displayAlign={{ alignSelf: "center" }}
            textAlign="center"
            margin="1em 0 0">
            Guest attire can elevate or diminish the experience of others. We
            consider tank tops, hats, flip flops, and team athletic attire too
            casual for our restaurants. Our staff takes pride in their
            appearance and we ask our guests to respect our attire guidelines.
          </Typography.Typography>

          <Typography.Typography
            color="textTertiary"
            variant="h5"
            displayAlign={{ alignSelf: "center" }}
            textAlign="center"
            margin="2em 0 0 0">
            Dinging Guidelines
          </Typography.Typography>
          <Typography.List
            margin="1em 0 0"
            listItemConfig={{
              typographyConfig: {
                color: "textTertiary",
                variant: "p",
                textAlign: "left",
              },
            }}
            items={[
              "We gladly accept Cash and most major Credit Cards (Visa, Mastercard and American Express).",

              "Our restaurant is not intended for large groups. The majority of our tables can accommodate only up to 4 people. Tables cannot be combined and split parties will likely not be seated adjacent to one another.        ",
              "Our restaurant is generally not the best environment for young children. We welcome families, but we ask parents to keep children at the table and calm vocal infants or youngsters outside of the main dining room and patio area. We do not offer child seating nor do we allow strollers/infant carriers in the main dining room or patio area.        ",
              "While we consider special requests, modifications are not always possible as they can impact the focus of the kitchen and the integrity of many dishes.        ",
              "Please notify us of any allergies as the ingredients listed on the menu are abbreviated.        ",
              "To minimize distractions to other guests, please take cell phone conversations out of seated areas, set devices to silent, and limit the use of laptops or tablets.        ",
              "Out of consideration for other guests who are waiting, we may ask for your table if a significant amount of time has passed. We typically never make this request short of 90 minutes after you are seated.      ",
            ]}></Typography.List>
        </Layout.Flex>
      </Layout.WindoW>
    </React.Fragment>
  ) : (
    <Fragment></Fragment>
  );
};

export default observer(Home);
