import pygame,sys, math, random

SCREENWIDTH = 22*64
SCREENHEIGHT = 11*64

window = pygame.display.set_mode((SCREENWIDTH, SCREENHEIGHT))
pygame.mixer.init()
pygame.mixer.music.load("soundtrack.wav")

def sign(v):
    return abs(v)/v

class Word:
    def __init__(self, word, x,y, size, color):
        pygame.font.init()
        self.word=word
        self.surface=window
        self.rect=pygame.Rect(x,y,0, 0)
        self.font = pygame.font.Font("joystixMonospace.ttf", size)
        self.text = self.font.render(self.word, 1, (color[0], color[1], color[2]))
    def update(self):
        self.surface.blit(self.text, (self.rect.x, self.rect.y))

class Game:
    def __init__(self):
        self.clock=pygame.time.Clock()
        self.currentLevel=0
        self.gameState="STARTSCREEN"

        self.lifeImage = pygame.image.load("images/life.png")

        self.waterImage = pygame.image.load("images/water.png")

        self.waveImage = [pygame.image.load("images/wave1.png"),
                          pygame.image.load("images/wave2.png"),
                          pygame.image.load("images/wave3.png"),
                          pygame.image.load("images/wave4.png")]

        self.playerBreath = [pygame.image.load("images/player-breath1.png"),
                             pygame.image.load("images/player-breath2.png")]

        self.playerWalk = [pygame.image.load("images/player-walk1.png"),
                           pygame.image.load("images/player-walk2.png"),
                           pygame.image.load("images/player-walk3.png"),
                           pygame.image.load("images/player-walk4.png")]

        self.playerJump = pygame.image.load("images/player-jump.png")

        self.enemyBreath = [pygame.image.load("images/enemy1.png"),
                            pygame.image.load("images/enemy2.png")]
        self.enemyJump = pygame.image.load("images/enemy3.png")

        self.animation = 0
        self.animationCounter = 0
        self.levelList=[]
        self.levelCounter=0
        self.enemyList=[]
        self.nameList=[]
        self.levelTitle = Word("This is the last level!", 20, 20, 30, [255, 255, 255])
        self.bonusLife = True
        self.life = 1

    def setCurrentLevel(self, newLevel):
        self.currentLevel=newLevel

    def getCurrentLevel(self):
        return self.currentLevel

    def animate(self):
        self.animationCounter += 1
        if self.animationCounter == 7:
            self.animation += 1
            if self.animation == 4:
                self.animation = 0
            self.animationCounter = 0

    def getGameState(self):
        return self.gameState

    def setTileset(self, tileSet):
        if tileSet=="Grass":
            self.groundImage = pygame.image.load("images/ground.png")
            self.groundLImage = pygame.image.load("images/groundl.png")
            self.groundRImage = pygame.image.load("images/groundr.png")
            self.dirtImage = pygame.image.load("images/dirt.png")
        elif tileSet=="Snow":
            self.groundImage = pygame.image.load("images/snow.png")
            self.groundLImage = pygame.image.load("images/snowl.png")
            self.groundRImage = pygame.image.load("images/snowr.png")
            self.dirtImage = pygame.image.load("images/dirt.png")
        elif tileSet=="Mountain":
            self.groundImage = pygame.image.load("images/mountain.png")
            self.groundLImage = pygame.image.load("images/mountainL.png")
            self.groundRImage = pygame.image.load("images/mountainR.png")
            self.dirtImage = pygame.image.load("images/mountain.png")


    def setGameState(self, newGameState):
        self.gameState=newGameState

    def drawLives(self):
        for i in range (0, game.life):
            window.blit(game.lifeImage, (20+ i*64, 64))


game=Game()

