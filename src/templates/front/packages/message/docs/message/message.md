---
dependencias:
  - iam
  - o-auth
---
## Índice
- [[#Descripción]]
- [[#Bandeja de entrada]]
	- [[#Vista rápida]]
	- [[#Vista detalle]]
- [[#Gestor de mensajes]]
	- [[#Selección de destinatarios]]
		- [[#Tenants gestores]]
		- [[#Tenants destinatarios]]
		- [[#Scope destinatarios]]
		- [[#Tags destinatarios]]
		- [[#Cuentas destinatarias]]
		- [[#Combinación de grupos destinatarios y cuentas destinatarias]]
		- [[#Envío a todas las cuentas]]
		- [[#Envío solo a cuentas destinatarias]]
	- [[#Redacción de mensaje]]
- [[#Reglas técnicas]]
	- [[#Cron]]
	- [[#Inbox]]
	- [[#Contabilización de leídos]]
	- [[#KPIs por mensaje]]
- [[#Log de mensajes]]

## Descripción
Message es una aplicación pensada para emitir comunicados a los usuarios de aurora. 
Solo está disponible para usuario logueados dentro de Aurora, por lo que es necesario algún tipo de autenticación para identificar los usuarios.


Dentro de la aplicación encontramos dos apartados diferenciados:
- Administración de mensajería
- Bendeja de entrada

## Bandeja de entrada

### Vista rápida
Por una parte tenemos un acceso a la bandeja de entrada en la parte superior derecha de la aplicación, donde indica el número de mensajes pendiente de lectura.

![[message-01.jpg]]

Si pulsamos sobre el icono nos aparecerá una vista resumida de los 10 últimos mensajes que tenemos en nuestra bandeja de entrada.

![[message-02.jpg|400]]

Los mensajes pendientes de lectura aparecerán marcados con un punto en la en lado derecho, si nos ubicamos sobre el mensaje aparecerá una X para poder eliminar el mensaje, y pulsando sobre el mismo nos redirigirá a la versión extendida del mensaje ubicada en la bandeja de entrada.

### Vista detalle
Dentro de la vista de detalle, arriba a la izquierda, tenemos el icono de opciones ![[message-04 1.jpg|15]], que nos despliega las siguientes acciones:

- Marcar mensaje como leído
- Borrar mensaje

También disponemos el indicados de mensaje importante ![[message-05.jpg|15]], para resaltar la relevancia del mensaje.

![[message-03.jpg|600]]

En el resto de pantalla se podrá ver el título del mensaje, el cuerpo del mismo y los adjuntos del mensaje, pulsando sobre los mismos, serán descargados.

## Gestor de mensajes
Desde este apartado se podrán confeccionar y lanzar mensajes a los grupos o usuarios que sean de interés.

Cuando creamos un mensaje, tendremos dos pestañas a seleccionar:
- **Destinatarios**, pestaña para seleccionar los tenants que pueden gestionar y visualizar la gestión del mensaje, y los usuarios a los que se enviarán el mensaje.
- **Redacción de mensaje,** pestaña para confeccionar el mensaje y adjuntar información adicional.

### Selección de destinatarios
Dentro de la sección de destinatarios disponemos de la siguientes opciones:

![[message-06.jpg]]

#### Tenants gestores
En el caso de tener una aplicación multi-tenant deberemos indicar los tenants que pueden visualizar y gestionar el mensaje.

Los tenants que aparecen en el listado, son tenants a los que pertenece el usuario creador del mensaje, no podrá otorgar la gestión del mensaje a un tenant al que no se pertenezca.

> [!Atención]
> Esto permitirá a usuarios gestionar el mensaje, no significa que estos usuarios recibirán los mensajes.

#### Tenants destinatarios
Introduciremos aquellos tenants que recibirán el mensaje redactado, solo aparecerán aquellos tenants que el usuario creador del mensaje pertenezca.
En caso de no indicar ningún tenant, automáticamente se seleccionarán todos los tenants a los que pertenece el usuario que está creando el mensaje.
![[message-10.jpg]]
#### Scope destinatarios
Dentro del package OAuth podemos generar Scopes asociados a un Client (CLIENT_CREDENTIALS, PASSWORD AUTHORIZATION_CODE), estos scopes son asignados a cuentas de IAM, seleccionando estos scopes estamos incluyendo las cuentas a las que serán enviadas el mensaje.
![[message-11.jpg]]
#### Tags destinatarios
Dentro del package de IAM podemos crear tags que pueden ser asignados a cuentas, seleccionando estos tags en el apartado de tads destinatarios, estamos incluyendo a las cuentas que posean esos tagas.
![[message-12.jpg]]
#### Cuentas destinatarias
Dentro de esta sección podremos seleccionar usuarios de forma unitaria.
![[message-13.jpg]]

#### Combinación de grupos destinatarios y cuentas destinatarias
Las opciones **Tenant destinatarios, Scope destinatarios y Tags destinatarios**, son filtros **excluyentes**, de tal manera que si seleccionamos uno o varios tenants, unos o varios scopes y uno o varios tags, solo se enviará el mensaje a las cuentas de los tenants indicados que sus cuentas tengan alguno de los scopes indicados y alguna de las tags indicadas.

Si además seleccionamos alguna cuenta en la tabla **Cuentas destinatarias**, es una opción **incluyente**, de tal manera que se enviará el mensaje a esas cuentas, indistintamente de las opciones marcadas anteriormente.
![[message-14.jpg]]

#### Envío a todas las cuentas
Si deja todos los campos de destinatarios vacíos, se enviará el mensaje a todos los integrantes de la organización, siempre y cuado el usuario tenga acceso a todos los tenants de la organización. Siempre se establecerán por defecto todos los tenants a los que el usuario creador del mensaje tiene acceso.

#### Envío solo a cuentas destinatarias
Otro escenario posible es el envío a solo unas cuentas en particular, para realizar esta operación hay que dejar todos los campos de grupos destinatarios vacíos y solo indicar las cuentas destinatarias  a enviar.

### Redacción de mensaje
A la hora de redactar un mensaje nos encontramos los siguientes campos bajo la pestaña **Redacción de mensaje:**

![[message-07.jpg]]

**Enviar el**, fecha que deseas enviar el mensaje, ideal para dejar un mensaje programado.
**Es importante,** check para que al destinatario le aparezca el mensaje como importante.
**Asunto**, indica de que va a tratar el mensaje a enviar.
**Zona de contenido**, escribe el cuerpo del mensaje usando las posibilidades del editor de texto.
**Zona de adjuntos**, adjunta imágenes o ficheros que quieres enviar con el mensaje.


## Reglas técnicas

### Cron
Con la instalación del módulo, se implementa una tarea cron que **se ejecuta cada 5 min**, esta tarea es la encarga de consultar todos los mensajes pendientes de envío y que su fecha de envío es nula o anterior a la fecha actual.

Todos aquellos mensajes que cumplan con esos requisitos, serán puestos en bandeja de salida y marcados como enviados.

> [!Atención]
> Cuando un mensaje es enviado no podrá ser modificado.

### Inbox
Cada cuenta, cada vez que realiza un login contra el sistema, procederá comprobar su **Configuración de Inbox**, en esta configuración se indica cual fuel el último mensaje que ha sido consultado, en caso de no tener una **Configuración de Inbox** se procederá a crear una nueva estableciendo el código del último mensaje enviado como valor de último mensaje recibido.

El siguiente paso será comprobar contra las bandeja de salida, si hay algún mensaje que cumpla con el target en receptores, y además que su código de mensaje sea superior al código registrado en su **Configuración de Inbox**, todos los mensajes que cumplan esta casuística serán creados en el Inbox de la cuenta.

Una vez realiza todo el proceso, marcaremos en la **Configuración del Inbox** de la cuenta, el código del mensaje más reciente enviado.

### Contabilización de leídos
Cuando nos posicionamos sobre un mensaje, a los 4 segundos se marcará como leído de forma automática. Esto provocará dos cambios:

- El mensaje quedará marcado como, leído.
- El mensaje quedará marcado como, leído al menos una vez.

El valor de **leído**, el usuario de la cuenta, lo podrá modificar desde su gestor de mensajes, pero el valor de  **leído al menos una vez**, no lo podrá cambiar.

### KPIs por mensaje
En la cabecera de una edición del mensaje en el Gestor de Mensajes, disponemos de los siguientes KPIs.

![[message-08.jpg]]

**Destinatarios,** número total de cuentas que recibirán el mensaje.
**Leídos,** número de mensajes leídos **al menos una vez**.
**Por leer,** sale de la resta de destinatarios y **mensajes leídos al menos una vez**. 

## Log de mensajes
Dentro del apartado **Log de Mensajes** tenemos la posibilidad de buscar en todos los buzones de entrada un mensaje concreto enviado a una cuenta concreta, para comprobar si ese mensaje en particular ha sido leído al menos una vez o leído.

![[message-09.jpg]]