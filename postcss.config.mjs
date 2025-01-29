export default {
  plugins: {
    // Tailwind CSS
    '@tailwindcss/postcss': {},
    
    // Autoprefixer - automatically adds vendor prefixes
    'autoprefixer': {},
    
    // CSSNano - minifies CSS in production
    ...(process.env.NODE_ENV === 'production' ? { 'cssnano': {} } : {}),
    
    // PostCSS Preset Env - enables modern CSS features
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'custom-selectors': true
      }
    }
  }
}
