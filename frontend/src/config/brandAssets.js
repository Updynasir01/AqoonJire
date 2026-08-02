const BASE = '/ResourcesPhotos';

const asset = name => `${BASE}/${encodeURIComponent(name)}`;

export const BRAND = {
  logoOnDark: asset('Logo Aqoonjire-7-01.png'),
  logoOnLight: asset('Logo Aqoonjire 5-01.png'),
  logoIcon: asset('Logo Aqoonjire5-01.png'),
  favicon: asset('aqoonjire-icon.png'),
  positioning: "Somalia's Leading E-Learning Platform",
  headline: 'Empowering the Next Generation with Future-Ready Skills, Expert Instructors, and Recognized Certifications.',
  heroDesc: 'Aqoonjire equips Somali learners with practical skills through expert instructors, hands-on learning, and industry-recognized certificates.',
  footerDesc: 'Empowering the Next Generation with Future-Ready Skills, Expert-Led Learning, and Recognized Certifications.',
  slogan: 'Halka Aqoontu Xirfad Ku Noqoto',
  ctaTitle: 'Build Future-Ready Skills with AqoonJire',
  ctaDesc: "Join Somalia's leading e-learning platform and learn from expert instructors through flexible online courses. Earn recognized certificates and gain practical skills that prepare you for the digital economy.",
  aboutHeroTitle: 'Empowering the Next Generation for the Digital Economy.',
  aboutPara1: 'AqoonJire is a modern e-learning and digital innovation platform dedicated to equipping the next generation with practical, future-ready skills for the digital economy.',
  aboutPara2: 'Through expert instructors, flexible online learning, hands-on training, and recognized certifications, AqoonJire empowers students, professionals, and aspiring freelancers to build practical skills, unlock new opportunities, and thrive in the digital economy.',
  aboutTeamTitle: 'The Vision Behind AqoonJire',
  aboutTeamDesc: "Meet the visionaries shaping AqoonJire's future and empowering the next generation through quality education, innovation, and future-ready skills.",
  photos: {
    study1: asset('photo-01.png'),
    study2: asset('photo-02.png'),
    study3: asset('photo-03.png'),
    study4: asset('photo-04.jpg'),
    aboutHero: asset('close-up-woman-taking-notes2.jpg.jpeg'),
    aboutMission: asset('photo-02.png'),
    aboutTeam: asset('ChatGPT Image Aug 12, 2025, 02_21_07 PM (1).png'),
  },
};
