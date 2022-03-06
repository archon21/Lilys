import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";
import { siteConfig } from "../../site-config";
import Util from "../util";

export interface DefaultState {
  menus?: {};
}

export interface Request {
  type: "GET" | "POST" | "PATCH" | "DELETE" | string;
}

const noAction = {
  type: "",
};

const defaultStateHandler = ({
  action,
  currentDefaultState,
}: {
  action: Request;
  currentDefaultState: DefaultState;
}) => {
  return currentDefaultState;
};

class Store {
  defaultState: DefaultState = {
    content: {
      home: {
        images: {
          backgroundImage: "/assets/images/lobster.jpeg",
        },
      },
      menus: {},
      gallery: {
        images: [
          {
            id: 1,
            src: "/assets/images/plate1.jpeg",
          },
          {
            id: 2,
            src: "/assets/images/bar.jpeg",
          },
          {
            id: 3,
            src: "/assets/images/plate2.jpeg",
          },
          {
            id: 4,
            src: "/assets/images/building.jpeg",
          },
          {
            id: 5,
            src: "/assets/images/lobster.jpeg",
          },
          {
            id: 6,
            src: "/assets/images/dining.jpeg",
          },
          {
            id: 7,
            src: "/assets/images/mike.jpeg",
          },
          {
            id: 8,
            src: "/assets/images/family.jpeg",
          },
          {
            id: 9,
            src: "/assets/images/plate3.jpeg",
          },
        ],
      },
    },
    mode: "view",
  };
  action: Request = noAction;
  window = {
    scrollY: 0,
    lastScrollY: 0,
    clientWidth: global?.window?.innerWidth || 0,
  };
  user: { roles: [string]; mode: "view" | "edit"; token: string } = {
    roles: [""],
    mode: "edit",
    token: "",
  };
  content = {};

  constructor() {
    makeAutoObservable(this);
  }

  async defaultStateHandler({ defaultState }) {
    if (Array.isArray(defaultState?.menus)) {
      const menus = {};
      defaultState.menus.forEach((menu) => (menus[menu.name] = menu));
      defaultState.menus = menus;
    }
    this.defaultState = defaultStateHandler({
      action: this.action,
      currentDefaultState: { ...this.defaultState, ...defaultState },
    });

    this.action = { type: "" };
  }

  async defaultStateGetter({ htmlRouteAccess }) {
    const htmlRoute = siteConfig.server.htmlRoutes.find(
      (route) => route.component === htmlRouteAccess
    );

    const newDefaultState = {};
    for (let i = 0; i < htmlRoute.methods.length; i++) {
      let services = htmlRoute.methods[i].services;

      for (let j = 0; j < services.length; j++) {
        let service = services[j];
        let { data } = await Util.Request({
          url: `/api/${service.accessorName.toLowerCase()}`,
          method: "GET",
        });
        newDefaultState[service.stateName] = data;
      }
    }
    await this.defaultStateHandler({ defaultState: newDefaultState });
  }

  async defaultMenuHandler({ menu }) {
    if (menu._id) {
      const res = await Util.Request({
        method: "PATCH",
        url: "/api/menu",
        data: { menus: [menu] },
      });
      this.defaultStateGetter({ htmlRouteAccess: "Home" });
    }
  }

  async defaultUserHandler({ email, password, history }) {
    try {
      const userResponseData = await Util.API.User.login({ email, password });

      if (userResponseData?.data.mode) {
        await this.defaultStateHandler({ defaultState: { mode: "edit" } });

        history.push("/");
      }
    } catch (err) {
      alert(err);
    }
  }

  defaultScrollHandler({ scrollY, lastScrollY }) {
    this.window = { ...this.window, lastScrollY: lastScrollY, scrollY };
  }

  async defaultContentHandler({ content, action, accessor, page }) {
    try {
      if (action === "GET") {
      } else if (action === "SET") {
        await Util.Request({
          method: "POST",
          url: "/api/content",
          data: { items: content, page, accessor },
        });
        this.content = content;
      } else if (action === "INITIAL") {
        this.content = content.content;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

const store = new Store();

export default store;
