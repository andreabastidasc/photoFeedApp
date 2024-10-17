# PhotoFeed App

PhotoFeed App es una aplicación web sencilla que permite a los usuarios capturar fotos usando la cámara de su dispositivo y subirlas a una API simulada. La aplicación cuenta con manejo de conectividad, donde el botón de publicación se desactiva cuando el usuario pierde la conexión a internet y se habilita automáticamente cuando la conexión se restaura.

## Características

- Captura fotos usando la cámara del dispositivo.
- Sube las fotos a un endpoint de MockAPI.io.
- Desactiva automáticamente el botón de publicación cuando no hay conexión a internet.
- Detecta la restauración de la conexión y vuelve a habilitar el botón de publicación.
- Interfaz responsiva para dispositivos móviles y de escritorio.

## Instalación

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/photofeed-app.git
```

## Uso

##Capturar una foto
1.Haz click en el boton de cámara que te llevara a la vista previa
2.Haz doble clic en la imagen de la vista previa para abrir la cámara.
3.Si el dispositivo no tiene cámara, puedes seleccionar una imagen desde el archivo usando el input de archivo.
4.Haz clic en el botón Capturar para tomar la foto.
5.Escribe un título en el campo de texto.
6.Haz clic en el botón Confirmar para subir la foto.

## Subir una foto
Cuando hagas clic en el botón Confirmar, la foto capturada se enviará a un endpoint de MockAPI.io como una solicitud POST.

## Previews de la app instalada

![Preview](https://andreabastidasc.github.io/photoFeedApp/assets/img/app-preview-1.jpg)

![Preview](https://andreabastidasc.github.io/photoFeedApp/assets/img/app-preview-2.jpg)

