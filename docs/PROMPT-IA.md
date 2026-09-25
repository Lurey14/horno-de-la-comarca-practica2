# Prompt de IA aplicado a la web

Este es el prompt de diseño que guía la creación de la página de panadería. Los archivos de evidencia y el informe final registrarán los pasos realmente ejecutados y sus capturas, sin atribuir fechas o acciones que no se hayan registrado.

```text
Actúa como diseñadora de experiencia e interfaz y desarrolladora experta en Vue 3. Crea para este proyecto una web completa, original y adaptable para “El Horno de la Comarca”, una panadería de fantasía inspirada en el Legendarium de Tolkien.

REQUISITOS:
- Usa Vue 3, TypeScript, Vite y Vue Router. Conserva la estructura del proyecto cuando sea práctico y mantén la aplicación liviana.
- Diseña tres vistas: Inicio, Menú y Encargos. La portada debe sentirse acogedora; el menú debe permitir buscar, filtrar y añadir productos a una cesta; Encargos debe confirmar un pedido de demostración.
- Presenta productos imaginarios como pan de miel de Beorn, tarta de manzana de la Comarca, bollos del Dragón Verde y pan de viaje élfico. Usa precios de muestra claramente editables en bolivianos.
- Usa una dirección visual cálida: crema y pergamino, verde bosque, corteza de pan y detalles de latón envejecido. Incluye una ilustración propia de una panadería fantástica, tarjetas atractivas y una navegación clara en móvil y escritorio.
- Escribe descripciones originales y breves. No copies ilustraciones, logotipos, texto extenso ni material de películas o libros. No uses imágenes externas ni fuentes remotas; prefiere SVG y CSS locales para que la página cargue rápido.
- La cesta permite modificar cantidades y enviar un pedido de prueba a una API local. No integres pagos reales ni solicites datos personales. Muestra claramente que los encargos son demostrativos.
- Prepara la web para servirse desde un pequeño servidor Node.js. Redis guardará únicamente pedidos de demostración. Docker Compose ejecutará los servicios web y Redis con un volumen nombrado persistente.
- Usa HTML semántico, etiquetas accesibles, estados vacíos y mensajes claros. Mantén componentes y datos separados para que una estudiante pueda editar el contenido en VS Code.

Primero revisa los archivos actuales y después realiza cambios enfocados, explica cuáles fueron modificados y valida la compilación de producción.
```
