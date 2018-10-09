from PIL import Image

open('ASCIItext.txt', 'w').close()
fileToWriteTo=open("ASCIItext.txt", "w")

#change this to your file name
fileName="received_270635460247420.jpg"
image=Image.open(fileName)
imageData=image.load()

imageDim=image.size

for i in range(0,imageDim[1]):
    if i%2==0:
        continue

    for j in range(0,imageDim[0]):
        if (imageData[j,i][0]<10 and imageData[j,i][1]>245 and imageData[j,i][2]<10):
            fileToWriteTo.write("!")
            continue
        greyColor=(0.299*imageData[j,i][0]+0.587*imageData[j,i][1]+0.114*imageData[j,i][2])
        ASCIIgreyScale=" .:-=+*#%@"[::-1]
        fileToWriteTo.write(ASCIIgreyScale[int(greyColor//25.6)])
    fileToWriteTo.write("\n")
fileToWriteTo.close()
fileToWriteTo=open("ASCIItext.txt", "r")
fileList=fileToWriteTo.read().split("\n")
print(fileList)
