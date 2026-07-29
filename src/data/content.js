/* All copy below is transcribed from the client's supplied documents:
   Home Page Content.docx, Technologies.docx, Application page content.docx. */

/* Order 1-5 is the sequence specified in Home Page Content.docx. Products and
   Blogs are appended because they are real destinations with their own
   content, and burying commercial pages in a menu costs enquiries. */
export const nav = [
  { label: "Who we are", to: "/who-we-are" },
  { label: "Application", to: "/application" },
  { label: "Technology", to: "/technology" },
  { label: "Compounding", to: "/compounding" },
  { label: "Products", to: "/products" },
  { label: "Investors", to: "/investors" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact us", to: "/contact" },
];

/* Secondary destinations — in the menu sheet and the footer, not the bar. */
export const navSecondary = [
  { label: "Collaboration", to: "/collaboration" },
  { label: "Career", to: "/career" },
];

export const overview = {
  eyebrow: "Who we are",
  heading: "Redefining sustainability through next-generation innovations",
  body: "TerraOne is a modern biotechnology company. Our portfolio combines advanced biology with clean technology to deliver precision nutrition, intelligent release systems, and environmentally elegant performance.",
  note: "Conventional plastics have transformed industries but at an environmental cost. TerraOne is building the next generation of sustainable biomaterials that perform without leaving a permanent footprint.",
};

export const metrics = [
  {
    figure: "World first",
    label: "Non-GMO PHA biopolymer manufacturer",
    detail: "The first company anywhere to produce PHA entirely without genetically modified organisms.",
  },
  {
    figure: "50,000",
    unit: "TPA",
    label: "Planned production capacity",
    detail: "Fermentation capacity planned to serve industrial volumes, not pilot batches.",
  },
  {
    figure: "100%",
    label: "Biodegradable",
    detail: "Breaks down completely in soil, compost and marine conditions with no microplastic residue.",
  },
  {
    figure: "10",
    unit: "sectors",
    label: "Industries served",
    detail: "From packaging and agriculture through to biomedical and pharmaceutical delivery.",
  },
];

/* The sector index — every sector carries a persistent problem and a resolving answer.
   Problem and solution statements are verbatim from Home Page Content.docx. */
export const sectors = [
  {
    slug: "packaging",
    name: "Packaging",
    image: "/media/sectors/packaging.jpg",
    lede: "Protective, high-performance packaging designed to break down in soil, compost and marine environments alike.",
    problem:
      "Traditional plastic packaging creates long-persisting waste that pollutes land and oceans forever.",
    solution:
      "PHA-based packaging delivers performance that matches conventional plastic and biodegrades fully in soil, compost and marine conditions.",
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    image: "/media/sectors/agriculture.jpg",
    lede: "Soil-safe biopolymers for mulch films, seed coatings and controlled-release systems that degrade naturally in the field.",
    problem:
      "Plastic residue from mulch films and crop covers fragments into the soil, reducing fertility and clogging machinery year after year.",
    solution:
      "Mulch films and controlled-release coatings designed to break down in the field, so none of it needs retrieving and nothing accumulates.",
  },
  {
    slug: "aquaculture",
    name: "Aquaculture",
    image: "/media/sectors/aquaculture.jpg",
    lede: "Advanced PHA-based innovations designed to maximise productivity, support healthier aquatic life and sustainable aquaculture.",
    problem:
      "Feed additives, cages and nets shed plastics directly into the water systems that fish and shrimp depend on.",
    solution:
      "Marine-safe biological technologies that enhance gut health, boost yields, and protect aquatic environments.",
  },
  {
    slug: "animal-husbandry",
    name: "Animal Husbandry",
    image: "/media/sectors/animal-husbandry.jpg",
    lede: "Innovative technologies supporting animal wellbeing and productivity with a commitment to environmental sustainability.",
    problem:
      "Growing resistance and consumer scrutiny are forcing the sector to look beyond conventional feed inputs, as modern livestock farming demands higher productivity while reducing environmental impact.",
    solution:
      "Sustainable biological solutions that improve animal health, efficiency, and responsible farming practices.",
  },
  {
    slug: "cosmetics",
    name: "Cosmetics",
    image: "/media/sectors/cosmetics.jpg",
    lede: "Biodegradable microbeads and texturising agents that replace microplastics without compromising performance.",
    problem:
      "Beauty products like exfoliants and fillers often rely on synthetic ingredients and plastic-based materials that wash straight down the drain and can enter the food chain.",
    solution:
      "Biodegradable microbeads and texturising agents that replicate the feel and function of microplastics, with a lower environmental footprint.",
  },
  {
    slug: "biomedical",
    name: "Biomedical",
    image: "/media/sectors/biomedical.jpg",
    lede: "Biocompatible solutions enabling the future of medical innovation, designed to advance healthcare through sustainable science.",
    problem:
      "Non-degradable implants and devices demand follow-up surgery, raising cost, risk and patient overload.",
    solution:
      "Biocompatible, bioresorbable polymers for sutures, scaffolds and devices designed for next-generation medical applications.",
  },
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    image: "/media/sectors/pharmaceutical.jpg",
    lede: "Advanced, sustainable biopolymers engineered for safer, smarter drug delivery systems.",
    problem:
      "Conventional carriers struggle to release actives at the right rate, and leave synthetic residue behind.",
    solution:
      "Bioresorbable drug-delivery matrices engineered for controlled release, clean biodegradation and pharmaceutical innovation.",
  },
  {
    slug: "wastewater",
    name: "Waste Water",
    image: "/media/sectors/wastewater.jpg",
    lede: "Innovative biological solutions aimed at sustainable water management, environmental protection and a healthier planet.",
    problem:
      "Treatment plants are becoming a bottleneck for microplastics — passing them on rather than removing them.",
    solution:
      "Biodegradable technologies that improve treatment efficiency while supporting cleaner water systems.",
  },
  {
    slug: "textile",
    name: "Textile",
    image: "/media/sectors/textile.jpg",
    lede: "Biodegradable PHA materials redefining the future of sustainable textiles, combining performance with environmental responsibility.",
    problem:
      "Synthetic fabrics release microfibres with every wash — one of the largest single sources of ocean microplastics.",
    solution: "Biodegradable PHA materials driving a cleaner, circular future for textiles.",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    image: "/media/sectors/cosmetics.jpg",
    lede: "Bio-based alternatives delivering high-performance personal care with a lighter environmental footprint — everyday care that doesn't outlive the moment it was made for.",
    problem:
      "Everyday personal care products often depend on ingredients and packaging that persist in the environment.",
    solution:
      "Everyday essentials made from fully biodegradable materials for high-performance personal care with a lighter environmental footprint.",
  },
];

