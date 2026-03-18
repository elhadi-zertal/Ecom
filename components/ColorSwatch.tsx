"use client";

interface ColorSwatchProps {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
  label: string;
  error?: string;
}

const colorMap: Record<string, string> = {
  // Arabic color names
  أحمر: "#ef4444",
  أزرق: "#3b82f6",
  أخضر: "#22c55e",
  أصفر: "#eab308",
  أسود: "#1f2937",
  أبيض: "#f9fafb",
  رمادي: "#6b7280",
  بني: "#92400e",
  برتقالي: "#f97316",
  وردي: "#ec4899",
  بنفسجي: "#a855f7",
  ذهبي: "#d97706",
  فضي: "#94a3b8",
  كحلي: "#1e3a5f",
  زيتي: "#3f6212",
  // French color names
  rouge: "#ef4444",
  bleu: "#3b82f6",
  vert: "#22c55e",
  jaune: "#eab308",
  noir: "#1f2937",
  blanc: "#f9fafb",
  gris: "#6b7280",
  marron: "#92400e",
  orange: "#f97316",
  rose: "#ec4899",
  violet: "#a855f7",
  or: "#d97706",
  argent: "#94a3b8",
  // English (fallback)
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  yellow: "#eab308",
  black: "#1f2937",
  white: "#f9fafb",
  gray: "#6b7280",
  brown: "#92400e",
  pink: "#ec4899",
  purple: "#a855f7",
  gold: "#d97706",
  silver: "#94a3b8",
  navy: "#1e3a5f",
  olive: "#3f6212",
  beige: "#d2b48c",
};

function getColorHex(color: string): string {
  const lower = color.toLowerCase().trim();
  return colorMap[lower] || colorMap[color] || color;
}

function isLightColor(hex: string): boolean {
  if (!hex.startsWith("#")) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 180;
}

export default function ColorSwatch({ colors, selectedColor, onSelect, label, error }: ColorSwatchProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
        {label}
        {selectedColor && (
          <span className="ms-2 text-purple-400 font-normal">{selectedColor}</span>
        )}
      </label>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const hex = getColorHex(color);
          const isSelected = selectedColor === color;
          const isLight = isLightColor(hex);

          return (
            <button
              key={color}
              type="button"
              onClick={() => onSelect(color)}
              title={color}
              className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 flex-shrink-0 ${
                isSelected
                  ? "scale-110 shadow-lg"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              style={{
                backgroundColor: hex.startsWith("#") ? hex : undefined,
                background: !hex.startsWith("#") ? hex : undefined,
                borderColor: isSelected ? "#a855f7" : isLight ? "#6b7280" : "rgba(255,255,255,0.2)",
                boxShadow: isSelected
                  ? `0 0 0 3px rgba(168,85,247,0.4), 0 4px 12px rgba(0,0,0,0.4)`
                  : undefined,
              }}
            >
              {isSelected && (
                <span
                  className="absolute inset-0 flex items-center justify-center text-xs"
                  style={{ color: isLight ? "#000" : "#fff" }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
