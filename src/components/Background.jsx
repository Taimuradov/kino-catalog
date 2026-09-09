import backgroundImage from "../assets/site-background.jpg";

function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[85vh] bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(15, 17, 21, 0) 0%,
            rgba(15, 17, 21, 0.02) 20%,
            rgba(15, 17, 21, 0.06) 40%,
            rgba(15, 17, 21, 0.15) 55%,
            rgba(15, 17, 21, 0.35) 70%,
            rgba(15, 17, 21, 0.65) 82%,
            rgba(15, 17, 21, 0.88) 92%,
            #0f1115 100%
          ),
          url(${backgroundImage})
        `,
      }}
    />
  );
}

export default Background;
