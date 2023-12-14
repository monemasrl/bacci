import React from "react";
import TestoImmagine from "./testo_immagine";
import BlockHero from "./block_hero";
import Cards from "./cards";
const Components = {
    testo_immagine: TestoImmagine,
    block_hero: BlockHero,
    Blocchi: Cards
}

const BlocksComponent = (component, index, allineamento, content, pageName) => {
    console.log(content, 'content')
    if (typeof Components[component] !== "undefined") {
        return React.createElement(Components[component], {
            index: index,
            allineamento: allineamento,
            content: content,
            pageName: pageName
        });
    }
}

export default BlocksComponent