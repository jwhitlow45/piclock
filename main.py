import cv2
from rpi_backlight import Backlight
from datetime import datetime

BACKLIGHT = Backlight()
BACKLIGHT.power = False
BACKLIGHT.brightness = 25

FACES_THRESHOLD = 1
DISPLAY_TIMEOUT = 15

def main():
    
    cam = cv2.VideoCapture(0)
    classifier = cv2.CascadeClassifier('face_model.xml')
    
    facial_detection(cam, classifier)
        
    cam.release()
    
    
def facial_detection(cam, classifier):
    
    buffer = []
    prevface = datetime.now()

    while True:
        _, frame = cam.read()
        
        # convert frame to gray
        grayframe = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # detect face
        faces = classifier.detectMultiScale(grayframe, 1.1, 4)
        
        if (len(faces) > 0):
            buffer.append(faces)
            if len(buffer) >= FACES_THRESHOLD:
                prevface = datetime.now()
                BACKLIGHT.power = True
                buffer = []
        else:
            if (datetime.now() - prevface).seconds > DISPLAY_TIMEOUT:
                BACKLIGHT.power = False
            buffer = []            
        
        # esc to exit
        k = cv2.waitKey(1)
        if k % 256 == 27:
            break
        
def draw_face_boxes(frame, faces):
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
        
    return frame


if __name__ == '__main__':
    main()
