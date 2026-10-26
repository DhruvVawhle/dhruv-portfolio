/**
 * Renders a synchronous inline script in <head> to set data-theme before first paint.
 * Prevents FOUC (Flash of Unstyled Content / Flash of Incorrect Theme).
 */
export default function ThemeInitializer() {
  const scriptContent = `(function(){try{var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s||(d?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

  return (
    <script
      id="theme-initializer"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
}