class Actor(object):
    def __init__(self, x , y , name, speed = 0.5, max_speed = 7, max_fall = 20, gravity = 1, friction = 0.25):

        if name=="Player":
            self.height = 96
            self.jump_force = 22
        else:
            self.height = 56
            self.jump_force = 15

        self.width = 64
        self.rect = pygame.Rect(x, y, self.width, self.height)
        self.surface = pygame.Surface((self.rect.w, self.rect.h))
        self.speed = speed
        self.velocity_y = 0
        self.velocity_x = 0
        self.max_fall = max_fall
        self.max_speed = max_speed
        self.speed = speed
        self.friction = friction
        self.gravity = gravity
        self.onGround = True
        self.name = name
        self.deathTimer = 0

    def movement(self):
        f = self.friction
        if self.onGround and game.levelCounter<5:
            f = self.friction/4

        self.onGround = False

        self.rect.x += self.velocity_x
        self.rect.y += self.velocity_y

        self.velocity_y += self.gravity

        if (abs(self.velocity_x) > 0):
            self.velocity_x -= f * sign(self.velocity_x)

        if (abs(self.velocity_x) < f):
            self.velocity = 0

        if (abs(self.velocity_x) > self.max_speed):
            self.velocity_x = self.max_speed * sign(self.velocity_x)

        if abs(self.velocity_y) > self.max_fall:
            self.velocity_y = self.max_fall * sign(self.velocity_y)

    def getInput(self):
        pressed = pygame.key.get_pressed()

        if(pressed[pygame.K_a]):
            self.velocity_x -= self.speed

        if(pressed[pygame.K_d]):
            self.velocity_x += self.speed

        if (pressed[pygame.K_SPACE]):
            self.jump()

        if (pressed[pygame.K_u]):
            self.rect.x = 0

    def jump(self):
        if self.onGround:
            self.velocity_y = -self.jump_force

    def collide(self):
        for wall in game.getCurrentLevel().getWalls():
            if self.rect.right+self.velocity_x > wall.rect.left and self.rect.left + self.velocity_x < wall.rect.right:
                if self.rect.bottom <= wall.rect.top and self.rect.bottom + self.velocity_y > wall.rect.top:
                    self.velocity_y = 0
                    self.rect.bottom = wall.rect.top
                    self.onGround = True
                if self.rect.top >= wall.rect.bottom and self.rect.top + self.velocity_y < wall.rect.bottom:
                    self.velocity_y = 0
                    self.rect.top = wall.rect.bottom
            if self.rect.top < wall.rect.bottom and self.rect.bottom  > wall.rect.top:
                if self.rect.right <= wall.rect.left and self.rect.right + self.velocity_x + 1 > wall.rect.left:
                    self.velocity_x = 0
                    self.rect.right = wall.rect.left - 1
                if self.rect.left >= wall.rect.right and self.rect.left + self.velocity_x - 1 <= wall.rect.right:
                    self.velocity_x = 0
                    self.rect.left = wall.rect.right+2
        if self.rect.right > SCREENWIDTH:
            self.rect.right = SCREENWIDTH
        if self.name=="Player" and game.levelCounter == len(game.levelList)-1 and game.bonusLife:
            if self.rect.colliderect(game.getCurrentLevel().getBackgrounds()[14]):
                game.life -= 1
                game.bonusLife = False


    def drawPlayer(self):
        if (self.deathTimer>0 and self.deathTimer%2 == 0):
            self.deathTimer = self.deathTimer
        elif (self.onGround and self.velocity_x == 0):
            window.blit(game.playerBreath[math.floor(game.animation/2)], (self.rect.x, self.rect.y+1))
        elif (not self.onGround):
            window.blit(game.playerJump, (self.rect.x, self.rect.y+1))
        elif (self.velocity_x > 0):
            window.blit(game.playerWalk[game.animation], (self.rect.x, self.rect.y+1))
        elif (self.velocity_x < 0):
            window.blit(game.playerWalk[3-game.animation], (self.rect.x, self.rect.y+1))
        else:
            window.blit(game.playerBreath[1], (self.rect.x, self.rect.y+1))

    def drawEnemy(self):
        if (self.onGround and self.velocity_x == 0):
            window.blit(game.enemyBreath[math.floor(game.animation/2)], (self.rect.x, self.rect.y))
        else:
            window.blit(game.enemyJump, (self.rect.x, self.rect.y))

    def AI(self):
        if random.randint(1, 40)==1 and self.onGround:
            self.jump()
            blockedRight = False
            blockedLeft = False
            for wall in game.getCurrentLevel().getWalls():
                if self.rect.top < wall.rect.bottom and self.rect.bottom > wall.rect.top:
                    if self.rect.right + 10 <= wall.rect.left and self.rect.right + 80 >= wall.rect.left:
                        blockedRight = True
                    if self.rect.left + -10 > wall.rect.right and self.rect.left - 80 < wall.rect.right:
                        blockedLeft = True
            if random.randint(1,2)==1:
                if not blockedLeft:
                    self.velocity_x = -5
                elif not blockedRight:
                    self.velocity_x = 5
            else:
                if not blockedRight:
                    self.velocity_x = 5
                elif not blockedLeft:
                    self.velocity_x = -5


    def die(self):
        if (self.deathTimer > 0):
            self.deathTimer -= 1
        if self.rect.y > SCREENHEIGHT and self.deathTimer==0:
                self.deathTimer = 50
                self.rect.x = 32
                self.rect.y = 0
                game.life += 1
        else:
            for enemy in game.enemyList[game.levelCounter]:
                if self.rect.colliderect(enemy) and self.deathTimer==0:
                    self.deathTimer = 50
                    self.rect.x = 32
                    self.rect.y = 0
                    game.life += 1


    def update(self):
        if self.name=="Player":
            self.getInput()
            self.die()
        else:
            self.AI()

        self.movement()
        self.collide()

        if self.name=="Player":
            self.drawPlayer()
        else:
            self.drawEnemy()


