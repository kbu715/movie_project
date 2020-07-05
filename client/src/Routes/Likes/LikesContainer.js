import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

function LikesContainer(props) {

  return (
    <div>
      <Helmet>
        <title>Mylist | Nomflix</title>
      </Helmet>

    </div>
  );
}

export default withRouter(LikesContainer);
