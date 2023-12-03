Este proyecto tiene como finalidad, poner a prueba las capacidades y conocimientos adquridos durante las clases
Esta página, incluye un manejo de API, que contiene 50 productos de un bar
Este proyecto, tiene como funcionalidad mostrar una lista de productos.
Con este listado, se puede hacer inserciones, ediciones, eliminaciones de los elementos de la API

Lo primero que hace la página, es hacer un llamado a la API, para traer los datos y mostrarlos en una tabla

La tabla muestra los 5 atributos más relevantes de cada producto. Como lo son, el ID, la MARCA, la CATEGORIA, la CANTIDAD EN STOCK, el PRECIO y el PORCENTAJE DE ALCOHOL. También incluye una sección para editar y eliminar cada elemento

Si se desea hacer una inserción de un nuevo elemento, el botón de AÑADIR PRODUCTO, invoca a un "modal", o "ventana emergente" con los respectivos campos para hacer la inserción del nuevo producto. Luego ejecuta un método que ingresa el nuevo producto en la API

Para hacer una edición, se invoca un "modal", que trae todos los atributos del producto y la opción de modificarlos. Esto lleva a la APi, los nuevos datos y los sobreescribe

Para eliminar, se toma el ID y la MARCA del producto y se muestra otro "modal" con una pregunta de confirmación. Si se confirma la eliminación, se ejecuta el método que toma el ID y borra todos los datos relacionados a ese ID

