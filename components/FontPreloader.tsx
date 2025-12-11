export default function FontPreloader() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if (document.head) {
              const fonts = [
              ];
              fonts.forEach(font => {
                const existing = document.querySelector('link[href="' + font.href + '"]');
                if (!existing) {
                  const link = document.createElement('link');
                  link.rel = 'preload';
                  link.href = font.href;
                  link.as = 'font';
                  link.type = font.type;
                  link.crossOrigin = 'anonymous';
                  document.head.appendChild(link);
                }
              });
            }
          })();
        `,
      }}
    />
  );
}