player=Actor(95, 500,"Player")

class Tile:
    def __init__(self, x, y, name, image):
        self.width=64
        self.height=64
        self.rect=pygame.Rect(x, y, self.width, self.height)
        self.name= name
        self.image=image

    def update(self):
        window.blit(self.image, (self.rect.x, self.rect.y))

class Level:
    def __init__(self, array):
        self.levelArray = array
        x = 0
        y = 0
        self.walls = []
        self.backgrounds = []
        for row in self.levelArray:
            for item in row:
                if item == "P":
                    if y==0 or self.levelArray[round((y/64)-1)][round(x/64)]==" ":
                        if (round(x/64) < 21 and self.levelArray[round(y/64)][round(x/64)+1]!="P"):
                            tile = Tile(x, y, "Ground", game.groundRImage)
                        elif (round(x/64) > 0 and self.levelArray[round(y/64)][round(x/64)-1]!="P"):
                            tile = Tile(x, y, "Ground", game.groundLImage)
                        else:
                            tile = Tile(x, y, "Ground", game.groundImage)
                    else:
                        tile = Tile(x, y, "Ground", game.dirtImage)
                    self.walls.append(tile)
                elif item == "H":
                    tile = Tile(x, y, "Hidden", game.waterImage)
                    self.walls.append(tile)
                elif item == ".":
                    if y==0 or self.levelArray[round((y/64)-1)][round(x/64)]==" ":
                        tile = Tile(x, y, "Wave", game.waveImage[game.animation])
                    else:
                        tile = Tile(x, y, "Water", game.waterImage)
                    self.backgrounds.append(tile)
                x += 64
            y += 64
            x = 0

    def getWalls(self):
        return self.walls

    def getBackgrounds(self):
        return self.backgrounds

    def update(self):

        if player.rect.right<0:
            if game.levelCounter < len(game.levelList)-1:
                game.levelCounter+=1
                game.setCurrentLevel(game.levelList[game.levelCounter])

                player.rect.x=SCREENWIDTH-player.rect.width
                player.rect.y -= 15
                game.levelTitle = Word("LEVEL " + str(len(game.levelList)-game.levelCounter) + ": " + game.nameList[game.levelCounter], 20, 20, 30, [255, 255, 255])
            else:
                game.gameState = "ENDSCREEN"

        for tile in self.walls:
            tile.update()
        for tile in self.backgrounds:
            if tile.name=="Wave":
                tile.image = game.waveImage[game.animation]
            tile.update()

