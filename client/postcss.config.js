
import tailwindcss from 'tailwindcss'; // ✅ CORRECT
import autoprefixer from 'autoprefixer'; // ✅

export default {
  plugins: [tailwindcss, autoprefixer], // ✅ ARRAY, not object
};
