/* Helps in creating consistent API response objects. */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  meta?: Record<string, any>;
}

export class ResponseFormat {
  static success<T>(
    data: T,
    message: string = 'Operation successful',
    meta?: Record<string, any>
  ): ApiResponse<T> {
    return {
      status: 'success',
      message,
      data,
      meta,
    };
  }

  static error(
    message: string = 'An error occurred',
    meta?: Record<string, any>
  ): ApiResponse<null> {
    return {
      status: 'error',
      message,
      data: null,
      meta,
    };
  }
}

/*
ATRIBUTOS:

`status`: Indica si la operación fue exitosa o falló ("success" o "error").
`message`: Describe brevemente el resultado de la operación.
`data`: Contiene el contenido específico del endpoint (usuario, producto, etc.).
`meta` (Opcional): Información adicional, como paginación, tiempos de procesamiento, etc.


Ejemplo:

{
  "status": "success",
  "message": "Products fetched successfully",
  "data": [
    { "id": "1", "name": "Product 1", "price": 100 },
    { "id": "2", "name": "Product 2", "price": 150 }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50
    }
  }
}

RESPUESTAS DE ERROR:

{
  "status": "error",
  "message": "Invalid credentials",
  "data": null,
  "meta": {
    "code": 401
  }
}
*/

/*
NOTA: El tipo Record<string, any> en TypeScript se usa para representar un objeto genérico donde:

- `string` es el tipo de las claves (keys) del objeto.
- `any` es el tipo de los valores (values) del objeto.

En términos simples, Record<string, any> describe un objeto cuya clave siempre es una cadena (string), y los valores pueden ser de cualquier tipo.

- Record<string, any> VS { [key: string]: any }

Ambos son equivalentes. Puedes usar cualquiera, pero Record<string, any> es más conciso y comúnmente utilizado.
*/
