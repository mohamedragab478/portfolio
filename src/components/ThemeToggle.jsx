import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative p-2.5 rounded-xl border transition-all duration-500 group ${
        isDark
          ? 'bg-surface/20 border-accent hover:border-accent hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent-primary)_30%,transparent)]'
          : 'bg-surface/50 border-accent/50 hover:border-accent hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent-primary)_25%,transparent)]'
      } ${className}`}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun icon - visible in dark mode */}
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark
              ? 'text-yellow-300 rotate-0 scale-100 opacity-100'
              : 'text-yellow-500 rotate-90 scale-0 opacity-0'
          }`}
        />
        {/* Moon icon - visible in light mode */}
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark
              ? 'text-accent/40 -rotate-90 scale-0 opacity-0'
              : 'text-accent rotate-0 scale-100 opacity-100 drop-shadow-[0_0_8px_var(--accent-primary)]'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