class StartScreen:
    def __init__(self):
        self.words=["OH NO!!",
                    "YOU HAVE BEATEN YOUR FAVORITE",
                    "GAME BUT THERE IS NO REPLAY",
                    "BUTTON!! YOU MUST PLAY BACKWARDS",
                    "THROUGH THE GAME IN ORDER TO",
                    "REACH THE TITLE SCREEN!!",
                    "MOVE: A/D, JUMP: SPACE",
                    "PRESS ENTER TO UN-WIN THE GAME!!"]
        y = 0
        self.wordList=[]
        for item in self.words:
            self.wordList.append(Word(item, 80, 100+y*60, 50, [0, 0, 0]))
            y += 1
        self.wordList.append(Word("(for extra challenge: reach the title screen with only 3 lives!!)", 80, 10*64, 20, [0, 0, 0]))

    def update(self):
        pressed = pygame.key.get_pressed()

        window.fill((255, 255, 255))
        for word in self.wordList:
            word.update()
        if pressed[pygame.K_RETURN]:
            game.setGameState("CREDITSSCREEN")

startScreen = StartScreen()

class CreditsScreen:
    def __init__(self):
        self.words=["PLAYING!!",
                    "THANK YOU FOR",
                    "",
                    "BACKWARDS GAME JAM",
                    "MADE IN 24 HRS FOR:",
                    "",
                    "SIMON HOPKINS",
                    "MARTIN DUFFY AND",
                    "GAME DEVELOPMENT BY:",]
        self.wordList=[]
        self.newY=0
        for item in self.words:
            word=Word(item, ((11*64)-round(len(item)/2)*50), self.newY, 60, [255, 255, 255])
            self.wordList.append(word)
            self.newY-=70
            print(round(len(item)/2))

    def update(self):
        pressed = pygame.key.get_pressed()
        window.fill((0, 0, 0))
        for word in self.wordList:
            word.update()
            word.rect.y+=3
            if self.wordList[len(self.wordList)-1].rect.y>SCREENHEIGHT or pressed[pygame.K_a]:
                game.setGameState("PLAYING")
                player.rect.y = 0
                player.rect.x = SCREENWIDTH-64
                pygame.mixer.music.play(-1, 0.0)

creditsScreen = CreditsScreen()

class EndScreen:
    def __init__(self):
        self.title = ""
        self.pressEnter=Word("press enter", 7.8*64, 3*64, 40, [255, 255, 255])

    def update(self):
        if (game.life>3):
            self.title=Word("REVERSE", 7*64, 64, 80, [255, 255, 255])
        else:
            self.title=Word("YOU ARE AMAZING!", 2.5*64, 64, 80, [255, 255, 255])
        self.title.update()
        if math.floor(game.animation/2):
            self.pressEnter.update()
        window.blit(game.playerBreath[math.floor(game.animation/2)], (3*64 , SCREENHEIGHT-96-64))

endScreen = EndScreen()


game.levelList=[]
game.enemyList=[]
game.nameList=[]

game.setTileset("Snow")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([])
game.nameList.append("Congrats, this is the last level!")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "       PPPP           ",
                              "      PPPPPP   PPPP   ",
                              "PPP   PPPPPPP  PPPPPPP",
                              "PPPP PPPPPPPP  PPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([])
game.nameList.append("This is it, just one more level!")

game.levelList.append(Level(["                      ",
                            "                      ",
                            "       PP             ",
                            "       PP             ",
                            "      PPP             ",
                            "     PPPP      PP     ",
                            "   PPPPPP             ",
                            "PPPPPPPPP          PPP",
                            "PPPPPPPPPPP     PPPPPP",
                            "PPPPPPPPPPP     PPPPPP",
                            "PPPPPPPPPPP     PPPPPP", ]))

game.enemyList.append([])
game.nameList.append("Don't fall in now!")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "PPPP                  ",
                              "PPPP                  ",
                              "        PPPPPPP       ",
                              "                      ",
                              "                      ",
                              "PPPPPPPP           PPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([Actor(10*64, 3*64, "Enemy"),
                       Actor(14*64, 3*63, "Enemy"),
                       Actor(12*64, 7*64, "Enemy")])
