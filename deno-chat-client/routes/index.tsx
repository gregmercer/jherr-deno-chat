/** @jsx h */
import { h, IS_BROWSER } from "preact";
import { useEffect, useState, useCallback } from "preact/hooks";
import Messages from "../islands/Messages.tsx";

export default function Home() {
  return (
    <Messages/>
  );
}
