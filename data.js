// All site content lives here. Edit, then run: node build.mjs
// The site is told as one trading day. Each section is a part of the session.
const SITE = {
  name: "Imran Rafick",
  short: "Imran", alias: "BobbyyJames",
  url: "https://imranrafick.com/", // TODO: real domain
  role: "Chartist, builder",
  location: "Malaysia",
  description: "Imran Rafick, known online as BobbyyJames, is a Malaysian chartist and builder trading stocks and futures. Reading charts comes first, then building companies like KLYNN, and learning a lot along the way.",
  masthead: { title: "The Session", sub: "A chartist's journal by Imran Rafick", dateline: ["Malaysia", "Stocks and futures", "Chartist"] },
  hero: { lines: ["Discipline first.", "Freedom follows."], kicker: "Chartist, builder" },
  tape: ["Discipline", "Patience", "Risk first", "Process", "One good session", "Freedom", "Review every trade", "Protect the account", "Build", "Learn"],
  premarket: {
    label: "Premarket", title: "Who I am",
    body: ["I'm Imran. I'm a chartist. I love reading charts, any market, any timeframe, and I'd do it even if nobody paid me.", "Right now I put that into futures. I started with swing trading and I'm moving into day trading, and that shift is where most of my focus goes.", "Alongside it I build KLYNN startup, Exy's Lab and I learn as much as I can along the way.", "The long game is financial freedom, earned one good session at a time."]
  },
  profile: {
    label: "Profile", title: "About Imran", sub: "Particulars, for the record",
    photo: "assets/profile.jpg", 
    known: "Known online as BobbyyJames",
    facts: [
      ["From", "Malaysia"],
      ["Languages", "Malay, English, Korean (TOPIK 5)"],
      ["Community", "Led the Malaysian scholars' community in Korea, 2022 to 2026. Runs Exy's Lab, 60k members across Telegram and Instagram"],
      ["Ventures", "KLYNN (cofounder and CFO), Eve Capital Ventures, Exy's Lab"],
      ["Markets", "Stocks and futures"],
      ["At heart", "Chartist"]
    ]
  },
  open: {
    label: "The Open", title: "From swing to day",
    phases: [
      { tf: "Daily", name: "Swing trading", body: "Where I started. Fewer trades, longer holds, learning to read the bigger picture." },
      { tf: "Five minute", name: "Day trading futures", body: "Where I'm going. Faster decisions, tighter plans, a clear finish to every session." }
    ],
    note: "I trade futures through a prop firm. No screenshots of numbers here. What I care about is getting better at the process."
  },
  risk: {
    label: "Risk", title: "House rules",
    rules: [
      { name: "Process", body: "A plan before the open, a review after the close. Same routine, every day." },
      { name: "Risk", body: "Risk is set before the trade, not during it. Protecting the account comes first." },
      { name: "Getting better", body: "Journal every trade, find the mistakes, fix one thing at a time." }
    ]
  },
  ventures: {
    label: "Midday", title: "Holdings", sub: "Statement of things I build and run",
    items: [
      { name: "KLYNN", tag: "Co founder and CFO", body: "A premium laundry service for tourists in Langkawi and Kuala Lumpur. I run the numbers and help steer the business.", accent: true },
      { name: "Eve Capital Ventures", tag: "My own venture", body: "My own vehicle for the things I want to build and back over the long run." },
      { name: "Exy's Lab", tag: "Crypto community, Telegram", body: "Co run with Exy. I handle the analysis, education, market updates and research." },
      { name: "Exy Crypto", tag: "Instagram", body: "Crypto education for people who want to understand the market before they touch it." },
      { name: "Bobbyy2Cent", tag: "Threads and Instagram", body: "My personal content, in Bahasa Malaysia. Honest takes, my two cents." }
    ]
  },
  learning: {
    label: "Afternoon", title: "Watchlist", sub: "What I'm learning along the way",
    items: [
      { name: "Markets and Finance", body: "Learning, testing and refining every week" },
      { name: "Building", body: "Trying and executing ideas to bring value to others" },
      { name: "Content", body: "Sharing what I learn through Exy's Lab and Bobbyy2Cent" },
      { name: "Reading list", body: "Minervini, Livermore, and whatever sharpens the edge" }
    ]
  },
  close: {
    label: "After the close", title: "Notes for tomorrow",
    now: ["Moving from swing trading to day trading futures", "Building KLYNN", "Growing Bobbyy2Cent"],
    community: "More from off the desk soon.", // TODO: placeholder, new content coming
    contact: "If you trade, build, or work in markets, I want to hear from you.",
    links: [
      { label: "Email", href: "mailto:imranrafick@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/imranrafick/" },
      { label: "Threads", href: "https://www.threads.com/@bobbyy2cent" },
      { label: "Instagram", href: "https://www.instagram.com/bobbyy2cent/" },
      { label: "X", href: "https://x.com/Bobbyy_Crypto" }
    ]
  }
};
if (typeof module !== "undefined") module.exports = SITE;