export const contrast = {
  eyebrow: "The problem we are solving",
  left: {
    kicker: "Conventional plastic",
    heading: "A material with no ending",
    body: "Conventional plastic is derived from petroleum and engineered to endure, yet the majority of it is discarded within minutes of first use. The consequences are long-lived: it persists in landfill for centuries, fragments into particles too small to recover, and migrates through soil, water and, ultimately, the food chain. Only a modest share is ever recycled, and much of what is collected is downcycled once before being discarded permanently. The material was never intended to have an ending, and it does not have one.",
  },
  right: {
    kicker: "Why PHA",
    heading: "An ending that resolves itself",
    body: "PHA is a naturally occurring polymer generated through fermentation, and the same microorganisms that synthesise it in nature are equally capable of breaking it down. In soil, in compost and in seawater it degrades fully and leaves no microplastic residue. No specialist facility is required, and no waste stream remains to be managed. In use it performs comparably to conventional plastic — reliable material performance, coupled with an end-of-life that resolves itself.",
  },
};

export const process = {
  eyebrow: "Process · Biotechnology",
  heading: "How we make it",
  body: "Five stages take a renewable feedstock to a finished, application-specific material. No genetically modified organisms are involved at any point.",
  steps: [
    {
      title: "Renewable feedstock",
      body: "Sugars, plant oils and waste streams supply the carbon that our cultures feed on.",
    },
    {
      title: "Microbial fermentation",
      body: "Naturally occurring, non-modified strains convert that carbon into PHA and store it inside the cell.",
    },
    {
      title: "PHA extraction",
      body: "The polymer is recovered from the biomass and refined to the purity each grade requires.",
    },
    {
      title: "Material engineering",
      body: "Strain and fermentation conditions are tuned to hit properties from rigid and brittle to soft and elastic.",
    },
    {
      title: "Applications",
      body: "Films, rigid parts, fibres, coatings and delivery matrices ship to ten sectors.",
    },
  ],
};

