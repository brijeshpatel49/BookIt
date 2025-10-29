import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import Experience from '../models/Experience';
import PromoCode from '../models/PromoCode';
import Booking from '../models/Booking';

// Load environment variables
dotenv.config();

// Seed data for experiences
const experiences = [
  {
    title: 'Northern Lights Adventure in Iceland',
    description: 'Witness the magical Aurora Borealis dancing across the Arctic sky on this unforgettable journey.',
    longDescription: 'Embark on a once-in-a-lifetime adventure to witness the spectacular Northern Lights in Iceland. This guided tour takes you away from city lights to the best viewing locations. Our expert guides will share fascinating insights about this natural phenomenon while you enjoy hot chocolate under the stars. The tour includes transportation, warm clothing, and professional photography tips to capture this magical moment.',
    image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&q=80',
    price: 189,
    duration: '5 hours',
    location: 'Reykjavik, Iceland',
    category: 'Nature & Wildlife',
    highlights: [
      'Expert guide with aurora forecast knowledge',
      'Visit multiple viewing locations for best chances',
      'Hot chocolate and traditional Icelandic snacks',
      'Photography assistance and tips',
      'Small group size for personalized experience'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Professional guide',
      'Warm overalls and blankets',
      'Hot beverages and snacks',
      'Aurora forecast updates'
    ],
    slots: [
      // Nov 15 - Multiple time slots
      {
        date: new Date('2025-11-15'),
        startTime: '19:00',
        endTime: '00:00',
        totalSpots: 12,
        bookedSpots: 8
      },
      {
        date: new Date('2025-11-15'),
        startTime: '20:00',
        endTime: '01:00',
        totalSpots: 12,
        bookedSpots: 0
      },
      {
        date: new Date('2025-11-15'),
        startTime: '21:00',
        endTime: '02:00',
        totalSpots: 12,
        bookedSpots: 12
      },
      // Nov 16 - Multiple time slots
      {
        date: new Date('2025-11-16'),
        startTime: '19:00',
        endTime: '00:00',
        totalSpots: 12,
        bookedSpots: 5
      },
      {
        date: new Date('2025-11-16'),
        startTime: '20:00',
        endTime: '01:00',
        totalSpots: 12,
        bookedSpots: 8
      },
      {
        date: new Date('2025-11-16'),
        startTime: '21:00',
        endTime: '02:00',
        totalSpots: 12,
        bookedSpots: 2
      },
      // Nov 17 - Multiple time slots
      {
        date: new Date('2025-11-17'),
        startTime: '19:00',
        endTime: '00:00',
        totalSpots: 12,
        bookedSpots: 12
      },
      {
        date: new Date('2025-11-17'),
        startTime: '20:00',
        endTime: '01:00',
        totalSpots: 12,
        bookedSpots: 12
      },
      {
        date: new Date('2025-11-17'),
        startTime: '21:00',
        endTime: '02:00',
        totalSpots: 12,
        bookedSpots: 10
      },
      // Nov 20 - Multiple time slots
      {
        date: new Date('2025-11-20'),
        startTime: '19:00',
        endTime: '00:00',
        totalSpots: 15,
        bookedSpots: 1
      },
      {
        date: new Date('2025-11-20'),
        startTime: '19:30',
        endTime: '00:30',
        totalSpots: 15,
        bookedSpots: 3
      },
      {
        date: new Date('2025-11-20'),
        startTime: '20:30',
        endTime: '01:30',
        totalSpots: 15,
        bookedSpots: 0
      }
    ]
  },
  {
    title: 'Sunrise Hot Air Balloon Ride in Cappadocia',
    description: 'Float above the fairy chimneys and ancient valleys of Cappadocia at sunrise.',
    longDescription: 'Experience the breathtaking beauty of Cappadocia from a unique perspective as you soar above the otherworldly landscape in a hot air balloon. Watch the sunrise paint the sky in vibrant colors while drifting over fairy chimneys, ancient cave dwellings, and stunning rock formations. This bucket-list experience includes a champagne toast upon landing and a personalized flight certificate. Our experienced pilots ensure a safe and memorable journey.',
    image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&q=80',
    price: 245,
    duration: '3 hours',
    location: 'Cappadocia, Turkey',
    category: 'Adventure',
    highlights: [
      'Spectacular sunrise views over unique landscape',
      'Professional pilot with years of experience',
      'Champagne celebration after landing',
      'Personalized flight certificate',
      'Small basket for intimate experience'
    ],
    included: [
      'Hotel pickup before sunrise',
      'Light breakfast before flight',
      'Hot air balloon ride (60-90 minutes)',
      'Champagne toast and snacks',
      'Flight certificate',
      'Return transfer to hotel'
    ],
    slots: [
      // Nov 10 - Multiple time slots
      {
        date: new Date('2025-11-10'),
        startTime: '05:00',
        endTime: '08:00',
        totalSpots: 8,
        bookedSpots: 5
      },
      {
        date: new Date('2025-11-10'),
        startTime: '05:30',
        endTime: '08:30',
        totalSpots: 8,
        bookedSpots: 1
      },
      {
        date: new Date('2025-11-10'),
        startTime: '06:00',
        endTime: '09:00',
        totalSpots: 8,
        bookedSpots: 8
      },
      // Nov 11 - Multiple time slots
      {
        date: new Date('2025-11-11'),
        startTime: '05:00',
        endTime: '08:00',
        totalSpots: 8,
        bookedSpots: 2
      },
      {
        date: new Date('2025-11-11'),
        startTime: '05:30',
        endTime: '08:30',
        totalSpots: 8,
        bookedSpots: 0
      },
      {
        date: new Date('2025-11-11'),
        startTime: '06:00',
        endTime: '09:00',
        totalSpots: 8,
        bookedSpots: 6
      },
      // Nov 14 - Multiple time slots
      {
        date: new Date('2025-11-14'),
        startTime: '05:00',
        endTime: '08:00',
        totalSpots: 10,
        bookedSpots: 3
      },
      {
        date: new Date('2025-11-14'),
        startTime: '05:15',
        endTime: '08:15',
        totalSpots: 10,
        bookedSpots: 0
      },
      {
        date: new Date('2025-11-14'),
        startTime: '05:45',
        endTime: '08:45',
        totalSpots: 10,
        bookedSpots: 2
      },
      // Nov 18 - Multiple time slots
      {
        date: new Date('2025-11-18'),
        startTime: '05:00',
        endTime: '08:00',
        totalSpots: 8,
        bookedSpots: 7
      },
      {
        date: new Date('2025-11-18'),
        startTime: '05:30',
        endTime: '08:30',
        totalSpots: 8,
        bookedSpots: 4
      },
      {
        date: new Date('2025-11-18'),
        startTime: '06:00',
        endTime: '09:00',
        totalSpots: 8,
        bookedSpots: 0
      }
    ]
  },
  {
    title: 'Scuba Diving in the Great Barrier Reef',
    description: 'Explore the world\'s largest coral reef system and encounter incredible marine life.',
    longDescription: 'Dive into the crystal-clear waters of the Great Barrier Reef, one of the seven natural wonders of the world. This full-day diving experience takes you to pristine dive sites teeming with colorful coral, tropical fish, sea turtles, and rays. Whether you\'re a certified diver or trying it for the first time, our experienced instructors will ensure a safe and unforgettable underwater adventure. All equipment is provided, and lunch is served on board.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    price: 299,
    duration: '8 hours',
    location: 'Cairns, Australia',
    category: 'Water Sports',
    highlights: [
      'Visit 2-3 premium dive sites',
      'See diverse marine life including turtles and rays',
      'Professional PADI-certified instructors',
      'All diving equipment included',
      'Suitable for beginners and experienced divers'
    ],
    included: [
      'Return boat transfers',
      'All diving equipment and wetsuit',
      'Professional dive guide',
      'Lunch and refreshments on board',
      'Dive briefing and safety instruction',
      'Underwater photos (optional purchase)'
    ],
    slots: [
      // Nov 12 - Multiple time slots
      {
        date: new Date('2025-11-12'),
        startTime: '07:00',
        endTime: '15:00',
        totalSpots: 20,
        bookedSpots: 16
      },
      {
        date: new Date('2025-11-12'),
        startTime: '07:30',
        endTime: '15:30',
        totalSpots: 20,
        bookedSpots: 14
      },
      {
        date: new Date('2025-11-12'),
        startTime: '08:00',
        endTime: '16:00',
        totalSpots: 20,
        bookedSpots: 8
      },
      {
        date: new Date('2025-11-12'),
        startTime: '09:00',
        endTime: '17:00',
        totalSpots: 20,
        bookedSpots: 3
      },
      // Nov 13 - Multiple time slots
      {
        date: new Date('2025-11-13'),
        startTime: '07:00',
        endTime: '15:00',
        totalSpots: 20,
        bookedSpots: 12
      },
      {
        date: new Date('2025-11-13'),
        startTime: '07:30',
        endTime: '15:30',
        totalSpots: 20,
        bookedSpots: 6
      },
      {
        date: new Date('2025-11-13'),
        startTime: '08:00',
        endTime: '16:00',
        totalSpots: 20,
        bookedSpots: 0
      },
      {
        date: new Date('2025-11-13'),
        startTime: '09:00',
        endTime: '17:00',
        totalSpots: 20,
        bookedSpots: 5
      },
      // Nov 15 - Multiple time slots
      {
        date: new Date('2025-11-15'),
        startTime: '07:00',
        endTime: '15:00',
        totalSpots: 20,
        bookedSpots: 20
      },
      {
        date: new Date('2025-11-15'),
        startTime: '07:30',
        endTime: '15:30',
        totalSpots: 20,
        bookedSpots: 20
      },
      {
        date: new Date('2025-11-15'),
        startTime: '08:00',
        endTime: '16:00',
        totalSpots: 20,
        bookedSpots: 18
      },
      {
        date: new Date('2025-11-15'),
        startTime: '09:00',
        endTime: '17:00',
        totalSpots: 20,
        bookedSpots: 15
      },
      // Nov 19 - Multiple time slots
      {
        date: new Date('2025-11-19'),
        startTime: '07:00',
        endTime: '15:00',
        totalSpots: 25,
        bookedSpots: 8
      },
      {
        date: new Date('2025-11-19'),
        startTime: '08:00',
        endTime: '16:00',
        totalSpots: 25,
        bookedSpots: 10
      },
      {
        date: new Date('2025-11-19'),
        startTime: '09:00',
        endTime: '17:00',
        totalSpots: 25,
        bookedSpots: 2
      },
      {
        date: new Date('2025-11-19'),
        startTime: '10:00',
        endTime: '18:00',
        totalSpots: 25,
        bookedSpots: 0
      }
    ]
  },
  {
    title: 'Machu Picchu Sunrise Trek',
    description: 'Hike to the ancient Incan citadel and watch the sunrise over the Sacred Valley.',
    longDescription: 'Begin your journey in the early morning darkness and trek through the Andes to reach Machu Picchu for a spectacular sunrise. This guided hike takes you along ancient Incan trails with breathtaking mountain views. Arrive at the Sun Gate to witness the first rays of light illuminating the mysterious ruins. After sunrise, enjoy a comprehensive guided tour of the archaeological site, learning about Incan history, architecture, and culture. This is a moderate-difficulty trek suitable for most fitness levels.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
    price: 175,
    duration: '12 hours',
    location: 'Cusco, Peru',
    category: 'Cultural & Historical',
    highlights: [
      'Witness sunrise over Machu Picchu',
      'Hike ancient Incan trails',
      'Comprehensive guided tour of ruins',
      'Learn about Incan history and culture',
      'Small group for personalized experience'
    ],
    included: [
      'Hotel pickup at 3:00 AM',
      'Transportation to trail head',
      'Professional bilingual guide',
      'Entrance tickets to Machu Picchu',
      'Breakfast box and water',
      'Walking poles',
      'Return transportation'
    ],
    slots: [
      // Nov 08 - Multiple time slots
      {
        date: new Date('2025-11-08'),
        startTime: '03:00',
        endTime: '15:00',
        totalSpots: 15,
        bookedSpots: 9
      },
      {
        date: new Date('2025-11-08'),
        startTime: '03:30',
        endTime: '15:30',
        totalSpots: 15,
        bookedSpots: 12
      },
      {
        date: new Date('2025-11-08'),
        startTime: '04:00',
        endTime: '16:00',
        totalSpots: 15,
        bookedSpots: 5
      },
      // Nov 09 - Multiple time slots
      {
        date: new Date('2025-11-09'),
        startTime: '03:00',
        endTime: '15:00',
        totalSpots: 15,
        bookedSpots: 15
      },
      {
        date: new Date('2025-11-09'),
        startTime: '03:30',
        endTime: '15:30',
        totalSpots: 15,
        bookedSpots: 14
      },
      {
        date: new Date('2025-11-09'),
        startTime: '04:00',
        endTime: '16:00',
        totalSpots: 15,
        bookedSpots: 10
      },
      // Nov 12 - Multiple time slots
      {
        date: new Date('2025-11-12'),
        startTime: '03:00',
        endTime: '15:00',
        totalSpots: 15,
        bookedSpots: 4
      },
      {
        date: new Date('2025-11-12'),
        startTime: '03:30',
        endTime: '15:30',
        totalSpots: 15,
        bookedSpots: 0
      },
      {
        date: new Date('2025-11-12'),
        startTime: '04:00',
        endTime: '16:00',
        totalSpots: 15,
        bookedSpots: 2
      },
      // Nov 16 - Multiple time slots
      {
        date: new Date('2025-11-16'),
        startTime: '03:00',
        endTime: '15:00',
        totalSpots: 18,
        bookedSpots: 0
      },
      {
        date: new Date('2025-11-16'),
        startTime: '03:30',
        endTime: '15:30',
        totalSpots: 18,
        bookedSpots: 3
      },
      {
        date: new Date('2025-11-16'),
        startTime: '04:00',
        endTime: '16:00',
        totalSpots: 18,
        bookedSpots: 1
      }
    ]
  },
  {
    title: 'Safari Game Drive in Serengeti National Park',
    description: 'Encounter Africa\'s Big Five on an unforgettable wildlife safari adventure.',
    longDescription: 'Experience the thrill of a lifetime on this full-day safari through the legendary Serengeti National Park. Travel in a comfortable 4x4 vehicle with a pop-up roof for optimal wildlife viewing and photography. Your expert guide will track lions, elephants, leopards, buffalo, and rhinos while sharing fascinating insights about animal behavior and the ecosystem. Witness the incredible diversity of African wildlife in their natural habitat, from graceful giraffes to powerful predators. Includes a picnic lunch in the bush.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    price: 350,
    duration: '10 hours',
    location: 'Serengeti, Tanzania',
    category: 'Nature & Wildlife',
    highlights: [
      'Search for the Big Five animals',
      'Expert guide with wildlife tracking skills',
      'Comfortable 4x4 safari vehicle',
      'Visit multiple ecosystems within the park',
      'Excellent photography opportunities'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Professional safari guide',
      '4x4 safari vehicle with pop-up roof',
      'Park entrance fees',
      'Picnic lunch in the bush',
      'Bottled water and snacks',
      'Binoculars for wildlife viewing'
    ],
    slots: [
      // Nov 10 - Multiple time slots
      {
        date: new Date('2025-11-10'),
        startTime: '06:00',
        endTime: '16:00',
        totalSpots: 6,
        bookedSpots: 4
      },
      {
        date: new Date('2025-11-10'),
        startTime: '06:30',
        endTime: '16:30',
        totalSpots: 6,
        bookedSpots: 2
      },
      {
        date: new Date('2025-11-10'),
        startTime: '07:00',
        endTime: '17:00',
        totalSpots: 6,
        bookedSpots: 0
      },
      // Nov 11 - Multiple time slots
      {
        date: new Date('2025-11-11'),
        startTime: '06:00',
        endTime: '16:00',
        totalSpots: 6,
        bookedSpots: 6
      },
      {
        date: new Date('2025-11-11'),
        startTime: '06:30',
        endTime: '16:30',
        totalSpots: 6,
        bookedSpots: 5
      },
      {
        date: new Date('2025-11-11'),
        startTime: '07:00',
        endTime: '17:00',
        totalSpots: 6,
        bookedSpots: 3
      },
      // Nov 13 - Multiple time slots
      {
        date: new Date('2025-11-13'),
        startTime: '06:00',
        endTime: '16:00',
        totalSpots: 6,
        bookedSpots: 1
      },
      {
        date: new Date('2025-11-13'),
        startTime: '06:30',
        endTime: '16:30',
        totalSpots: 6,
        bookedSpots: 0
      },
      {
        date: new Date('2025-11-13'),
        startTime: '07:00',
        endTime: '17:00',
        totalSpots: 6,
        bookedSpots: 2
      },
      // Nov 17 - Multiple time slots
      {
        date: new Date('2025-11-17'),
        startTime: '06:00',
        endTime: '16:00',
        totalSpots: 8,
        bookedSpots: 1
      },
      {
        date: new Date('2025-11-17'),
        startTime: '06:30',
        endTime: '16:30',
        totalSpots: 8,
        bookedSpots: 0
      },
      {
        date: new Date('2025-11-17'),
        startTime: '07:00',
        endTime: '17:00',
        totalSpots: 8,
        bookedSpots: 4
      },
      // Nov 20 - Multiple time slots
      {
        date: new Date('2025-11-20'),
        startTime: '06:00',
        endTime: '16:00',
        totalSpots: 6,
        bookedSpots: 3
      },
      {
        date: new Date('2025-11-20'),
        startTime: '06:30',
        endTime: '16:30',
        totalSpots: 6,
        bookedSpots: 1
      },
      {
        date: new Date('2025-11-20'),
        startTime: '07:00',
        endTime: '17:00',
        totalSpots: 6,
        bookedSpots: 0
      }
    ]
  },
  {
    title: 'Nandi Hills Sunrise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    longDescription: 'Wake up early and witness a breathtaking sunrise from the top of Nandi Hills. This guided tour includes transportation from Bangalore, a moderate trek to the summit, and hot beverages to enjoy while watching the sun paint the sky. Learn about the historical significance of this ancient hill fortress while taking in panoramic views of the surrounding countryside.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    price: 899,
    duration: '6 hours',
    location: 'Bangalore',
    category: 'Nature & Wildlife',
    highlights: [
      'Spectacular sunrise views',
      'Historical insights from guide',
      'Moderate trek suitable for most',
      'Hot beverages at summit',
      'Round-trip transportation'
    ],
    included: [
      'Round-trip transportation',
      'Professional guide',
      'Hot beverages and snacks',
      'Entry fees',
      'Trekking assistance'
    ],
    slots: [
      {
        date: new Date('2025-11-07'),
        startTime: '04:00',
        endTime: '10:00',
        totalSpots: 15,
        bookedSpots: 10
      },
      {
        date: new Date('2025-11-07'),
        startTime: '04:30',
        endTime: '10:30',
        totalSpots: 15,
        bookedSpots: 5
      },
      {
        date: new Date('2025-11-08'),
        startTime: '04:00',
        endTime: '10:00',
        totalSpots: 15,
        bookedSpots: 15
      },
      {
        date: new Date('2025-11-08'),
        startTime: '04:30',
        endTime: '10:30',
        totalSpots: 15,
        bookedSpots: 12
      }
    ]
  },
  {
    title: 'Boat Cruise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    longDescription: 'Relax and unwind on a scenic boat cruise through calm waters. This leisurely experience offers stunning views of the coastline, opportunities for dolphin spotting, and a chance to enjoy the sunset from the water. Includes refreshments on board and a knowledgeable captain who shares interesting facts about the area.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    price: 999,
    duration: '2 hours',
    location: 'Sunderban',
    category: 'Water Sports',
    highlights: [
      'Scenic coastal views',
      'Dolphin spotting opportunities',
      'Sunset viewing',
      'Refreshments on board',
      'Experienced captain'
    ],
    included: [
      'Boat cruise',
      'Life jackets',
      'Refreshments and snacks',
      'Professional captain',
      'Safety equipment'
    ],
    slots: [
      {
        date: new Date('2025-11-11'),
        startTime: '16:00',
        endTime: '18:00',
        totalSpots: 20,
        bookedSpots: 15
      },
      {
        date: new Date('2025-11-11'),
        startTime: '17:00',
        endTime: '19:00',
        totalSpots: 20,
        bookedSpots: 8
      },
      {
        date: new Date('2025-11-12'),
        startTime: '16:00',
        endTime: '18:00',
        totalSpots: 20,
        bookedSpots: 12
      },
      {
        date: new Date('2025-11-12'),
        startTime: '17:00',
        endTime: '19:00',
        totalSpots: 20,
        bookedSpots: 5
      }
    ]
  },
  {
    title: 'Bunjee Jumping',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    longDescription: 'Take the leap of faith with this thrilling bungee jumping experience. Jump from a height of 150 feet with state-of-the-art safety equipment and experienced instructors. This adrenaline-pumping activity includes a safety briefing, all necessary equipment, and video recording of your jump. Perfect for adventure seekers looking to conquer their fears.',
    image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&q=80',
    price: 999,
    duration: '1 hour',
    location: 'Manali',
    category: 'Adventure',
    highlights: [
      'Jump from 150 feet height',
      'State-of-the-art safety equipment',
      'Experienced instructors',
      'Video recording of jump',
      'Certificate of completion'
    ],
    included: [
      'Safety equipment',
      'Professional instructors',
      'Safety briefing',
      'Jump video recording',
      'Completion certificate'
    ],
    slots: [
      {
        date: new Date('2025-11-13'),
        startTime: '09:00',
        endTime: '10:00',
        totalSpots: 8,
        bookedSpots: 6
      },
      {
        date: new Date('2025-11-13'),
        startTime: '10:30',
        endTime: '11:30',
        totalSpots: 8,
        bookedSpots: 4
      },
      {
        date: new Date('2025-11-13'),
        startTime: '12:00',
        endTime: '13:00',
        totalSpots: 8,
        bookedSpots: 2
      },
      {
        date: new Date('2025-11-14'),
        startTime: '09:00',
        endTime: '10:00',
        totalSpots: 8,
        bookedSpots: 8
      },
      {
        date: new Date('2025-11-14'),
        startTime: '10:30',
        endTime: '11:30',
        totalSpots: 8,
        bookedSpots: 7
      },
      {
        date: new Date('2025-11-14'),
        startTime: '12:00',
        endTime: '13:00',
        totalSpots: 8,
        bookedSpots: 1
      }
    ]
  },
  {
    title: 'Kayaking',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    longDescription: 'Experience the tranquility of kayaking through pristine waters surrounded by lush greenery. This guided tour is perfect for nature lovers and adventure seekers. Paddle at your own pace while enjoying the scenic beauty and spotting local wildlife. All equipment and safety gear provided.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
    price: 999,
    duration: '3 hours',
    location: 'Udupi, Karnataka',
    category: 'Water Sports',
    highlights: [
      'Paddle through pristine waters',
      'Spot local wildlife',
      'Certified safety guide',
      'All equipment included',
      'Suitable for all skill levels'
    ],
    included: [
      'Kayak and paddle',
      'Life jacket',
      'Safety gear',
      'Professional guide',
      'Waterproof storage'
    ],
    slots: [
      {
        date: new Date('2025-11-15'),
        startTime: '07:00',
        endTime: '10:00',
        totalSpots: 12,
        bookedSpots: 8
      },
      {
        date: new Date('2025-11-15'),
        startTime: '10:30',
        endTime: '13:30',
        totalSpots: 12,
        bookedSpots: 4
      },
      {
        date: new Date('2025-11-16'),
        startTime: '07:00',
        endTime: '10:00',
        totalSpots: 12,
        bookedSpots: 10
      },
      {
        date: new Date('2025-11-16'),
        startTime: '10:30',
        endTime: '13:30',
        totalSpots: 12,
        bookedSpots: 2
      }
    ]
  }
];

