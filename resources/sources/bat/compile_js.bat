::CONFIGURACION PARA COMPILAR EN PRODUCCION
java -jar "..\\..\\tools\\compilers\\closure-compiler\\compiler.jar" ^
--compilation_level=ADVANCED ^
--warning_level=VERBOSE ^
--js="..\\..\\..\\app\\static\\packages\\development\\js\\app.js" ^
--externs="..\\externs\\jquery-1.9.js" ^
--externs="..\\externs\\customTypes.js" ^
--output_wrapper="(function(){ %%output%% }());" ^
--js_output_file="..\\..\\..\\app\\static\\packages\production\\js\\app.js"