export const technologies = {
  eyebrow: "Technology",
  heading: "Six biopolymer technologies, one goal",
  body: "Not all bioplastics are the same, and no single material is right for every application. We work across six core biopolymer technologies, each with a distinct origin, processing behaviour and biodegradation profile.",
  items: [
    {
      code: "PHA",
      properties: ["100% bio-based", "Marine biodegradable", "Home & industrial compostable", "Low toxicity", "Low carbon footprint", "Tunable performance"],
      applications: ["Packaging", "Disposable tableware", "Agricultural films", "Medical devices"],
      compost: [{"env": "Industrial", "state": "yes"}, {"env": "Home", "state": "yes"}, {"env": "Marine", "state": "yes"}],
      short:
        "PHA (Polyhydroxyalkanoates) are biodegradable polyesters produced by microorganisms as intracellular carbon and energy storage compounds. It fully breaks down in soil and marine environments, making it a genuine alternative to conventional petroleum-based plastics like PLA.",
      traits: ["Bio-based", "Marine safe", "Home compostable", "Low carbon"],
      full: "Polyhydroxyalkanoates",
      lead: true,
      source: "Microbial fermentation",
      degrades: "Soil · fresh water · marine · home & industrial compost",
      body: "Produced by microbial fermentation from sugars, plant oils or waste feedstocks. Because it is made by living organisms rather than synthesised from petroleum, PHA breaks down completely in soil, fresh water and marine environments without leaving microplastic residue. Mechanically it can be engineered from rigid and brittle to soft and elastic by adjusting strain and fermentation conditions, which makes it adaptable to films, rigid packaging, fibres and coatings. Its biocompatibility also opens up medical and pharmaceutical uses that most bioplastics cannot touch.",
      tradeoff:
        "Fermentation-based production currently costs more than starch- or petroleum-based alternatives, so PHA is positioned where true marine and soil biodegradability is a requirement, not a preference.",
    },
    {
      code: "PBAT",
      properties: ["Flexible & tear resistant", "LDPE-like handling", "Industrial compostable", "Blends with PLA & starch", "Fossil-based feedstock", "Film-grade"],
      applications: ["Compost bags", "Produce bags", "Mulch films", "Flexible packaging"],
      compost: [{"env": "Industrial", "state": "yes"}, {"env": "Home", "state": "no"}, {"env": "Marine", "state": "no"}],
      short:
        "PBAT is a petroleum-derived biodegradable plastic often blended with PLA or starch materials to improve flexibility. It is compostable but relies on fossil feedstocks rather than microbial fermentation.",
      traits: ["Flexible", "Compostable", "Film-grade", "Blendable"],
      full: "Polybutylene Adipate Terephthalate",
      source: "Largely fossil-based building blocks",
      degrades: "Industrial compost",
      body: "Known for the flexibility and tear resistance it brings to compostable films. Structurally it behaves like conventional low-density polyethylene, giving it the stretch and toughness needed for bags, mulch films and flexible packaging — an area where many rigid bioplastics fall short.",
      tradeoff:
        "Fully biodegradable but not automatically bio-based. Standard and bio-based PBAT are not interchangeable on that front, so sourcing bio-based requires specifying it explicitly.",
    },
    {
      code: "PBS",
      properties: ["Runs on PP/PE lines", "Good heat resistance", "Tough", "Industrial compostable", "Bio- or fossil-based", "Blendable"],
      applications: ["Injection-moulded parts", "Agricultural films", "Rigid packaging", "Disposables"],
      compost: [{"env": "Industrial", "state": "yes"}, {"env": "Home", "state": "no"}, {"env": "Marine", "state": "no"}],
      short:
        "PBS (Polybutylene Succinate) is a biodegradable polyester made from succinic acid and butanediol. PBS offers PHA-like compostability and decent heat resistance. It has good mechanical properties and is used in packaging, agricultural films, and disposable products.",
      traits: ["Compostable", "Heat resistant", "Durable", "Food safe"],
      full: "Polybutylene Succinate",
      source: "Succinic acid + butanediol — petroleum or bio-based",
      degrades: "Industrial compost; soil depending on formulation",
      body: "Its standout property is processing behaviour very close to polypropylene and polyethylene, so manufacturers can run PBS on existing equipment with minimal retooling. Good thermal resistance and toughness compared with many other biodegradable polymers make it suitable for injection-moulded parts, agricultural films and rigid packaging.",
      tradeoff:
        "Frequently blended with starch, PLA or PBAT to balance cost, flexibility and degradation rate — a building block rather than a stand-alone material.",
    },
    {
      code: "PLA",
      properties: ["Fully bio-based", "Rigid & transparent", "Industrial compost only", "Low heat deflection", "Brittle unmodified", "Widely available"],
      applications: ["Cups & trays", "Rigid packaging", "Disposable utensils", "3D printing filament"],
      compost: [{"env": "Industrial", "state": "yes"}, {"env": "Home", "state": "no"}, {"env": "Marine", "state": "no"}],
      short:
        "PLA is a biodegradable thermoplastic made from fermented plant starches like corn or sugarcane. It is compostable only under industrial conditions and widely used in food packaging, disposable utensils, and 3D printing.",
      traits: ["Bio-based", "Rigid", "Industrial compost", "Low cost"],
      full: "Polylactic Acid",
      source: "Fermented plant sugars — corn, sugarcane",
      degrades: "Industrial compost only",
      body: "The most widely produced bio-based plastic in the world. Fully bio-based, with a transparency and rigidity that make it a close visual substitute for PET and polystyrene in cups, trays, films and rigid packaging. It processes well on standard plastic equipment, which has driven its scale and relatively lower cost.",
      tradeoff:
        "Brittle, with a low heat-deflection temperature. Compostable only under sustained industrial heat and moisture — not in home bins or open environments, so end-of-life claims must say so.",
    },
    {
      code: "Cellulose",
      properties: ["Most abundant natural polymer", "Oxygen & grease barrier", "Soil, compost & marine", "Century-long track record", "Derivative-dependent", "Nanocellulose reinforcement"],
      applications: ["Food packaging films", "Cellophane", "Coatings", "Composite reinforcement"],
      compost: [{"env": "Industrial", "state": "yes"}, {"env": "Home", "state": "yes"}, {"env": "Marine", "state": "yes"}],
      short:
        "Cellulose forms the structural backbone of plant cell walls and serves as feedstock for bioplastics and packaging films. It is abundant, renewable, and biodegradable.",
      traits: ["Abundant", "Renewable", "Barrier", "Biodegradable"],
      full: "Cellulose-based bioplastics",
      source: "Wood pulp, cotton, agricultural residues",
      degrades: "Soil · compost · marine, in unmodified forms",
      body: "The most abundant natural polymer on earth. Cellulose films have been used in packaging for close to a century, giving them regulatory and consumer familiarity newer biopolymers don't have, and they offer excellent oxygen and grease barrier properties for food packaging.",
      tradeoff:
        "Chemically modified versions such as cellulose acetate trade biodegradability for moisture resistance, so the sustainability profile depends heavily on the derivative used.",
    },
    {
      code: "TPS",
      properties: ["Lowest-cost bio-based", "Degrades fastest", "No fermentation step", "Moisture sensitive", "Usually blended", "Corn, potato or cassava"],
      applications: ["Loose-fill packaging", "Disposable cutlery", "Agricultural films", "Blend component"],
      compost: [{"env": "Industrial", "state": "yes"}, {"env": "Home", "state": "yes"}, {"env": "Marine", "state": "no"}],
      short:
        "TPS is a biodegradable plastic made by processing natural starch with plasticizers under heat and pressure. It's low-cost and fully compostable but sensitive to moisture.",
      traits: ["Low cost", "Fast to degrade", "Bio-based", "Blendable"],
      full: "Thermoplastic Starch",
      source: "Native corn, potato or cassava starch",
      degrades: "Soil · compost, often faster than other bioplastics",
      body: "One of the lowest-cost bio-based polymers available, derived directly from an abundant agricultural commodity without the fermentation step that PHA and PLA require. It degrades quickly and completely, which suits short-life applications like loose-fill packaging, disposable cutlery and agricultural films.",
      tradeoff:
        "Sensitive to moisture — it absorbs water from the air, affecting dimensional stability over time, so it is commonly blended with PBAT or PLA rather than used alone.",
    },
  ],
};

