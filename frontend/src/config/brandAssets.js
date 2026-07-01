const BASE = '/ResourcesPhotos';

const asset = name => `${BASE}/${encodeURIComponent(name)}`;

export const BRAND = {
  logoOnDark: asset('Logo Aqoonjire-7-01.png'),
  logoOnLight: asset('Logo Aqoonjire 5-01.png'),
  logoIcon: asset('Logo Aqoonjire5-01.png'),
  favicon: asset('Logo Aqoonjire 5-01.png'),
  photos: {
    study1: asset('photo-01.png'),
    study2: asset('photo-02.png'),
    study3: asset('photo-03.png'),
    study4: asset('photo-04.jpg'),
  },
};
