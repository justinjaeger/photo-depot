import React, {useEffect, useState} from "react";

export default function Login(props) {

  return (
    <div>
      <a href="/api/getAuthURL">
        <button>LOG IN WITH GOOGLE</button>
      </a>
      <a href="/api/logout">
        <button>LOG OUT</button>
      </a>
    </div>
  );
};