/* Application page — verbatim from Application page content.docx. */
export const applicationPage = {
  title: "PHA applications across industries",
  lede: "How a single biodegradable biopolymer is reshaping ten industries.",
  intro:
    "Polyhydroxyalkanoates (PHA) are a family of biodegradable polyesters produced naturally by microbial fermentation. Unlike conventional plastics derived from petroleum, PHA breaks down completely in soil, freshwater and marine environments, leaving no persistent microplastic residue. This combination of performance and true biodegradability has made PHA one of the most versatile bioplastics available today, with applications extending well beyond packaging into agriculture, medicine, textiles and industrial processes.",
  sectors: [
    {
      slug: "packaging",
      name: "Packaging",
      image: "/media/sectors/packaging.jpg",
      body: "Packaging is where PHA makes its most visible impact. As a fully biodegradable and compostable polyester, PHA can replace conventional plastics in films, rigid containers, coatings and single-use items such as bags, cutlery and straws. Unlike many bioplastics, PHA degrades not only in industrial composting facilities but also in soil and marine environments, which makes it a genuine solution for packaging that inevitably ends up outside formal waste systems. It offers a good balance of barrier properties, flexibility and strength, so it performs well in food wrapping, e-commerce packaging and agricultural mulch films.",
    },
    {
      slug: "aquaculture",
      name: "Aquaculture",
      image: "/media/sectors/aquaculture.jpg",
      body: "In aquaculture, PHA is used both as a feed additive and as a functional material within farming systems. When incorporated into fish and shrimp feed, PHA is metabolised by the gut microbiota to release short-chain fatty acids, which support gut health, improve immune response and reduce reliance on antibiotics — an important factor as the industry moves away from prophylactic antibiotic use. Beyond feed, biodegradable PHA-based nets, ropes and structural components reduce the risk of persistent plastic debris and ghost fishing gear accumulating in marine environments.",
    },
    {
      slug: "animal-husbandry",
      name: "Animal Husbandry",
      image: "/media/sectors/animal-husbandry.jpg",
      body: "PHA plays a growing role in livestock and poultry production as a natural alternative to synthetic growth promoters and antibiotics. Added to animal feed, it acts as a prebiotic-like compound that supports beneficial gut bacteria, improves feed conversion and strengthens disease resistance in cattle, poultry and swine. This is particularly valuable as regulators worldwide restrict antibiotic use in animal farming. PHA-based coatings and controlled-release matrices are also used to deliver vaccines, vitamins and minerals more effectively over time.",
    },
    {
      slug: "agriculture",
      name: "Agriculture",
      image: "/media/sectors/agriculture.jpg",
      body: "Agriculture benefits from PHA through biodegradable mulch films, seed coatings and controlled-release systems for fertilisers and pesticides. Traditional plastic mulch films must be collected and disposed of after each season, a costly and often incomplete process that leaves microplastics in the soil. PHA-based films break down naturally into the soil after their working life, removing that burden entirely while still delivering the weed suppression, moisture retention and temperature regulation that farmers rely on. For controlled-release fertilisers, PHA matrices slow nutrient leaching, improving uptake efficiency.",
    },
    {
      slug: "cosmetics",
      name: "Cosmetics",
      image: "/media/sectors/cosmetics.jpg",
      body: "The cosmetics industry uses PHA primarily as a biodegradable exfoliating microbead and as a film-forming or texturising agent in skincare formulations. With regulators banning persistent plastic microbeads in rinse-off products across many markets, PHA offers a direct, compliant substitute that breaks down without leaving microplastic residue in waterways. Its biocompatibility also makes it suitable for creams, lotions and encapsulation systems that deliver active ingredients gradually to the skin.",
    },
    {
      slug: "biomedical",
      name: "Biomedical",
      image: "/media/sectors/biomedical.jpg",
      body: "Biomedical applications take advantage of PHA's biocompatibility, biodegradability and mechanical tunability. It is used to manufacture sutures, surgical meshes, wound dressings and scaffolds for tissue engineering, where the material needs to support cell growth and then break down safely inside the body without triggering an adverse immune response. Because its degradation rate and mechanical properties can be adjusted by altering the monomer composition, device manufacturers can tailor PHA to specific clinical timelines.",
    },
    {
      slug: "pharmaceutical",
      name: "Pharmaceutical",
      image: "/media/sectors/pharmaceutical.jpg",
      body: "In pharmaceuticals, PHA is primarily valued as a carrier material for controlled and targeted drug delivery. Its biodegradability means that drug-loaded PHA particles, microspheres or implants release their active ingredients over a defined period and then break down into non-toxic byproducts, removing the need for surgical retrieval that some other implant materials require. This makes PHA well suited to long-acting injectables, cancer therapeutics needing localised sustained release, and vaccine delivery systems.",
    },
    {
      slug: "wastewater",
      name: "Wastewater Treatment",
      image: "/media/sectors/wastewater.jpg",
      body: "Wastewater treatment is both a source and an application area for PHA. On the production side, PHA can be synthesised directly from mixed microbial cultures grown on wastewater streams, turning an operational cost centre into a value-generating process while simultaneously treating the water. On the application side, PHA is used as a solid-phase carbon source in denitrification systems, where it slowly releases carbon to fuel the microbial breakdown of nitrates into harmless nitrogen gas.",
    },
    {
      slug: "textile",
      name: "Textile",
      image: "/media/sectors/textile.jpg",
      body: "In textiles, PHA is processed into fibres and blended with other natural or synthetic fibres to produce fabrics that combine performance with end-of-life biodegradability. PHA fibres can be spun using conventional textile equipment, which lowers the barrier for manufacturers looking to introduce more sustainable materials without overhauling production lines. The resulting fabrics are used in apparel, nonwovens, hygiene products and technical textiles.",
    },
    {
      slug: "food-and-beverages",
      name: "Food and Beverages",
      image: "/media/sectors/packaging.jpg",
      body: "The food and beverage sector uses PHA mainly for direct-contact packaging, including films, trays, cups and coatings for paper-based containers. Because PHA is generally recognised as safe for food contact and does not leach harmful substances, it is well suited to wrapping fresh produce, dairy and ready meals, as well as coating compostable cups to make them liquid-resistant without compromising biodegradability. PHA's gas and moisture barrier properties help extend shelf life, addressing food waste alongside packaging waste.",
    },
  ],
};

