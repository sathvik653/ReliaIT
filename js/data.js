// Default content data - ported from data.ts and ContentContext.tsx

export const products = [
  {
    id: 'it-peripherals',
    title: 'IT Stationery',
    description: 'Complete range of high-quality IT and computer-related accessories and consumables.',
    longDescription: 'Modern workplaces rely heavily on IT infrastructure, and the right IT stationery is crucial for maintaining efficiency, organization, and seamless digital operations. Our Supply and Sales of IT Stationery service is designed to provide businesses, institutions, and professionals with a complete range of high-quality IT and computer-related accessories and consumables at competitive prices.',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    features: [],
    sections: [
      {
        title: "Computer Accessories",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b91a607?auto=format&fit=crop&w=600&q=80",
        items: [
          "Keyboards, mice, and mousepads",
          "Webcams and headsets",
          "Laptop cooling pads and stands",
          "Screen cleaners and anti-static kits",
          "Cable organizers and cord covers"
        ]
      }
    ]
  },
  {
    id: 'printing-supplies',
    title: 'Computer Stationery',
    description: 'Essential computer stationery for smooth and uninterrupted business operations.',
    longDescription: 'In today\'s digitally driven business environment, having the right computer stationery is essential to maintain smooth and uninterrupted operations. Our Supply and Sales of Computer Stationery service is tailored to meet the technology-related consumable needs of offices, educational institutions, and commercial setups. We offer a wide range of high-quality products at competitive prices, with reliable delivery and professional service.',
    category: 'Consumables',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    features: [],
    sections: [
      {
        title: "Printing and Paper Supplies",
        image: "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?auto=format&fit=crop&w=600&q=80",
        items: ["Continuous computer paper (single/multi-part)", "Dot matrix and inkjet-compatible papers", "Thermal and laser paper rolls", "Pre-printed stationery and customized forms", "A4/A3 copier paper (various GSM options)"]
      },
      {
        title: "Printer Cartridges and Toners",
        image: "https://images.unsplash.com/photo-1541625805562-b9b772099301?auto=format&fit=crop&w=600&q=80",
        items: ["Inkjet cartridges (Canon, HP, Epson, etc.)", "Laser toners (Black and color)", "Dot matrix printer ribbons", "Bulk ink and refill kits"]
      },
      {
        title: "Storage Media and Accessories",
        image: "https://images.unsplash.com/photo-1531062235864-5171bf941212?auto=format&fit=crop&w=600&q=80",
        items: ["USB flash drives and external hard drives", "CD/DVDs and Blu-ray discs", "Writable media and sleeves", "Keyboard covers, mouse pads, and screen cleaning kits"]
      }
    ]
  },
  {
    id: 'office-stationery',
    title: 'Office Stationery',
    description: 'We stock a wide variety of stationery items to support every department and function within your organization.',
    longDescription: 'We stock a wide variety of stationery items to support every department and function within your organization. Ensuring your team has the right tools is essential for productivity and efficiency. Our comprehensive range covers everything from daily writing instruments to essential filing systems and desk accessories.',
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=800&q=80',
    features: [],
    sections: [
      { title: "Writing instruments", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80", items: ["Pens", "pencils", "markers", "highlighters"] },
      { title: "Paper products", image: "https://images.unsplash.com/photo-1583521214690-73421a1829a9?auto=format&fit=crop&w=600&q=80", items: ["A4 sheets", "notebooks", "notepads", "sticky notes & diaries"] },
      { title: "Filing and organization", image: "https://images.unsplash.com/photo-1595839016160-c3505b82c788?auto=format&fit=crop&w=600&q=80", items: ["Folders", "files", "registers", "envelopes & binders"] },
      { title: "Office utilities", image: "https://images.unsplash.com/photo-1610459800645-8f6a39434778?auto=format&fit=crop&w=600&q=80", items: ["Staplers", "paper clips", "punching machine", "scissors & glue sticks"] },
      { title: "Printing supplies", image: "https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?auto=format&fit=crop&w=600&q=80", items: ["Printer cartridges", "toners", "photo paper"] },
      { title: "Desk accessories", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80", items: ["Desk organizers", "calendars", "whiteboards"] }
    ]
  }
];

export const industries = [
  {
    id: 'it-corporate',
    title: "IT & Corporate",
    iconName: "Building2",
    description: "Consumables, Storage, Peripherals, and Networking supplies for offices.",
    longDescription: "We provide a comprehensive range of IT essentials to keep your corporate office running efficiently. From daily consumables like printer cartridges and toners to critical infrastructure components like networking cables and power solutions. We also stock a wide variety of storage devices and ergonomic peripherals to support your workforce.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    features: ["Computer Consumables (Toners, Cartridges, Ribbons)", "Storage & Backup (SSD, HDD, USB, SD Cards)", "IT Accessories (Keyboards, Mice, Webcams, Cleaners)", "Networking Supplies (Cables, Routers, Connectors)", "Power Solutions (UPS, Spike Guards, Extension Cords)"]
  },
  {
    id: 'education',
    title: "Education",
    iconName: "School",
    description: "Complete lab setups and examination stationery for schools.",
    longDescription: "Educational institutions require durable technology and consistent supplies. We specialize in setting up computer labs for schools and colleges with robust desktops and networking. Additionally, we are a trusted supplier of examination stationery, including answer sheets, files, and administrative paper supplies.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    features: ["Computer Lab Desktops (Thin Clients/PCs)", "Projectors & Smart Boards", "Examination Answer Booklets", "Library Management Accessories"]
  },
  {
    id: 'government',
    title: "Government",
    iconName: "Landmark",
    description: "Tender-compliant supplies for state and central departments.",
    longDescription: "We are well-versed in Government procurement processes (GeM) and tender requirements. Our team ensures full compliance with specifications, timely delivery, and proper documentation for GST billing. We supply everything from heavy-duty printers for revenue departments to general stationery for administrative blocks.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    features: ["GeM Portal Registered Supplier", "Tender-Specific Procurement", "GST Compliant Invoicing", "High-Volume Paper Supply"]
  },
  {
    id: 'retail-sme',
    title: "Retail & SME",
    iconName: "Store",
    description: "Cost-effective billing solutions and daily consumables.",
    longDescription: "Small and Medium Enterprises (SMEs) and retail shops need cost-effective yet reliable solutions. We provide affordable billing hardware and day-to-day consumables. Our quick delivery ensures your shop never stops trading due to a lack of paper rolls or a faulty scanner.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
    features: ["POS Hardware Bundles", "Bill Books & Letterheads", "Barcode Stickers & Ribbons", "CCTV Surveillance Kits"]
  }
];

export const defaultContent = {
  general: {
    phone: "+91 98765 43210",
    email: "info@reliait.net",
    address: "Main Road, Rajahmundry, East Godavari District, Andhra Pradesh - 533101",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
    whatsapp: "919876543210"
  },
  hero: {
    titleLine1: "Reliable B2B IT &",
    titleLine2: "Banking Solutions",
    subtitle: "Providing high-performance infrastructure and essential supplies for leading public sector banks in East Godavari.",
    backgroundImage: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Explore Solutions"
  },
  stats: {
    items: [
      { label: 'Banking & Corp Clients', value: '200+' },
      { label: 'Products In Stock', value: '1200+' },
      { label: 'Years Experience', value: '6+' },
      { label: 'Orders Delivered', value: '8k+' },
    ]
  },
  about: {
    title: "Your Trusted Technology Partner In Rajahmundry",
    description1: "ReliaIT is a leading provider of IT hardware, office stationery, and enterprise networking solutions. With over two decades of experience, we have built a reputation for providing genuine products and unmatched service to corporate and government sectors.",
    description2: "We are proud to be an authorized dealer for global brands like HP, Dell, Lenovo, and Canon. Our deep expertise in banking infrastructure makes us the primary supply partner for major public sector bank branches across the East Godavari region.",
    yearsExperience: "20+",
    image1: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    image2: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  features: {
    items: [
      { title: "Genuine Products", desc: "100% Authentic IT hardware directly from leading OEMs." },
      { title: "Govt. Approved", desc: "Trusted GeM portal and tender-ready supplier." },
      { title: "Bulk Wholesale", desc: "Tiered pricing models for corporate bulk orders." },
      { title: "Express Delivery", desc: "Priority shipping for critical infrastructure needs." }
    ]
  },
  industries: industries,
  products: products,
  footer: {
    aboutText: "ReliaIT is your trusted B2B partner for comprehensive IT hardware and office supply solutions. Serving major bank branches and corporate offices across East Godavari.",
    quickLinks: [
      { label: 'Home', url: 'index.html' },
      { label: 'About Company', url: 'index.html#about' },
      { label: 'Industries Served', url: 'index.html#industries' },
      { label: 'Contact Support', url: 'index.html#contact' },
      { label: 'Privacy Policy', url: '#' }
    ],
    productLinks: [
      { label: 'IT Stationery', url: 'product.html?id=it-peripherals' },
      { label: 'Computer Stationery', url: 'product.html?id=printing-supplies' },
      { label: 'Office Stationery', url: 'product.html?id=office-stationery' }
    ]
  }
};
