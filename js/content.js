/* =====================================================================
   NASH BROWIN — WORKS CONTENT
   ---------------------------------------------------------------------
   Every project in the "Works" carousel comes from this list.
   Add, remove or reorder entries and the site updates itself.

   preview : short muted clip that plays on hover (mp4, ~720p, 5–15s)
             e.g. "videos/basement-tapes-preview.mp4"
   full    : what opens when someone clicks the card. Either:
               - an mp4 file  ("videos/basement-tapes.mp4"), or
               - a Vimeo / YouTube link ("https://vimeo.com/123456789")
   start   : (optional) second to start the preview from
   quote   : (optional) a line from the artist / collaborator
   stat    : (optional) one small number for the purple card

   Everything below is placeholder: free stock clips from mixkit.co
   and made-up artists. Swap in the real stuff.
   ===================================================================== */

const MIX = (id, q = 720) => `https://assets.mixkit.co/videos/${id}/${id}-${q}.mp4`;

window.PROJECTS = [
  {
    title: "Basement Tapes",
    client: "Kilo Juniper",
    category: "Music Video",
    year: 2026,
    description: "Shot in one night in the room where the record was made. Every light we used fit in a backpack.",
    preview: MIX(36762),
    full: MIX(36762),
    start: 5,
    quote: {
      text: "He came to the session, heard the record once, and had the whole idea by the second play.",
      name: "Kilo Juniper",
      role: "Artist",
    },
    stat: { value: "1", label: "Night to\nshoot it" },
    credits: [
      ["Director", "Nash Browin"],
      ["Director of Photography", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Colorist", "Nash Browin"],
      ["Producer", "Placeholder Name"],
    ],
  },
  {
    title: "Corner Store",
    client: "Duke Halloway",
    category: "Music Video",
    year: 2026,
    description: "Five dancers, one block and about three hours before the streetlights cut out.",
    preview: MIX(51300),
    full: MIX(51300, 1080),
    quote: {
      text: "Nash let the dancers lead and built the edit around them instead of the other way round.",
      name: "Rae Okon",
      role: "Choreographer",
    },
    stat: { value: "3", label: "Hours on\nthe block" },
    credits: [
      ["Director", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Choreography", "Placeholder Name"],
      ["Director of Photography", "Placeholder Name"],
      ["Gaffer", "Placeholder Name"],
    ],
  },
  {
    title: "Low Ceiling",
    client: "Low Ceiling (club night)",
    category: "Live Visuals",
    year: 2025,
    description: "Visual loops for a monthly warehouse night, triggered live off the decks.",
    preview: MIX(4187),
    full: MIX(4187, 1080),
    quote: {
      text: "The room feels different on the nights his visuals are running. People notice.",
      name: "Dani Reyes",
      role: "Promoter",
    },
    stat: { value: "12", label: "Nights\nso far" },
    credits: [
      ["Visuals", "Nash Browin"],
      ["Live VJ", "Nash Browin"],
      ["Promoter", "Placeholder Name"],
      ["Lighting", "Placeholder Name"],
    ],
  },
  {
    title: "Pressure",
    client: "Vesper Ash — live",
    category: "Show Recap",
    year: 2025,
    description: "A recap of a sold-out 400-cap show, shot from inside the pit.",
    preview: MIX(48507),
    full: MIX(48507),
    quote: {
      text: "It looks like the night actually felt. Nobody else has gotten that right for us.",
      name: "Vesper Ash",
      role: "Artist",
    },
    stat: { value: "400", label: "People in\nthe room" },
    credits: [
      ["Director", "Nash Browin"],
      ["Camera", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Second Camera", "Placeholder Name"],
    ],
  },
  {
    title: "Side B",
    client: "Moira Selk",
    category: "Visualizer",
    year: 2025,
    description: "A visualizer for a 12-inch release, shot up close on the deck it was mixed on.",
    preview: MIX(42960),
    full: MIX(42960, 1080),
    quote: {
      text: "The first cut was the one we put out. That's never happened to me before.",
      name: "Moira Selk",
      role: "Producer & DJ",
    },
    stat: { value: "1", label: "Take, no\ncuts" },
    credits: [
      ["Director", "Nash Browin"],
      ["Director of Photography", "Nash Browin"],
      ["Colorist", "Nash Browin"],
    ],
  },
  {
    title: "Concrete Garden",
    client: "Short documentary",
    category: "Short Doc",
    year: 2024,
    description: "A short doc about the skate spot that doubles as the city's best free venue.",
    preview: MIX(4568),
    full: MIX(4568, 1080),
    quote: {
      text: "He hung around for months before he ever pulled the camera out. That's why it feels real.",
      name: "Marco Lindqvist",
      role: "Skater, featured",
    },
    stat: { value: "9", label: "Months\nfilming" },
    credits: [
      ["Director", "Nash Browin"],
      ["Director of Photography", "Nash Browin"],
      ["Editor", "Nash Browin"],
      ["Sound", "Placeholder Name"],
      ["Music", "Placeholder Name"],
    ],
  },
];
