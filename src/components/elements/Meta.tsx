import React from "react";
import { Helmet } from "react-helmet";

const Meta = (props: { title: string, preview: string, image: string, url: string}) => {
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{props.title}</title>

      {/* Open Graph / Facebook */}
      <meta name="title" property="og:title" content={props.title} key="title"></meta>
      <meta property="og:type" content={"website"}></meta>
      <meta
        name="description"
        property="og:description"
        content={props.preview}
      ></meta>
      <meta
        name="image"
        property="og:image"
        content={"http://app.endla.com" + props.image}
      ></meta>
      <meta property="og:url" content={"https://app.endla.com" + props.url}></meta>
    </Helmet>
  );
};

export default Meta;