// Seed data for promo codes
const promoCodes = [
  {
    code: 'SAVE10',
    discountType: 'percentage' as const,
    discountValue: 10,
    isActive: true
  },
  {
    code: 'SAVE20',
    discountType: 'percentage' as const,
    discountValue: 20,
    isActive: true
  },
  {
    code: 'FLAT50',
    discountType: 'fixed' as const,
    discountValue: 50,
    isActive: true
  },
  {
    code: 'FLAT100',
    discountType: 'fixed' as const,
    discountValue: 100,
    isActive: true
  }
];

// Main seed function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await connectDatabase();
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    await Booking.deleteMany({});
    console.log('✅ Existing data cleared');
    
    // Seed experiences
    console.log('🎯 Seeding experiences...');
    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`✅ ${createdExperiences.length} experiences created`);
    
    // Seed promo codes
    console.log('🎟️  Seeding promo codes...');
    const createdPromoCodes = await PromoCode.insertMany(promoCodes);
    console.log(`✅ ${createdPromoCodes.length} promo codes created`);
    
    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log('==================');
    console.log(`Experiences: ${createdExperiences.length}`);
    createdExperiences.forEach((exp, index) => {
      console.log(`  ${index + 1}. ${exp.title} - $${exp.price} (${exp.slots.length} slots)`);
    });
    console.log(`\nPromo Codes: ${createdPromoCodes.length}`);
    createdPromoCodes.forEach((promo) => {
      const discount = promo.discountType === 'percentage' 
        ? `${promo.discountValue}%` 
        : `$${promo.discountValue}`;
      console.log(`  - ${promo.code}: ${discount} off`);
    });
    
    console.log('\n✨ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run seed function
seedDatabase();
