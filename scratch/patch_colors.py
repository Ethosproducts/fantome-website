with open("src/App.jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('color: "#00FF00"', 'color: "#059669"')
content = content.replace('color: "#FF0000"', 'color: "#DC2626"')
content = content.replace('color: "#FFFFFF"', 'color: "#475569"')
content = content.replace("|| '#00FF00'", "|| '#059669'")

# Let's also ensure the "UNSEEN POWER" text explicitly has font-bold since it's hard to read
content = content.replace('className="transition-colors duration-500">UNSEEN POWER', 'className="font-bold transition-colors duration-500">UNSEEN POWER')

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(content)
