/* =====================================================================
   NASH BROWIN — WORKS CONTENT
   ---------------------------------------------------------------------
   Every project in the "Works" carousel comes from this list.
   Add, remove or reorder entries and the site updates itself.

   preview : short muted clip that plays on hover (mp4, ~720p, 5–15s)
             e.g. "videos/night-shift-preview.mp4"
   full    : what opens when someone clicks the card. Either:
               - an mp4 file  ("videos/night-shift.mp4"), or
               - a Vimeo / YouTube link ("https://vimeo.com/123456789")
   start   : (optional) second to start the preview from
   The placeholder clips below are free stock from mixkit.co — replace them.
   ===================================================================== */

const MIX = (id, q = 720) => `https://assets.mixkit.co/videos/${id}/${id}-${q}.mp4`;

window.PROJECTS = [
  {
    title: "Night Shift",
    client: "Halden Motors",
    category: "Commercial",
    year: 2026,
    description: "A late-night drive spot for Halden's first electric coupe, shot over two nights downtown.",
    preview: MIX(44560),
    full: MIX(44560, 1080),
    quote: {
      text: "Nash took a thirty-second brief and turned it into the best-performing spot we've ever run.",
      name: "Alex Morgan",
      role: "Brand Director, Halden",
    },
    stat: { value: "3.2M", label: "Views in the\nfirst week" },
    credits: [
      ["Creative Director", "Nash Browin"],
      ["Director", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Director of Photography", "Placeholder Name"],
      ["Colorist", "Placeholder Name"],
      ["Producer", "Placeholder Name"],
    ],
  },
  {
    title: "Ghost Note",
    client: "Juno Vale — Solace Records",
    category: "Music Video",
    year: 2026,
    description: "One-take choreography piece for Juno Vale's lead single, lit entirely with practicals.",
    preview: MIX(40369),
    full: MIX(40369, 1080),
    quote: {
      text: "He found the movement in the song before the dancers did. The first cut was the release cut.",
      name: "Theo Marchetti",
      role: "Manager, Solace Records",
    },
    stat: { value: "1.4M", label: "Streams in\nmonth one" },
    credits: [
      ["Director", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Choreographer", "Placeholder Name"],
      ["Director of Photography", "Placeholder Name"],
      ["Gaffer", "Placeholder Name"],
    ],
  },
  {
    title: "Kissaten",
    client: "Independent Short",
    category: "Short Film",
    year: 2025,
    description: "A quiet short about a café that only opens after midnight, shot on location in Tokyo.",
    preview: MIX(4451),
    full: MIX(4451, 1080),
    quote: {
      text: "Patient, precise and completely his own. One of the most assured shorts we programmed.",
      name: "Lena Brandt",
      role: "Programmer, Nightlight Fest",
    },
    stat: { value: "6", label: "Festival\nselections" },
    credits: [
      ["Writer / Director", "Nash Browin"],
      ["Director of Photography", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Sound Design", "Placeholder Name"],
      ["Original Score", "Placeholder Name"],
    ],
  },
  {
    title: "Step & Repeat",
    client: "Moth & Ivory",
    category: "Fashion Film",
    year: 2025,
    description: "A slow-motion fashion film for Moth & Ivory's autumn collection, built around one staircase.",
    preview: MIX(35987),
    full: MIX(35987, 720),
    quote: {
      text: "The film did more for the collection than the lookbook, the show and the campaign combined.",
      name: "Ines Laurent",
      role: "Creative Lead, Moth & Ivory",
    },
    stat: { value: "4x", label: "Lift in\nsell-through" },
    credits: [
      ["Creative Director", "Nash Browin"],
      ["Director", "Nash Browin"],
      ["Director of Photography", "Nash Browin"],
      ["Stylist", "Placeholder Name"],
      ["Colorist", "Nash Browin"],
    ],
  },
  {
    title: "Saltwater",
    client: "Northbound Films",
    category: "Documentary",
    year: 2024,
    description: "A short documentary following the last family-run fishery on the north coast.",
    preview: MIX(4078),
    full: MIX(4078, 1080),
    quote: {
      text: "Nash has a rare instinct for when to stay quiet and let a moment breathe on screen.",
      name: "Samir Haddad",
      role: "Producer, Northbound",
    },
    stat: { value: "2", label: "Awards\nwon" },
    credits: [
      ["Director", "Nash Browin"],
      ["Director of Photography", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Executive Producer", "Placeholder Name"],
      ["Re-recording Mixer", "Placeholder Name"],
    ],
  },
  {
    title: "Altitude",
    client: "Kairo Studio",
    category: "Brand Film",
    year: 2024,
    description: "A launch film for Kairo's new headquarters, told from the city's skyline down.",
    preview: MIX(41375),
    full: MIX(41375, 1080),
    quote: {
      text: "Clear process, zero ego and a final film our whole company still shares a year later.",
      name: "Daniel Lee",
      role: "Head of Content, Orbit",
    },
    stat: { value: "7x", label: "Faster from brief\nto release" },
    credits: [
      ["Creative Director", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Drone Operator", "Placeholder Name"],
      ["Motion Design", "Placeholder Name"],
      ["Post Supervisor", "Nash Browin"],
    ],
  },
];
