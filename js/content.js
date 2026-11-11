/* =====================================================================
   NASH BROWIN — WORKS CONTENT
   ---------------------------------------------------------------------
   Every project in the "Works" carousel comes from this list. The site
   sorts it newest first by date (YYYY-MM-DD); projects without a date
   go last. Add, remove or edit entries and the site updates itself.

   id      : short unique name (used by links like data-open-project="wilsonn-intenchon")
   date    : release date, YYYY-MM-DD (leave "" if unknown)
   preview : short muted clip that plays on hover (videos/<name>-preview.mp4)
   youtube : (instead of preview) a YouTube video ID; the card plays it muted on hover
   full    : what opens when someone clicks the card. Either:
               - an mp4 file  ("videos/<name>.mp4"), or
               - a Vimeo / YouTube link ("https://youtu.be/...")
   start   : (optional) second to start the preview from
   quote   : (optional) { text, name, role } from the artist / collaborator
   stat    : (optional) { value, label } one small number for the card
   credits : list of [role, name] pairs shown in the player
   ===================================================================== */

window.PROJECTS = [
  {
    id: "bigbabygucci-cobalt-blue",
    title: "Cobalt Blue",
    client: "BIGBABYGUCCI",
    date: "2026-11-03",
    category: "Music Video",
    description: "Music video for BIGBABYGUCCI.",
    youtube: "v9NQkTuEPnY",
    full: "https://youtu.be/v9NQkTuEPnY",
    start: 30,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "petros-hot",
    title: "HOT",
    client: "Petros",
    date: "2026-10-09",
    category: "Music Video",
    description: "Music video for Petros.",
    youtube: "3fquIJ7WpKI",
    full: "https://youtu.be/3fquIJ7WpKI",
    start: 30,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "foreva-paid-zaza",
    title: "ZAZA",
    client: "Foreva Paid",
    date: "2026-06-03",
    category: "Music Video",
    description: "Music video for Foreva Paid.",
    preview: "videos/foreva-paid-zaza-preview.mp4",
    full: "videos/foreva-paid-zaza.mp4",
    start: 2,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "yoshi-yin-get-in-with-me",
    title: "Get In With Me",
    client: "Yoshi Yin",
    date: "2026-05-31",
    category: "Music Video",
    description: "Music video for Yoshi Yin.",
    youtube: "SgyiucBxxF0",
    full: "https://youtu.be/SgyiucBxxF0",
    start: 30,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "mili2skunk-purpose",
    title: "Purpose",
    client: "Mili2skunk",
    date: "2026-04-17",
    category: "Music Video",
    description: "Music video for Mili2skunk.",
    youtube: "Ie6zMyeiecI",
    full: "https://youtu.be/Ie6zMyeiecI",
    start: 30,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "yoshi-yin-fly-away",
    title: "Fly Away",
    client: "Yoshi Yin ft. Joozzi",
    date: "2026-02-13",
    category: "Music Video",
    description: "Music video for Yoshi Yin ft. Joozzi.",
    youtube: "Dpgwr-HLxTM",
    full: "https://youtu.be/Dpgwr-HLxTM",
    start: 30,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "javi-mac-elite",
    title: "Elite",
    client: "Javi Mac x Riff Raff x Mike G",
    date: "2026-02-04",
    category: "Music Video",
    description: "Music video for Javi Mac x Riff Raff x Mike G.",
    preview: "videos/javi-mac-elite-preview.mp4",
    full: "videos/javi-mac-elite.mp4",
    start: 0,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "jaimoe-view",
    title: "View",
    client: "Jaimoe",
    date: "2026-01-31",
    category: "Music Video",
    description: "Music video for Jaimoe.",
    youtube: "8XaP__-eDSE",
    full: "https://youtu.be/8XaP__-eDSE",
    start: 30,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "yoshi-yin-worried-about-me",
    title: "Worried About Me",
    client: "Yoshi Yin",
    date: "2026-01-25",
    category: "Music Video",
    description: "Music video for Yoshi Yin.",
    youtube: "b0_kmKiP2wc",
    full: "https://youtu.be/b0_kmKiP2wc",
    start: 30,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "mili2skunk-gata-favorita",
    title: "Gata Favorita",
    client: "Mili2skunk",
    date: "2025-07-30",
    category: "Music Video",
    description: "Music video for Mili2skunk.",
    preview: "videos/mili2skunk-gata-favorita-preview.mp4",
    full: "videos/mili2skunk-gata-favorita.mp4",
    start: 0,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "jahzae-rose-i-h8-my-anxiety",
    title: "I h8 mY Anxiety",
    client: "Jahzae Rose",
    date: "2025-04-11",
    category: "Music Video",
    description: "Music video for Jahzae Rose.",
    youtube: "0jehh_SNCMk",
    full: "https://youtu.be/0jehh_SNCMk",
    start: 30,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "petros-even-angels-cry",
    title: "Even Angels Cry",
    client: "Petros",
    date: "2023-06-16",
    category: "Music Video",
    description: "Music video for Petros.",
    preview: "videos/petros-even-angels-cry-preview.mp4",
    full: "videos/petros-even-angels-cry.mp4",
    start: 4,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "leeto-mix-it-up",
    title: "Mix It Up",
    client: "Leeto ft. Yoshi",
    date: "2023-05-24",
    category: "Music Video",
    description: "Music video for Leeto ft. Yoshi.",
    preview: "videos/leeto-mix-it-up-preview.mp4",
    full: "videos/leeto-mix-it-up.mp4",
    start: 0,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "petros-333",
    title: "333",
    client: "Petros",
    date: "2023-02-03",
    category: "Music Video",
    description: "Music video for Petros.",
    preview: "videos/petros-333-preview.mp4",
    full: "videos/petros-333.mp4",
    start: 0,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "wilsonn-intenchon",
    title: "Intenchon",
    client: "Wilsonn",
    date: "",
    category: "Music Video",
    description: "Music video for Wilsonn.",
    preview: "videos/wilsonn-intenchon-preview.mp4",
    full: "videos/wilsonn-intenchon.mp4",
    start: 0,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "leeto-no-idea",
    title: "No Idea",
    client: "Leeto",
    date: "",
    category: "Music Video",
    description: "Music video for Leeto.",
    preview: "videos/leeto-no-idea-preview.mp4",
    full: "videos/leeto-no-idea.mp4",
    start: 2,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "leeto-youhoo",
    title: "YouHoo",
    client: "Leeto",
    date: "",
    category: "Music Video",
    description: "Music video for Leeto.",
    preview: "videos/leeto-youhoo-preview.mp4",
    full: "videos/leeto-youhoo.mp4",
    start: 2,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
  {
    id: "bri-day-dreams",
    title: "Day Dreams",
    client: "Bri",
    date: "",
    category: "Music Video",
    description: "Music video for Bri.",
    preview: "videos/bri-day-dreams-preview.mp4",
    full: "videos/bri-day-dreams.mp4",
    start: 0,
    credits: [
      ["Director", "Nash Browin"],
    ],
  },
];

// newest first; undated projects keep their order at the end; year shown on each card
window.PROJECTS
  .map((p, i) => [p, i])
  .sort(([a, i], [b, j]) => (b.date || "").localeCompare(a.date || "") || i - j)
  .forEach(([p], k, arr) => { window.PROJECTS[k] = p; });
window.PROJECTS.forEach((p) => { if (p.date && !p.year) p.year = Number(p.date.slice(0, 4)); });

/* =====================================================================
   VIRAL WORK — the row under the 20M+ card
   ---------------------------------------------------------------------
   Kept newest first. views = YouTube view count when added (Nov 2026);
   the total under the heading is added up from these.
   ===================================================================== */

window.VIRAL = [
  { title: "UDontWannaSmoke", artist: "Flight", youtube: "_eEWQmTkIOs", date: "2025-11-28", views: 113537, start: 20 },
  { title: "I h8 mY Anxiety", artist: "Jahzae Rose", youtube: "0jehh_SNCMk", date: "2025-04-11", views: 73403, start: 20 },
  { title: "Even Angels Cry", artist: "Petros", youtube: "7ld2Nc8ELHY", date: "2023-06-16", views: 159936, start: 20 },
  { title: "vendetta!", artist: "Sadfriendd x Mupp", youtube: "CZWbgOXGvf4", date: "2022-08-05", views: 7470080, start: 20 },
  { title: "Let's Be Friends", artist: "YusDrew x Sad Frosty", youtube: "aXRtqtsYgBY", date: "2019-11-22", views: 1885141, start: 20 },
  { title: "Turning McDonalds Employee Into Viral Rapper in 24 Hours", artist: "Quadeca", youtube: "H5yktH_104I", date: "2019-11-22", views: 3888308, start: 20 },
  { title: "Turning Random Stranger Into Viral Rapper in 24 Hours", artist: "Quadeca", youtube: "kgKKt5ngbuM", date: "2019-10-19", views: 3976038, start: 20 },
  { title: "Walk Thru", artist: "Salim the Dream", youtube: "LzQFarWsvn8", date: "2019-10-19", views: 2354077, start: 20 },
  { title: "TOMFOOLERY!", artist: "Quadeca x EGOVERT x KIL x Moxas", youtube: "9k4azasazZ8", date: "2019-08-01", views: 1258788, start: 20 },
  { title: "HEY!", artist: "EGOVERT & KIL", youtube: "fY7imWULdwg", date: "2019-05-23", views: 2334699, start: 20 },
];
