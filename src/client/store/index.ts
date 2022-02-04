import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";
import { siteConfig } from "../../site-config";
import Util from "../util";

const defaultMenu = {
  starters: {
    name: "Starters",
    description: "",
    items: [
      {
        name: "Dynamite Shrimp",
        price: 1400,
        description: "three colossal shrimp in a sriracha honey glaze",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Lobster Pot Pie",
        price: [2200, 4000],
        description: "puff pastry with a half lobster in cognac and cream",
        unit: "",
        includes: [],
        info: [],
      },

      {
        name: "the Crab Cake",
        price: [1600, 3200],
        description: "butter and dill remoulade with fresh greens",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Spinach and Artichoke Dip",
        price: 1200,
        description: "with house fried corn tortilla chips",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Cheese Plate",
        price: 1400,
        description: "local cheeses with toast and accoutrements",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Roasted Butternut Bisque",
        price: 1000,
        description: "local squash with goat cheese and croutons",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Spring Greens Salad",
        price: 900,
        description: "fresh greens with goat cheese and pickled carrot ribbons",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Caesar Salad",
        price: 1000,
        description:
          "baby romaine, garlic and croutons with parmigiano-reggiano",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "the Colchester Salad",
        price: 1800,
        description: "lobster with mesclun, walnuts, pear, blue cheese, lemon",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },

  mains: {
    name: "Mains",
    description: "",
    items: [
      {
        name: "Crispy Chicken Sandwich",
        price: 1600,
        description: "baby kale-slaw, tomato, and a sesame bun",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Cast Iron Steak*",
        price: 4100,
        description: "butter basted USDA Prime 8oz. filet with béarnaise",
        unit: "",
        options: [
          {
            name: "14oz. New York Strip",
            price: 5200,
          },
        ],
        includes: [],
        info: [],
      },
      {
        name: "Rigatoni Bolognese",
        price: 2400,
        description: "sausage and braised local beef",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "the Burger*",
        price: 1700,
        description:
          "local ground beef and cheese, kale-slaw, tomato, and a sesame bun",
        unit: "",
        includes: [],
        add: [
          {
            name: "add smoked bacon",
            price: 400,
          },
        ],
        info: [],
      },

      {
        name: "Sunset Salmon*",
        price: 3100,
        description: "citrus and charred tomato fondue with capellini",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Seafood Risotto",
        price: 3400,
        description: "day boat scallops and  U10 shrimp over riso cacio e pepe",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Lobster Roll",
        price: "MP",
        description: "a 1 ¼  pound lobster, hot or cold, on a brioche roll",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
  sides: {
    name: "Sides",
    description: "",
    items: [
      {
        name: "Shoestring Fries",
        price: 700,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Truffle Parm Fries",
        price: 1100,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },

      {
        name: "Garlic Asparagus",
        price: 900,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Lobster Mac & Cheese",
        price: 2800,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Mini Brioche Loaf",
        price: 800,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Green Beans & Bacon",
        price: 700,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
};

const brunchMenu = {
  theBenedicts: {
    name: "The Benedicts",
    description: [
      "Choose any two - 14",
      "Choose any three - 20",
      "Served with hashbrowns",
    ],
    items: [
      {
        name: "The Classic",
        description: "Nodine’s Canadian bacon",
        price: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Blackstone",
        description: "candied slab bacon and tomato",
        price: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Florentine",
        description: "sautéed “dirty’ spinach",
        price: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Salmon",
        description: "house smoked salmon and grilled onions",
        price: "+2",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Oscar",
        description: "crab cake and asparagus",
        price: "+3",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Steak*",
        description: "sliced USDA Prime filet",
        price: "+4",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Lobster",
        description: "hand-picked ½ Maine lobster",
        price: "+6",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
  breakfastClassics: {
    name: "Breakfast Classics",
    items: [
      {
        name: "2 Eggs Any Style",
        description: "ham or bacon, hashbrowns, and your choice of toast",
        price: 1400,
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Hash ‘n Eggs",
        description: "USDA Prime hash with two sunny side up eggs",
        price: 1600,
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Chicken and Waffles",
        description: "fried chicken with honey butter and spicy jam",
        price: 1800,
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Steak and Eggs*",
        description: "4oz. USDA Prime filet with two eggs and hash browns",
        price: 2800,
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Belgian Waffle",
        description: "served with whipped cream and fresh berries",
        price: 1400,
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "the Burger*",
        description:
          "local ground beef and cheese, kale-slaw, tomato, and a sesame bun",
        price: 1700,
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
  sides: {
    name: "Sides",
    description: "",
    items: [
      {
        name: "One Egg",
        price: 500,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Canadian Bacon",
        price: 600,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Candied Bacon",
        price: 1000,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Hashbrowns",
        price: 800,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Fresh Fruit Salad",
        price: 1200,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Toast",
        price: 400,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Yogurt and Granola",
        price: 800,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Mini Brioche Loaf",
        price: 800,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
};

const drinkMenu = {
  cocktails: {
    name: "Cocktails",
    description: "",
    items: [
      {
        name: "It’s One Banana, Michael",
        price: 1000,
        description: "what could it cost?",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Life is Good",
        price: 900,
        description: "raspberry stoli, 7up, pavan, cran",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "the Apple Cider Martini",
        price: 1400,
        description: "cider, calvados, lime, prosecco",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Peanut Butter Mai Tai ",
        price: 1100,
        description: "rum, orgeat, lime, curacao, peanut orgeat",
        unit: "",
        includes: [],
        info: [],
      },

      {
        name: "Classic Margarita",
        price: 1000,
        description: "espolon, lime, triple sec",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Espresso Martini",
        price: 1300,
        description: "vodka, vanilla, esspresso",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Pumpkin Spice White Russian",
        price: 1200,
        description: "vodka, kahlua, cream, pumpkin spice",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Rye Old Fashioned",
        price: 1400,
        description: "woodford reserve rye, orange bitters",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
  beers: {
    name: "Bootle Beers",
    description: "",
    items: [
      {
        name: "Budweiser, Bud Light, Miller Lite, Mich Ultra",
        price: 400,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Stella Artois, Corona, Sam Adams, Sam Summer",
        price: 500,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
  craft: {
    name: "Craft Cans",
    description: "",
    items: [
      {
        name: "Hooker #NoFilter IPA",
        price: 700,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
  scotch: {
    name: "Scotch and Cognac",
    description: "",
    items: [
      {
        name: "Laphroaig 10yr.",
        price: 1400,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Johnnie Walker Blue",
        price: 3000,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Glenmorangie 10yr.",
        price: 1400,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Macallan 12yr.",
        price: 1600,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Courvoisier VSOP",
        price: 1400,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Hine Rare",
        price: 1300,
        description: "",
        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
  whites: {
    name: "Whites",
    description: "",
    items: [
      {
        name: "Brisol",
        description: "brut prosecco",
        price: 4200,

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Da Luca",
        description: "prosecco 187mL.",
        price: 1100,

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Veuve Cliquot",
        description: "champagne",
        price: 8200,

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "The Palm",
        description: "rose",
        price: [1100, 4200],

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Toad Hollow",
        description: "chardonnay",
        price: [1000, 3900],

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Landmark Overlook",
        description: "chardonnay",
        price: [1200, 4500],

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Flowers",
        description: "chardonnay",
        price: 8800,

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Epic Run",
        description: "sauvignon blanc",
        price: [900, 3400],

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Mud House",
        description: "sauvignon blanc",
        price: [1100, 4000],

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Torre di Luna",
        description: "pinot grigio",
        price: [800, 3000],

        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
  reds: {
    name: "Reds",

    items: [
      {
        name: "Mondavi Private Select",
        description: "cabernet",
        price: [1000, 3900],

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Josh",
        description: "cabernet",
        price: [1200, 4500],

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Justin",
        description: "cabernet",
        price: 6700,

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Stag's Leap Artemis",
        description: "cabernet",
        price: 12500,

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Montpellier",
        description: "pinot noir",
        price: [900, 3400],

        unit: "",
        includes: [],
        info: [],
      },
      {
        name: "Carletto",
        description: "montepulciano",
        price: [900, 3400],

        unit: "",
        includes: [],
        info: [],
      },
    ],
  },
};

const handlePrice = ({ price }) => {
  if (typeof price === "string")
    return [
      {
        amount: 0,
        priceType: "market-price",
      },
    ];
  else if (typeof price === "number") {
    return [{ amount: price, priceType: "amount" }];
  } else if (Array.isArray(price)) {
    return price.map((i) => {
      return {
        amount: i,
        priceType: "amount",
      };
    });
  }
};

export interface DefaultState {}

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

// const requestHandler: Request = {};

class Store {
  defaultState: DefaultState = {
    content: {
      home: {
        images: {
          backgroundImage: "/assets/images/lobster.jpeg",
        },
      },
      menus: {},
      menu: {
        menu: defaultMenu,
        drinks: drinkMenu,
        brunch: brunchMenu,
      },
      gallery: {
        images: [
          {
            src: "/assets/images/plate1.jpeg",
          },
          {
            src: "/assets/images/bar.jpeg",
          },
          {
            src: "/assets/images/plate2.jpeg",
          },
          {
            src: "/assets/images/building.jpeg",
          },
          {
            src: "/assets/images/lobster.jpeg",
          },
          {
            src: "/assets/images/dining.jpeg",
          },
          {
            src: "/assets/images/mike.jpeg",
          },
          {
            src: "/assets/images/family.jpeg",
          },
          {
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
    console.log(defaultState, "d");
    if (Array.isArray(defaultState?.menus)) {
      const menus = {};
      defaultState.menus.forEach((menu) => (menus[menu.name] = menu));
      defaultState.menus = menus;
    }
    this.defaultState = defaultStateHandler({
      action: this.action,
      currentDefaultState: { ...this.defaultState, ...defaultState },
    });
    console.log("yo", toJS(this.defaultState));
    const { data } = await axios.post("/api/menu", {
      menus: [
        {
          name: "drinks",
          displayName: "Drinks",
          sections: Object.values(drinkMenu).map((section) => {
            return {
              name: section.name,
              description: section.description,
              items: section.items.map((item) => {
                const options = item.options
                  ? item?.options?.map((option) => {
                      return {
                        name: option.name,
                        price: handlePrice({ price: option.price }),
                        type: "option",
                      };
                    })
                  : [];

                const adds = item.add
                  ? item?.add?.map((option) => {
                      return {
                        name: option.name,
                        price: handlePrice({ price: option.price }),
                        type: "add",
                      };
                    })
                  : [];
                const newOptions = [...adds, ...options];
                return {
                  name: item.name,
                  description: item.description,
                  price: handlePrice({ price: item.price }),
                  unit: item.unit,
                  options: newOptions,
                };
              }),
            };
          }),
        },
      ],
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
      const userResponseData = await Util.Request({
        method: "POST",
        url: "/api/authentication",
        data: { email, password },
      });

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
