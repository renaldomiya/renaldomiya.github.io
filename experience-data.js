/* ============================================================
   EXPERIENCE DATA
   ------------------------------------------------------------
   The experience timeline is built entirely from this array.
   To add a placement, add an object here — nothing else to edit.

   Fields per entry:
     company   (required) Company name shown in the header.
     role      (required) Job title shown on the muted meta line.
     dates     (required) Date range shown on the muted meta line.
     accent    (required) Hex colour used for the logo tile tint,
                          the timeline dot, and the outcome pills.
     logo      (optional) Path to a logo image for the 64px tile.
                          Leave null to fall back to the monogram.
     monogram  (optional) 1–2 letters shown when there is no logo.
     about     (required) One sentence: what the company is and does.
     did       (required) One sentence: what I did there.
     images    (optional) 0–2 image paths. One renders full width,
                          two render side by side. Omit or leave empty
                          and no image section is rendered at all.
     outcomes  (optional) Short result strings, e.g. "25% less deflection".
                          Omit or leave empty to render no pills.
     tech      (optional) Tools and standards, rendered as chips.
                          Omit or leave empty to render no chips.
     current   (optional) true marks the placement as ongoing.
   ============================================================ */

const EXPERIENCE = [
  {
    company: 'Amphenol Canada Corp.',
    role: 'Engineering Design Student',
    dates: 'Sept – Dec 2026',
    location: 'Markham, ON',
    accent: '#1d4ed8',
    logo: null,
    monogram: 'A',
    current: true,
    about: 'Amphenol is one of the world’s largest interconnect manufacturers, and its Canadian division builds high-reliability connectors and motor jacks for aerospace, defence, and commercial systems.',
    did: 'I model and draft connector components in SolidWorks — manufacturing drawings, new product design through design review, and engineering change notices on released parts.',
    /* Drop the building photo in as images/exp-amphenol.jpg and swap this
       line for: images: ['images/exp-amphenol.jpg'], */
    images: [],
    outcomes: [],
    tech: ['SolidWorks', 'GD&T', 'ECN', 'DFM'],
    note: 'My first time designing parts that ship by the million — a tenth of a millimetre decides whether a connector mates.'
  },
  {
    company: 'TRIUMF',
    role: 'ARIEL Engineering Assistant',
    dates: 'Jan – Apr 2026',
    location: 'Vancouver, BC',
    accent: '#7c3aed',
    logo: null,
    monogram: 'T',
    about: 'TRIUMF is Canada’s national particle accelerator laboratory, and its ARIEL facility produces rare isotopes for physics research and medical isotope development.',
    did: 'I designed a wall-mounted steel frame for a radioactive gas manifold, sized it through iterative ANSYS FEA, and carried it through GD&T drawings, PDM-managed BOMs, and fabrication.',
    images: ['images/exp-triumf.png'],
    outcomes: ['25% less deflection', 'Under 2 mm at peak load', 'Under 105 MPa stress'],
    tech: ['SolidWorks', 'ANSYS', 'SolidWorks PDM', 'ASME Y14.5'],
    note: 'One small part of a huge project. The lesson wasn’t the FEA — it was keeping my design in sync with everyone else’s, and asking the technicians how they’d build it.'
  },
  {
    company: 'BC Hydro — Site C',
    role: 'Mechanical Engineering Co-op',
    dates: 'May – Aug 2024',
    location: 'Fort St. John, BC',
    accent: '#0e7490',
    logo: null,
    monogram: 'BC',
    about: 'BC Hydro is British Columbia’s provincial electric utility, and Site C is its hydroelectric dam on the Peace River, one of the province’s largest capital projects.',
    did: 'I redlined P&IDs and mechanical layouts for constructability, verified installations during field inspections, and turned RFIs and field change forms into coordinated design revisions.',
    images: ['images/exp-bchydro.png'],
    outcomes: [],
    tech: ['P&ID', 'AutoCAD', 'Field inspection', 'RFIs'],
    note: 'Living on camp beside the build, I started reading drawings the way the trades do. A design isn’t good until it can be built cleanly.'
  }
];
