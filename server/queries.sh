#
# Para obtener cabeceras añade el parametro "-i" y quita el pipe: | jq
#
# MASTER KEY : CREACION DE USUARIOS, LOGAR USUARIOS, IDENTIFICA APP VALIDAS PARA CONECTAR CON EL SERVIDOR
# &access_token=W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb
#
# GOOOGLE
# Client id: 377337024068-u3n1ddj6vhmg4ader64hhvo22shto6sp.apps.googleusercontent.com
# Client secrete: aboV5_2O3qcZoKUWA9FVrNcM
#

#****************************************************************************************
# USUARIOS
#****************************************************************************************

# USUARIOS: CREACION PACIENTE
# Role: user
# AppRole: paciente
curl -X POST http://0.0.0.0:9000/api/users -d "email=patient@patients.com&password=123456&funcRole=patient&access_token=W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb" | jq

# USUARIOS: CREACION DOCTOR
# Role: admin
# AppRole: terapeuta
curl -X POST http://0.0.0.0:9000/api/users -d "email=doc1@doctors.com&password=123456&role=admin&funcRole=doc&access_token=W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb" | jq

# USUARIOS: LOGIN [TOKEN EXPIRA EN 24h]
# Role: user
# AppRole: paciente
curl -X POST http://0.0.0.0:9000/api/auth -u "patient2@patients.com:qwerty" -d "access_token=W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb" | jq

# USUARIOS: LOGIN [TOKEN EXPIRA EN 24h]
# Role: admin
# AppRole: doc
curl -X POST http://0.0.0.0:9000/api/auth -u "dokoto.moloko@gmail.com:qwerty1" -d "access_token=W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb" | jq

# USUARIOS: LOGIN GOOGLE
# Role: admin
# AppRole: doc
# token google dokoto.moloko@gmail.com
# Url Ejemplo: https://www.daimto.com/google-authentication-with-curl/
#
# Ejecuta la siguiente url en el browser, selecciona una cuentra de gmail (dokoto) y el tratara de redirigira una url http://fake.com
# de esa url coge el codigo algo como http://fake.com/?code=4/AACKBgs8Dx2Half6IZkpbe89zEsDlE7Mqoj9TmGuP-kcag6WawHHAVn5BjFSaKnXNqtrc7ETHWfKNV7FNAFJCcE#
# toma a partir de "code=4/....." en delante y lo sustitulles en el siguiente curl donde pone [CODIGO]
# ese curl retornara un json con un access_token que usaras para logarte contra mai_server en el ultimo curl sustituye [ACCESS_TOKEN_GOOGLE]
https://accounts.google.com/o/oauth2/auth?client_id=377337024068-u3n1ddj6vhmg4ader64hhvo22shto6sp.apps.googleusercontent.com&redirect_uri=http://fake.com&scope=openid,email&response_type=code
curl -X POST https://accounts.google.com/o/oauth2/token -d "[CODIGO]&client_id=377337024068-u3n1ddj6vhmg4ader64hhvo22shto6sp.apps.googleusercontent.com&client_secret=aboV5_2O3qcZoKUWA9FVrNcM&redirect_uri=http://fake.com&grant_type=authorization_code"
curl -X POST http://0.0.0.0:9000/api/auth/google -i -d "access_token=[ACCESS_TOKEN_GOOGLE]"

# USUARIOS: CAMBIO DE PASSWORD
# Role: user
# AppRole: paciente
curl -X PUT http://0.0.0.0:9000/api/users/5aa3dc10d1fecbf0c332e69a/password -u "patient2@patients.com:123456" -d "password=qwerty"

# PASSWORD-RESET: SOLICITAR RESETEO DE PASSWORD
# Role: admin
# AppRole: terapeuta
curl -X POST http://0.0.0.0:9000/api/password-resets -d "email=dokoto.moloko@gmail.com&access_token=W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb"
# > Esto habra enviado un token al correo dokoto, seguro esta en spam pilla el token, sustituye donde [TOKEN]
curl -X GET http://0.0.0.0:9000/api/password-resets/[TOKEN]
# > Esto te retorna el otro token pillalo y lo pones en [TOKEN]
curl -X PUT http://0.0.0.0:9000/api/password-resets/[TOKEN] -d "password=qwerty1"

# USUARIOS: CONSULTA MIS DATOS
# Role: user
curl -X GET http://0.0.0.0:9000/api/users/me -d "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYTNkZmUxYzhjNTRmZjNkZDA5MjU5ZCIsImlhdCI6MTUyMDY4OTEyMX0.jPNmgKaJVnEOF-bsgt_i2kMXM6zaf5B3MlL_FUJBWdY" | jq

# USUARIOS: CONSULTA POR ID
# Role: admin
curl -X GET http://0.0.0.0:9000/api/users/5aa3dfe1c8c54ff3dd09259d -d "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYTNmZTJlZGZjYmFlZjZkOWNmMTIxNyIsImlhdCI6MTUyMDY5Njg3OH0.jTW3P1_86froo3U4_-ndyo3-Mt-k11lXjXx475bg8go" | jq

# USUARIOS: CONSULTA TODOS LOS USUARIOS
# Role: admin
curl -X GET http://0.0.0.0:9000/api/users -d "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYTNmZTJlZGZjYmFlZjZkOWNmMTIxNyIsImlhdCI6MTUyMDY5Njg3OH0.jTW3P1_86froo3U4_-ndyo3-Mt-k11lXjXx475bg8go" | jq

# USUARIOS: CONSULTA TODOS LOS USUARIOS, FILTRANDO EN name, email, o funcRole por 'patient' y ordenado por name
# Role: user
# Detalles: En el modelo de usuarios esta declarados los campo funcRole "userSchema.plugin(mongooseKeywords, { paths: ['funcRole'] })" para ser poder
# ser filtrado por el queryparam 'q=' se puede añadir tambien &fields=name para que solo salga name o &fields=-name para que no salga name
curl -X GET http://0.0.0.0:9000/api/users\?q\=patient\&sort\=name -d "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYTNmZTJlZGZjYmFlZjZkOWNmMTIxNyIsImlhdCI6MTUyMDY5Njg3OH0.jTW3P1_86froo3U4_-ndyo3-Mt-k11lXjXx475bg8go" | jq


#****************************************************************************************
# LITERALES
#****************************************************************************************

# LITERALES: CREACION LITERAL
# Role: admin
# AppRole: terapeuta
curl  -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST http://0.0.0.0:9000/api/literals -d '{"access_token": "[ADMIN TOKEN]", "lang": "es", "texts": {"test_hola": "hola", "test_adios":"paco"}}'

# LITERALES: MODIFICAION DE UN LITERAL LITERAL
# Role: admin
# AppRole: terapeuta
curl -X PUT http://0.0.0.0:9000/api/literals/5aa51bb0b39efc44e4d547c2 -d "access_token=[ADMIN TOKEN]&lang=es&texts=test_hola=adios"

# LITERALES: BORRAR IDIOMA
# Role: admin
# AppRole: terapeuta
curl -X DELETE http://0.0.0.0:9000/api/literals/5aa51bb0b39efc44e4d547c2  -d "access_token=[ADMIN TOKEN]"

# LITERALES: BUSCAR LITERAL por idioma
# Role: user
# AppRole: paciente
curl -X GET http://0.0.0.0:9000/api/literals/es/test_hola -d "access_token=[ADMIN TOKEN]"

# LITERALES: OBTENER TODOS LOS LITERALES POR IDIOMA
# Role: user
# AppRole: paciente
curl -X GET http://0.0.0.0:9000/api/literals/es -d "access_token=[ADMIN TOKEN]"
