"use client";

import { useServerInsertedHTML } from "next/navigation";

const themeInitScript = `(function(){
 try{
  var s=localStorage.getItem("theme");
  document.documentElement.dataset.theme=s==="light"?"light":"dark";
 }catch(e){
  document.documentElement.dataset.theme="dark";
 }
})();`;

export default function ThemeScript() {
  useServerInsertedHTML(() => (
    <script
      id="theme-init"
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  ));

  return null;
}
