export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'media';
  website: string;
  description: string;
  featured?: boolean;
}

export interface Exhibitor {
  id: string;
  name: string;
  logo: string;
  category: string;
  website: string;
  description: string;
  boothNumber?: string;
}

export const sponsors: Sponsor[] = [
  {
    id: '1',
    name: 'TechCorp Global',
    logo: 'https://via.placeholder.com/200x100/4F46E5/FFFFFF?text=TechCorp',
    tier: 'platinum',
    website: 'https://techcorp.com',
    description: 'Leading technology solutions provider',
    featured: true
  },
  {
    id: '2',
    name: 'InnovateLabs',
    logo: 'https://via.placeholder.com/200x100/10B981/FFFFFF?text=InnovateLabs',
    tier: 'platinum',
    website: 'https://innovatelabs.com',
    description: 'Innovation and research powerhouse',
    featured: true
  },
  {
    id: '3',
    name: 'CloudFirst',
    logo: 'https://via.placeholder.com/200x100/F59E0B/FFFFFF?text=CloudFirst',
    tier: 'gold',
    website: 'https://cloudfirst.com',
    description: 'Cloud infrastructure and services'
  },
  {
    id: '4',
    name: 'DataMinds',
    logo: 'https://via.placeholder.com/200x100/EF4444/FFFFFF?text=DataMinds',
    tier: 'gold',
    website: 'https://dataminds.com',
    description: 'Data analytics and AI solutions'
  },
  {
    id: '5',
    name: 'StartupHub',
    logo: 'https://via.placeholder.com/200x100/8B5CF6/FFFFFF?text=StartupHub',
    tier: 'silver',
    website: 'https://startuphub.com',
    description: 'Startup ecosystem platform'
  },
  {
    id: '6',
    name: 'DevTools Pro',
    logo: 'https://via.placeholder.com/200x100/06B6D4/FFFFFF?text=DevTools',
    tier: 'silver',
    website: 'https://devtoolspro.com',
    description: 'Professional development tools'
  },
  {
    id: '7',
    name: 'TechMedia',
    logo: 'https://via.placeholder.com/200x100/84CC16/FFFFFF?text=TechMedia',
    tier: 'media',
    website: 'https://techmedia.com',
    description: 'Technology news and media'
  },
  {
    id: '8',
    name: 'CodeAcademy',
    logo: 'https://via.placeholder.com/200x100/F97316/FFFFFF?text=CodeAcademy',
    tier: 'bronze',
    website: 'https://codeacademy.com',
    description: 'Online learning platform'
  }
];

export const exhibitors: Exhibitor[] = [
  {
    id: '1',
    name: 'AI Solutions Inc',
    logo: 'https://via.placeholder.com/150x75/3B82F6/FFFFFF?text=AI+Solutions',
    category: 'Artificial Intelligence',
    website: 'https://aisolutions.com',
    description: 'Cutting-edge AI and machine learning solutions',
    boothNumber: 'A101'
  },
  {
    id: '2',
    name: 'Blockchain Pro',
    logo: 'https://via.placeholder.com/150x75/10B981/FFFFFF?text=Blockchain+Pro',
    category: 'Blockchain Technology',
    website: 'https://blockchainpro.com',
    description: 'Enterprise blockchain solutions',
    boothNumber: 'B205'
  },
  {
    id: '3',
    name: 'IoT Innovations',
    logo: 'https://via.placeholder.com/150x75/F59E0B/FFFFFF?text=IoT+Innovations',
    category: 'Internet of Things',
    website: 'https://iotinnovations.com',
    description: 'Smart IoT devices and platforms',
    boothNumber: 'C312'
  },
  {
    id: '4',
    name: 'CyberSecure',
    logo: 'https://via.placeholder.com/150x75/EF4444/FFFFFF?text=CyberSecure',
    category: 'Cybersecurity',
    website: 'https://cybersecure.com',
    description: 'Advanced cybersecurity solutions',
    boothNumber: 'D408'
  },
  {
    id: '5',
    name: 'GreenTech',
    logo: 'https://via.placeholder.com/150x75/84CC16/FFFFFF?text=GreenTech',
    category: 'Sustainable Technology',
    website: 'https://greentech.com',
    description: 'Eco-friendly technology solutions',
    boothNumber: 'E510'
  },
  {
    id: '6',
    name: 'QuantumLeap',
    logo: 'https://via.placeholder.com/150x75/8B5CF6/FFFFFF?text=QuantumLeap',
    category: 'Quantum Computing',
    website: 'https://quantumleap.com',
    description: 'Quantum computing research and applications',
    boothNumber: 'F615'
  }
];

export const sponsorTiers = {
  platinum: {
    name: 'Platinum Sponsors',
    color: 'from-purple-600 to-purple-800',
    textColor: 'text-purple-600',
    size: 'h-24'
  },
  gold: {
    name: 'Gold Sponsors',
    color: 'from-yellow-500 to-yellow-600',
    textColor: 'text-yellow-600',
    size: 'h-20'
  },
  silver: {
    name: 'Silver Sponsors',
    color: 'from-gray-400 to-gray-500',
    textColor: 'text-gray-600',
    size: 'h-16'
  },
  bronze: {
    name: 'Bronze Sponsors',
    color: 'from-orange-600 to-orange-700',
    textColor: 'text-orange-600',
    size: 'h-12'
  },
  media: {
    name: 'Media Partners',
    color: 'from-green-500 to-green-600',
    textColor: 'text-green-600',
    size: 'h-14'
  }
};