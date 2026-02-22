// Shared Tailwind CSS configuration
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'], heading: ['Poppins', 'sans-serif'] },
      colors: {
        brand: { 50:'#EFF4FA',100:'#D5DFF2',200:'#ADC0E5',300:'#85A0D8',400:'#5D81CB',500:'#3562BE',600:'#2A509D',700:'#1F3E7C',800:'#152C5B',900:'#0A1A3A',950:'#050D1D' },
        accent: { 50:'#FEF2F2',100:'#FDE6E7',200:'#FBD0D2',300:'#F5A3A6',400:'#E86367',500:'#C2090D',600:'#A3060A',700:'#850306' },
        whatsapp: { 500: '#25D366' }
      },
      boxShadow: { 'premium': '0 20px 40px -5px rgba(0,0,0,0.1), 0 10px 20px -5px rgba(0,0,0,0.04)' },
      animation: { 'bounce-slow': 'bounce 3s infinite' }
    }
  }
}
