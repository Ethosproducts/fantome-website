import re

# Update index.css
with open("src/index.css", "r", encoding="utf-8") as f:
    css = f.read()

css = css.replace("rgba(10, 47, 29, 0.05)", "#FFFFFF")
css = css.replace("backdrop-filter: blur(12px);", "/* No blur for corporate */")
css = css.replace("border: 1px solid rgba(10, 47, 29, 0.1);", "border: 1px solid #E2E8F0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);")

with open("src/index.css", "w", encoding="utf-8") as f:
    f.write(css)

# Update App.jsx
with open("src/App.jsx", "r", encoding="utf-8") as f:
    app = f.read()

# 1. Typography
app = app.replace("font-outfit", "font-sans")
app = app.replace("font-black", "font-bold")
app = app.replace("uppercase tracking-widest", "tracking-wide")
app = app.replace("uppercase tracking-wider", "tracking-wide")
app = app.replace("uppercase tracking-[0.2em]", "tracking-wide")
app = app.replace("uppercase tracking-[0.3em]", "tracking-wide")

# 2. Text Colors (Slate for corporate)
app = app.replace("text-[#0A2F1D]", "text-slate-800")
app = app.replace("text-green-700", "text-slate-600")
app = app.replace("text-green-600", "text-slate-500")
app = app.replace("text-green-800", "text-slate-700")
app = app.replace("text-green-900", "text-slate-900")

# 3. Remove Glows and "Gamer" elements
# Remove background blurred orbs
app = re.sub(r'<div className="absolute[^>]*blur-\[120px\][^>]*/>', '', app)
app = re.sub(r'<div className="absolute[^>]*blur-3xl[^>]*/>', '', app)

# Remove dynamic box shadows that glow
app = re.sub(r'boxShadow:\s*`0 0[^`]*`', 'boxShadow: "none"', app)
app = re.sub(r'boxShadow:\s*"0 0[^"]*"', 'boxShadow: "none"', app)
app = re.sub(r'textShadow:\s*`0 0[^`]*`', 'textShadow: "none"', app)
app = re.sub(r'filter:\s*`drop-shadow[^`]*`', 'filter: "none"', app)
app = re.sub(r'shadow-\[0_0_[^\]]*\]', 'shadow-sm', app)
app = re.sub(r'shadow-\[0_4px_30px[^\]]*\]', 'shadow-md', app)

# Remove text gradients
app = re.sub(r'text-transparent bg-clip-text bg-gradient-to-r from-[^\s]+ to-[^\s]+', 'text-slate-800', app)
app = re.sub(r'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[^\s]+ group-hover:to-[^\s]+', 'group-hover:text-emerald-700', app)

# 4. Buttons & Panels
# Replace green-50 and related backgrounds with clean white or slate-50
app = app.replace("bg-green-50", "bg-slate-50")
app = app.replace("bg-green-100", "bg-slate-100")
app = app.replace("bg-white/5", "bg-white")
app = app.replace("bg-white/10", "bg-white")
app = app.replace("bg-white/20", "bg-slate-50")
app = app.replace("bg-white/50", "bg-white")
app = app.replace("bg-white/80", "bg-white")
app = app.replace("bg-white/90", "bg-white")
app = app.replace("bg-white/95", "bg-white")

# Borders
app = app.replace("border-[#0A2F1D]/10", "border-slate-200")
app = app.replace("border-[#0A2F1D]/5", "border-slate-100")
app = app.replace("border-[#0A2F1D]/15", "border-slate-200")
app = app.replace("border-[#0A2F1D]/20", "border-slate-300")
app = app.replace("border-white/10", "border-slate-200")
app = app.replace("border-white/5", "border-slate-200")

# Revert specific button colors for contrast (e.g. "Add to Cart")
app = app.replace("bg-[#0A2F1D] text-white", "bg-emerald-700 text-white hover:bg-emerald-800")
app = app.replace("bg-white text-[#0A2F1D]", "bg-emerald-700 text-white hover:bg-emerald-800")
app = app.replace("text-[#0A2F1D] bg-white", "bg-emerald-700 text-white hover:bg-emerald-800")
# The logo has text-slate-800 now from replacement, change to emerald
app = app.replace("text-slate-800 select-none", "text-emerald-800 select-none")

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(app)

print("Corporate theme swap complete")
