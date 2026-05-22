import re

with open("src/App.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace backgrounds
content = content.replace('bg-fantome-black', 'bg-white')
content = content.replace('bg-black/40', 'bg-green-50/80')
content = content.replace('bg-black/50', 'bg-green-50/90')
content = content.replace('bg-black/60', 'bg-white/90')
content = content.replace('bg-black/80', 'bg-green-50')
content = content.replace('bg-black/95', 'bg-white/95')
content = content.replace('bg-black/20', 'bg-green-100/50')
content = content.replace('bg-black', 'bg-white')

# Replace text colors
content = re.sub(r'\btext-white\b', 'text-[#0A2F1D]', content)
content = re.sub(r'\btext-gray-400\b', 'text-green-700', content)
content = re.sub(r'\btext-gray-500\b', 'text-green-600', content)
content = re.sub(r'\btext-gray-300\b', 'text-green-800', content)

# Replace borders
content = content.replace('border-white/10', 'border-[#0A2F1D]/10')
content = content.replace('border-white/5', 'border-[#0A2F1D]/5')
content = content.replace('border-white/15', 'border-[#0A2F1D]/15')
content = content.replace('border-white/20', 'border-[#0A2F1D]/20')
content = content.replace('border-white', 'border-[#0A2F1D]')

# Replace gradients
content = content.replace('from-black', 'from-white')
content = content.replace('via-black/30', 'via-white/30')
content = content.replace('via-black/20', 'via-white/20')

# Specific fixes for UI elements that inverted
content = content.replace('bg-white text-black', 'bg-[#0A2F1D] text-white')
content = content.replace('hover:text-white', 'hover:text-[#0A2F1D]')
content = content.replace('group-hover:text-white', 'group-hover:text-[#0A2F1D]')

# Revert text-[#0A2F1D] in inverted buttons
content = content.replace('bg-[#0A2F1D] text-[#0A2F1D]', 'bg-[#0A2F1D] text-white')

# Replace specific white text classes that became dark
content = content.replace('text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500', 'text-transparent bg-clip-text bg-gradient-to-r from-[#0A2F1D] to-green-600')

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Theme swap complete")
