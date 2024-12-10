# Solución al bug de la extensión de Postman en VSCode que no muestra la respuesta en la pestaña Pretty

1. Cerrar VSCODE (Todas las instancias abiertas)

2. Abrir una terminal de PowerShell en la carpeta del proyecto y ejecutar este comando:

```bash
code --disable-features=PlzDedicatedWorker
```

3. Esto abrirá VSCODE y al hacer una request en la extensión de Postman ya se verá la pestaña `Pretty` correctamente

# Opcion 2 (RECOMENDADA):

En Windows, puedes editar el acceso directo que usas para abrir VS Code:

1. Haz clic derecho en el acceso directo de VS Code y selecciona Propiedades.

2. En el campo Target, añade la bandera después del ejecutable:

```text
"C:\Users\Leader\AppData\Local\Programs\Microsoft VS Code\Code.exe" --disable-features=PlzDedicatedWorker
```

4. Haz clic en Aplicar y luego en Aceptar.

Cuando abras VS Code desde este acceso directo, la función estará desactivada automáticamente.

# Opcion 3 (no funciona del todo bien):

Si no quieres agregar cada vez esa bandera edita el alias de `code`

Si deseas que el cambio sea aplicable cada vez que inicies VS Code desde la terminal, puedes usar una variable de entorno global o configurar un alias:

- En PowerShell, agrega este alias al perfil:

```powershell
Set-Alias code "code --disable-features=PlzDedicatedWorker"
```

Nota: En powershell no sirvió pero en GitBash si

- En Git Bash o Linux, agrega esto al archivo ~/.bashrc o ~/.zshrc:

```text
# archivo ~/.bashrc
alias code="code --disable-features=PlzDedicatedWorker"
```

Luego, al escribir code, se ejecutará siempre con esa bandera.
