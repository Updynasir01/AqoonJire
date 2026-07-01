import { BRAND } from '../../config/brandAssets';

/**
 * @param {'onDark'|'onLight'} variant — onDark = white wordmark (dark backgrounds), onLight = purple wordmark
 * @param {'nav'|'footer'|'auth'|'sidebar'} size
 * @param {boolean} iconOnly — crop to icon mark only (sidebar)
 */
export default function BrandLogo({
  variant = 'onDark',
  size = 'nav',
  iconOnly = false,
  className = '',
  alt = 'AqoonJire',
}) {
  const src = iconOnly
    ? BRAND.logoIcon
    : variant === 'onLight'
      ? BRAND.logoOnLight
      : BRAND.logoOnDark;

  const sizeClass = iconOnly ? 'brand-logo--icon' : `brand-logo--${size}`;

  return (
    <img
      src={src}
      alt={alt}
      className={`brand-logo ${sizeClass}${className ? ` ${className}` : ''}`}
      decoding="async"
    />
  );
}

export { BRAND };
