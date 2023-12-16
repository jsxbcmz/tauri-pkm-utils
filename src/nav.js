import Raid from "@pages/raid";
import PokemonInfo from "@pages/pokemonInfo";
import Menu from "@pages/menu";
import MapEvent from "@pages/mapEvent";

const nav = [
  {
    path: "/raid",
    component: Raid,
    title: "团战",
  },
  {
    path: "/mapEvent",
    component: MapEvent,
    title: "事件",
  },
  {
    path: "/pokemon",
    component: PokemonInfo,
    title: "宝可梦",
  },
  {
    path: "/menu",
    component: Menu,
    title: "食材",
  },
];

export default nav;
