# Cross Platform Text Recognition Using OpenSource OCR Engine

~Tesseract is an OpenSource OCR Engine used widely in applications and it is backed by Google. I will be using Ionic Platform to develop application and run Tesseract web-service on Ubuntu machine and pass the taken image to web-service and get back the result. The Tesseract web-service can be run in a docker container.~

***Things needed***
  - Ionic Application 
  - [Tesseract Web Service](https://github.com/guitarmind/tesseract-web-service)


First create a new application in Ionic

```sh
$ ionic start camera blank
$ cd camera
$ cordova add platform android
$ cordova add platfor ios
```

Now it is time to add `ngCordova`. It will be used by the camera plugin.

```sh
$ cordova plugin add cordova-plugin-camera
```

Now run 

For Android

```sh
$ ionic build android
$ ionic run android
```

For iOS
```sh 
$ ionic build ios
$ ionic run ios
```

Now application will run on Android or iOS. So, we need to add Tesseract Web service. Clone [Tesseract Web Service](https://github.com/guitarmind/tesseract-web-service) in Ubuntu or use the documentation to install on docker.
You must have Tesseract and Python install in Ubuntu to run **Tesseract Web Service**.

To install **Tesseract** on Ubuntu, open Terminal and 

```sh
$ sudo apt-get install tesseract-ocr
```

To install Tesseract default training data for english

```sh
$ sudo apt-get install tesseract-ocr-eng
```

After installing, test Tesseract by giving sample picture to get textual data from image

```sh
$ tesseract image.png scanned.txt
```

You will get recognized text in the same directory.

Now, its time to test Tesseract Web Service. Fire up tesseract web service by going into its directory and run
```sh
$ python tesseractserver.py -p 1688 -b /usr/lib -d /usr/share/tesseract-ocr/tessdata/
```

The web service provides two HTTP GET pages for testing the API:

```sh
Upload Image File: http://localhost:1688/upload
Fetch Image From URL: http://localhost:1688/fetchurl
```

Now, before running Ionic Application, you will need to change ip address in 
```sh
www/js/app.js
```

After changing ip address, run application again an you will be able to take image, upload it to Tesseract local server and you will get results back.








