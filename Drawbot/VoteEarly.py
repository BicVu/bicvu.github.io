# print installed fonts
# for fontName in installedFonts():
#     print(fontName)

x, y , w, h = 0, 0, 1000, 1000

# indigo fill
# fill(30/255, 31/255, 93/255)

# -----
# variable values
min_val = listFontVariations('RhodyVariable-Regular')['ASCN']['minValue']
max_val = listFontVariations('RhodyVariable-Regular')['ASCN']['maxValue']

steps = 10
v_txt = "voted early"

step_size = (max_val - min_val)/(steps-1)
# -----

# Beginning stills
for i in range(10):
    newPage(1000, 1000)
    fill(30/255, 31/255, 93/255)
    rect(x, y, w, h)
    
    fill(1)
    font("HalyardMicroMedium")
    fontSize(84)
    text("If you have", (500, 750), align = "center")
    text("raise your hand.", (500, 230), align = "center")
    
    font("RhodyVariable-Regular")
    fontSize(280)
    fill(244/255, 81/255, 30/255)
    fontVariations(wght = 350, ASCN = 0 )
    text(v_txt, (500, 430), align = "center")


# variable
for i in range(steps):
    newPage(1000, 1000)
    fill(30/255, 31/255, 93/255)
    rect(x, y, w, h)
    
    fill(1)
    font("HalyardMicroMedium")
    fontSize(84)
    text("If you have", (500, 750), align = "center")
    text("raise your hand.", (500, 230), align = "center")
    
    font("RhodyVariable-Regular")
    fontSize(280)
    fill(244/255, 81/255, 30/255)
    curr_value = min_val + i * step_size
    fontVariations(wght = 350, ASCN = curr_value)
    text(v_txt, (500, 430), align = "center")
    
# End stills
for i in range(10):
    newPage(1000, 1000)
    fill(30/255, 31/255, 93/255)
    rect(x, y, w, h)
    
    fill(1)
    font("HalyardMicroMedium")
    fontSize(84)
    text("If you have", (500, 750), align = "center")
    text("raise your hand.", (500, 230), align = "center")
    
    font("RhodyVariable-Regular")
    fontSize(280)
    fill(244/255, 81/255, 30/255)
    fontVariations(wght = 350, ASCN = max_val )
    text(v_txt, (500, 430), align = "center")


saveImage('~/Desktop/DB_VoteEarly.gif')

