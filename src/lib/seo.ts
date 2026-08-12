export interface SEOProps {

    title:string;

    description:string;

    image?:string;

    canonical?:string;

}


export const siteConfig = {

    name:
    "RaganDynamics",

    title:
    "AI Consulting & Digital Transformation Singapore",

    description:
    "RaganDynamics helps organisations transform with enterprise AI, automation, cloud solutions and intelligent business platforms.",

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