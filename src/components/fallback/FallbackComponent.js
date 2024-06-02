import React from "react";
import Styles from "./fallback.module.css";
export default function FallbackComponent() {
  return (
    <div className={Styles.main}>
      <h3>This Application Is Not Here</h3>
      <h4>404</h4>
      <h4>Page not found</h4>
    </div>
  );
}
