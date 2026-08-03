const BASE = '/ResourcesPhotos';

const asset = name => `${BASE}/${encodeURIComponent(name)}`;

export const BRAND = {
  logoOnDark: asset('Logo Aqoonjire-7-01.png'),
  logoOnLight: asset('Logo Aqoonjire 5-01.png'),
  logoIcon: asset('Logo Aqoonjire5-01.png'),
  favicon: asset('aqoonjire-icon.png'),

  /** Brand positioning — who we are in the market */
  positioning: "Somalia's Leading E-Learning Platform",

  /** Brand slogan — what people remember */
  slogan: 'Halka Aqoontu Xirfad Ku Noqoto',

  /** Brand promise — what learners receive */
  promise:
    'Empowering the next generation with practical digital skills, expert-led learning, and recognized certifications.',

  /** Homepage hero */
  heroHeading: 'Learn Future-Ready Digital Skills',
  heroHeadingAccent: 'Future-Ready Digital Skills',
  heroDesc:
    'Empowering the next generation with practical digital skills, expert-led learning, and recognized certifications.',
  footerDesc:
    'Empowering the next generation with practical digital skills, expert-led learning, and recognized certifications.',

  ctaTitle: 'Build Future-Ready Skills with AqoonJire',
  ctaDesc:
    "Join Somalia's leading e-learning platform and learn from expert instructors through flexible online courses. Earn recognized certificates and gain practical skills that prepare you for the digital economy.",

  about: {
    heroTitle: 'Who We Are',
    whoWeAre: [
      "AqoonJire is Somalia's Leading E-Learning Platform, dedicated to empowering individuals with practical, future-ready digital skills through high-quality online education.",
      'We provide accessible, flexible, and industry-focused learning experiences that enable students, professionals, entrepreneurs, and aspiring freelancers to develop the knowledge, confidence, and skills needed to succeed in today\'s digital economy.',
      'At AqoonJire, we believe education should create opportunities, transform lives, and prepare learners for a rapidly evolving world.',
    ],
    ourStory: {
      title: 'Our Story',
      paragraphs: [
        'AqoonJire was founded with a simple yet powerful vision: to make quality digital education accessible to every Somali learner.',
        "Recognizing the growing demand for practical skills in today's technology-driven world, AqoonJire was created to bridge the gap between traditional education and the real-world skills required for employment, entrepreneurship, and professional growth.",
        'Guided by our slogan, "Where Knowledge Becomes Skills," we are committed to transforming knowledge into practical skills that create meaningful opportunities.',
      ],
    },
    vision:
      'To become the leading digital learning platform in Somalia and a trusted center of excellence that empowers the next generation of innovators, professionals, and entrepreneurs across the Horn of Africa.',
    mission:
      'To provide accessible, affordable, and practical digital education through innovative online learning experiences, equipping learners with industry-relevant skills that prepare them for careers, freelancing, entrepreneurship, and lifelong success.',
    coreValues: [
      {
        emoji: '💡',
        title: 'Innovation',
        desc: 'We embrace creativity, technology, and continuous improvement to deliver modern learning experiences.',
      },
      {
        emoji: '⭐',
        title: 'Excellence',
        desc: 'We are committed to maintaining the highest standards in education, training, and learner success.',
      },
      {
        emoji: '🔓',
        title: 'Accessibility',
        desc: 'We believe quality education should be available to everyone, everywhere.',
      },
      {
        emoji: '🛡️',
        title: 'Integrity',
        desc: 'We build trust through honesty, transparency, and professionalism.',
      },
      {
        emoji: '🤝',
        title: 'Collaboration',
        desc: 'We foster a supportive learning community where learners, instructors, and partners grow together.',
      },
      {
        emoji: '📚',
        title: 'Lifelong Learning',
        desc: 'We inspire continuous personal and professional development beyond the classroom.',
      },
    ],
    whatWeOffer: [
      'Professional Online Courses',
      'Industry-Focused Digital Skills Training',
      'Expert-Led Learning',
      'Practical Projects & Assignments',
      'Recognized Certificates',
      'Career Development Support',
      'Flexible Online Learning',
    ],
    whyChoose: {
      title: 'Why Choose AqoonJire?',
      paragraphs: [
        'At AqoonJire, learning goes beyond theory. Our courses are designed to provide practical, hands-on experience that prepares learners for real opportunities in the digital economy.',
        'Whether your goal is to build a successful career, start a business, become a freelancer, or enhance your professional skills, AqoonJire provides the knowledge, mentorship, and learning environment to help you succeed.',
      ],
    },
    learningExperience: {
      title: 'Our Learning Experience',
      paragraphs: [
        'We combine expert instruction, practical learning, interactive projects, and flexible online access to create an engaging educational experience that supports learners from enrollment to certification.',
        'Our approach focuses on developing confidence, competence, and career-ready skills.',
      ],
    },
    impact: {
      title: 'Our Impact',
      paragraphs: [
        'AqoonJire is building a growing community of learners who are transforming their lives through education, innovation, and digital skills.',
        'Every course we deliver contributes to our vision of developing a skilled generation ready to compete in the local and global digital economy.',
      ],
    },
    teamTitle: 'The Vision Behind AqoonJire',
    teamDesc:
      "Meet the visionaries shaping AqoonJire's future and empowering the next generation through quality education, innovation, and future-ready skills.",
  },

  photos: {
    study1: asset('photo-01.png'),
    study2: asset('photo-02.png'),
    study3: asset('photo-03.png'),
    study4: asset('photo-04.jpg'),
    aboutHero: asset('close-up-woman-taking-notes2.jpg.jpeg'),
    aboutMission: asset('photo-02.png'),
    aboutStory: asset('photo-01.png'),
    aboutTeam: asset('ChatGPT Image Aug 12, 2025, 02_21_07 PM (1).png'),
  },
};
