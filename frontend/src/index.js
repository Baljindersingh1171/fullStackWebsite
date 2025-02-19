import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Filterdataprovider } from "./Context/FilteredData";
import { CartBadgeProvider } from "./Context/CartBadge";
import { SearchedProvider } from "./Context/SearchedProduct";
import { CartIdProvider } from "./Context/CartId";
import { AuthProvider } from "./Context/Login";
import { ProfileProvider } from "./Context/UserProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthProvider>
      <ProfileProvider>
        <CartIdProvider>
          <CartBadgeProvider>
            <Filterdataprovider>
              <SearchedProvider>
                <App />
              </SearchedProvider>
            </Filterdataprovider>
          </CartBadgeProvider>
        </CartIdProvider>
      </ProfileProvider>
    </AuthProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
