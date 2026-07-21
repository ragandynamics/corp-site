export interface SEOProps {

    title:string;

    description:string;

    image?:string;

    canonical?:string;

}


export const siteConfig = {

    name:
    "Ragan Dynamics",

    title:
    "AI Consulting & Digital Transformation Singapore",

    description:
    "Ragan Dynamics helps organisations transform with enterprise AI, automation, cloud solutions and intelligent business platforms.",

    url:
    "https://ragandynamics.com",

    image:
    "/images/og-image.png",

    locale:
    "en_SG"

};



export function createSEO(
{
title,
description,
image,
canonical
}:SEOProps
){


return {


title:
`${title} | ${siteConfig.name}`,


description,


image:
image || siteConfig.image,


canonical:
canonical || siteConfig.url


};


}