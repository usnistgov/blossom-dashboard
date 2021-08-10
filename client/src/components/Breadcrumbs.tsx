import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

const Breadcrumbs = () => {
  let { path, url } = useRouteMatch();

  const genCrumbs = () => {
    const paths = url.split("/");
    // paths.shift();

    let crumbElms = [];
    let linkUrl = "";

    for (const ind in paths) {
      let crumb = paths[ind];
      if (crumb == "") {
        crumb = "home";
        linkUrl = "";
      } else {
        linkUrl += "/" + crumb;
      }

      crumbElms.push(
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={linkUrl}>
            {crumb}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    }
    return <Breadcrumb>{crumbElms}</Breadcrumb>;
  };
  return genCrumbs();
};

export default Breadcrumbs;
