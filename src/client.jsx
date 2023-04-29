import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

// console.log(import.meta.env.VITE_SANITY_PROJECT_ID);

export const client=createClient({
    projectId:"0fai3xyb",
    dataset:"production",
    apiversion:"2023-04-20",
    useCdn:true,
    token:import.meta.env.VITE_SANITY_TOKEN,
})
const builder =imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);