game.nameList.append("Watch out!")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "                PPPPPP",
                              "             PPPPPPPPP",
                              "        PPPPPPPPPP    ",
                              "        PPPPPPP       ",
                              "                      ",
                              "PPPPP             PPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([Actor(10*64, 3*64, "Enemy")])
game.nameList.append("Welcome to the land of snow!")

game.setTileset("Mountain")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "          PPP         ",
                              "          PPP         ",
                              "          PPP         ",
                              "PPPP......PPP......PPP",
                              "PPPP...............PPP",
                              "PPPP...............PPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([])
game.nameList.append("Swim?")

game.levelList.append(Level( ["PPPPP                ",
                              "PPPPP                 ",
                              "                      ",
                              "                      ",
                              "PPP                   ",
                              "PPPPP                 ",
                              "PPPPP                 ",
                              "PPPPP.............PPPP",
                              "PPPPP..H..........PPPP",
                              "PPPPP..HH........HPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([])
game.nameList.append("What lies beneath the waves?")

game.levelList.append(Level( ["PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "                      ",
                              "                      ",
                              "PP........PP        PP",
                              "PP...HH...PP   PP   PP",
                              "PP........PP        PP",
                              "PPH.......PPP       PP",
                              "PP....H...PP    P   PP",
                              "PP....H..HPP    P  PPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([])
game.nameList.append("Like left, like right")

game.levelList.append(Level( ["                  PPPP",
                              "                    PP",
                              "                      ",
                              "                      ",
                              "PP                  PP",
                              "PP                  PP",
                              "PP..................PP",
                              "PP.........PPPHHHH..PP",
                              "PP.....PP..PPP......PP",
                              "PPHHHHHPPHHPPP......PP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([Actor(19*64, 9*64, "Enemy")])
game.nameList.append("3 Pools of Water")

game.levelList.append(Level( ["PPPPPPPPPP     PP     ",
                              "PPPPPPPPPP     PP     ",
                              "         PP    PP     ",
                              "          PP   PP     ",
                              "PP             PP   PP",
                              "PP             P    PP",
                              "PP        PP       PPP",
                              "PP                 PPP",
                              "PP                PPPP",
                              "PP.......PPPP.....PPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))


game.enemyList.append([])
game.nameList.append("The only way is up?")

game.setTileset("Grass")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([])
game.nameList.append("Good luck!")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "           PPP        ",
                              "                      ",
                              "                      ",
                              "       PPPP       PPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([Actor(5 * 64, 0, "Enemy")])

for i in range (0, 100):
    game.enemyList[len(game.enemyList)-1].append(Actor(random.randint(3, 17)*64, -(i^3)*64, "Enemy"))

game.nameList.append("Its raining & pouring & this game is boring!!")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "           PP         ",
                              "         PPPPP...P    ",
                              "PPPPPPPPPPPPPPPPPPPPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([])
game.nameList.append("There's a long road ahead")

game.levelList.append(Level( ["                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "                      ",
                              "        PP            ",
                              "      PPPP........PP  ",
                              "      PPPPH.......PPPP",
                              "PPPPPPPPPPPPPPPPPPPPPP", ]))

game.enemyList.append([])
game.nameList.append("This is level 1!")

def main():
    game.setCurrentLevel(game.levelList[0])

    running = True
    while running:
        for event in pygame.event.get():
            if event.type==pygame.QUIT:
                sys.exit()

        if game.gameState == "PLAYING":
            window.fill((25, 134, 242))
            for enemy in game.enemyList[game.levelCounter]:
                enemy.update()
            player.update()
            game.getCurrentLevel().update()
            game.levelTitle.update()
            game.drawLives()
        elif game.gameState=="STARTSCREEN":
            startScreen.update()
        elif game.gameState=="CREDITSSCREEN":
            creditsScreen.update()

        elif game.gameState=="ENDSCREEN":
            window.fill((25, 134, 242))
            game.getCurrentLevel().update()
            endScreen.update()
            pressed = pygame.key.get_pressed()
            if pressed[pygame.K_RETURN]:
                running = False
        game.clock.tick(60)

        game.animate()
        pygame.display.update()

if __name__ == '__main__':
    main()
pygame.quit()
