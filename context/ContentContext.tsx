
import React, { createContext, useContext, useState, useEffect } from 'react';
import { industries as defaultIndustries, products as defaultProducts } from '../data.ts';
import { Industry, Product, ProductSection } from '../types.ts';
import { db } from '../firebase.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface LinkItem {
  label: string;
  url: string;
}

export interface SiteContent {
  general: {
    phone: string;
    email: string;
    address: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    backgroundImage: string;
    buttonText: string;
  };
  stats: {
    items: { label: string; value: string }[];
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    yearsExperience: string;
    image1: string; 
    image2: string; 
  };
  features: {
    items: { title: string; desc: string }[];
  };
  industries: (Industry & { features: string[], longDescription: string, image: string })[];
  products: (Product & { features: string[], longDescription: string, sections?: ProductSection[] })[];
  footer: {
    aboutText: string;
    quickLinks: LinkItem[];
    productLinks: LinkItem[];
  };
}

const defaultContent: SiteContent = {
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
  industries: defaultIndustries,
  products: defaultProducts,
  footer: {
    aboutText: "ReliaIT is your trusted B2B partner for comprehensive IT hardware and office supply solutions. Serving major bank branches and corporate offices across East Godavari.",
    quickLinks: [
      { label: 'Home', url: '/' },
      { label: 'About Company', url: '/#about' },
      { label: 'Industries Served', url: '/#industries' },
      { label: 'Contact Support', url: '/#contact' },
      { label: 'Privacy Policy', url: '#' }
    ],
    productLinks: [
       { label: 'IT Stationery', url: '/product/it-peripherals' },
       { label: 'Computer Stationery', url: '/product/printing-supplies' },
       { label: 'Office Stationery', url: '/product/office-stationery' }
    ]
  }
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => Promise<void>;
  resetContent: () => Promise<void>;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      let firebaseData = null;

      try {
        // Try Firebase first only if db is available
        if (db) {
          const contentDocRef = doc(db, 'site', 'content');
          const docSnap = await getDoc(contentDocRef);
          if (docSnap.exists()) {
            firebaseData = docSnap.data();
          } else {
             // If db exists but doc doesn't, we initialize it
             await setDoc(contentDocRef, defaultContent);
          }
        }
      } catch (error) {
        console.warn("Firebase unavailable or fetch failed, using local/default:", error);
      }

      if (firebaseData) {
        setContent(firebaseData as SiteContent);
      } else {
        // Fallback to local storage or defaults
        const saved = localStorage.getItem('reliait_content');
        if (saved) {
          setContent(JSON.parse(saved));
        } else {
          setContent(defaultContent);
        }
      }
      
      setIsLoading(false);
    };

    fetchContent();
  }, []);

  const updateContent = async (newContent: SiteContent) => {
    try {
      if (db) {
        const contentDocRef = doc(db, 'site', 'content');
        await setDoc(contentDocRef, newContent);
      } else {
        console.warn("Firebase not available, saving to localStorage only.");
      }
      setContent(newContent);
      localStorage.setItem('reliait_content', JSON.stringify(newContent));
    } catch (error) {
      console.error("Failed to update content:", error);
      throw error;
    }
  };

  const resetContent = async () => {
    try {
      if (db) {
        const contentDocRef = doc(db, 'site', 'content');
        await setDoc(contentDocRef, defaultContent);
      }
      setContent(defaultContent);
      localStorage.removeItem('reliait_content');
    } catch (error) {
      console.error("Failed to reset content:", error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