export const research = {
  eyebrow: "Research · Innovation",
  heading: "Engineering tomorrow's sustainable materials",
  body: "A multidisciplinary team works across microbiology, polymer science and process engineering to widen what PHA can do — new grades, better yields, and formulations tuned to the sectors that need them.",
  cta: { label: "Explore technology", href: "#technology" },
  pillars: [
    {
      title: "Advanced biotechnology",
      body: "Precision microbial engineering without genetic modification.",
    },
    {
      title: "Material innovation",
      body: "Continuous R&D across grades, blends and processing windows.",
    },
    {
      title: "Sustainable science",
      body: "Renewable feedstocks, including waste streams, into production.",
    },
    {
      title: "Global applications",
      body: "Formulations deployed across ten sectors and their supply chains.",
    },
  ],
};

export const faqs = [
  {
    q: "What is PHA?",
    a: "Polyhydroxyalkanoates are a family of biodegradable polyesters produced naturally by microorganisms, which store them inside the cell as carbon and energy reserves. Because living organisms make the material, living organisms can also break it down — completely, in soil, fresh water and marine environments.",
  },
  {
    q: "How is TerraOne different from other PHA manufacturers?",
    a: "TerraOne is the first company in the world to produce PHA entirely without genetically modified organisms. The fermentation runs on naturally occurring strains and renewable feedstocks, which matters for markets and certifications where GMO content is restricted.",
  },
  {
    q: "Which industries can use TerraOne materials?",
    a: "Ten sectors today: packaging, agriculture, aquaculture, animal husbandry, cosmetics, biomedical, pharmaceutical, waste water, textile and personal care. Grades are tuned per application rather than sold as a single general-purpose resin.",
  },
  {
    q: "Are TerraOne products marine biodegradable?",
    a: "Yes. PHA degrades in marine, soil and compost environments, including home compost, without requiring an industrial facility and without leaving microplastic residue behind.",
  },
  {
    q: "How does PHA compare with PLA on cost and performance?",
    a: "PLA is cheaper and processes on standard equipment, but it composts only under sustained industrial conditions and is brittle. PHA costs more to ferment, and in exchange it biodegrades in open soil and seawater and can be engineered from rigid to elastic. Where genuine environmental end-of-life is a requirement rather than a preference, that trade is the point.",
  },
  {
    q: "How can I work with TerraOne?",
    a: "Tell us the application, the volume and the performance envelope you need. Reach the team at info@terra1one.com or +91 805 8005 805 and we will route you to the right grade — or to compounding, if what you need is a blend.",
  },
];

export const insights = [
  {
    date: "2026-06-08",
    display: "8 June 2026",
    tag: "Aquaculture",
    title: "Gut microbiome science in fish farming: what the research actually shows",
  },
  {
    date: "2026-06-06",
    display: "6 June 2026",
    tag: "Packaging",
    title: "Five packaging materials that can replace conventional plastic in 2026",
  },
  {
    date: "2026-06-03",
    display: "3 June 2026",
    tag: "Agriculture",
    title: "Cover cropping and nitrogen fixation: reducing fertiliser dependency",
  },
];

export const company = {
  address:
    "203, Millennium Plaza, Sakinaka Telephone Exchange, Sakinaka, Mumbai 400 072",
  phone: "+91 805 8005 805",
  phoneHref: "+918058005805",
  email: "info@terra1one.com",
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "X", href: "#" },
  ],
  legal: [
    { label: "Privacy policy", to: "/privacy-policy" },
    { label: "Terms of use", to: "/terms-of-use" },
  ],
};
