"use strict";
figma.showUI(__html__);

const getCustomComponentProperties = (customComponent) => {
    const componentProperties = Object.entries(customComponent);
    const formatedValues = componentProperties.map((property) => {
   
    const name = property[0];
    const value = property[1].value;

    return `${name}: ${value}`;
   })
   console.log(formatedValues);
   return formatedValues;
}

figma.ui.onmessage = async(pluginMessage) => {
    await figma.loadFontAsync({family: "Inter", style: "Regular"})

   
    if(pluginMessage === "Run_button_clicked"){
        const nodes = figma.currentPage.selection;
      
        // console.log(nodes, typeof nodes);

        // if(Object.keys(nodes[0]).includes("fontName")){
        //     console.log("Text")
        // }
        
        const values = getCustomComponentProperties(nodes[0].componentProperties);
        const text = figma.createText()
        text.characters = nodes[0].name + " / " + values.join(" / ");

        text.x = nodes[0].x + 12;
        text.y = nodes[0].y + nodes[0].height + 16;

        const pill = figma.createRectangle();
        pill.strokeWeight = 1;
        pill.strokes = [{type:"SOLID", color:{r: 1, g: 0.2, b: 0.5}}];

        pill.x = nodes[0].x ;
        pill.y = nodes[0].y + nodes[0].height +12;
        pill.resize(text.width + 20,23);
        pill.fills = [{type:"SOLID", color:{r: 1, g:1, b: 1},opacity:0}];
        pill.cornerRadius = 12;


        figma.group([text,pill],figma.currentPage);

     


    }
}


