import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

ReactDOM.render(
  <React.StrictMode>
    {/* Apollo 사용하기위해 provider 사용 */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
