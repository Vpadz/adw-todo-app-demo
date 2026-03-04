# Feature: Diálogo de Confirmación al Eliminar Todo

**ADW ID:** af5f2fa6
**Fecha:** 2026-03-04
**Especificación:** .issues/3/plan.md

## Overview

Se añadió un diálogo modal de confirmación que se muestra antes de eliminar una tarea en la aplicación Todo List. Esto evita eliminaciones accidentales al requerir que el usuario confirme explícitamente la acción destructiva.

## Que se Construyo

- Componente `ConfirmDialog` reutilizable para confirmaciones modales
- Integración del diálogo en `TaskItem` para interceptar el flujo de eliminación
- Estilos CSS para el overlay y el cuadro de diálogo
- Tests unitarios del componente `ConfirmDialog`
- Tests actualizados de `TaskItem` para cubrir el nuevo flujo de confirmación

## Implementacion Tecnica

### Ficheros Modificados

- `frontend/src/components/TaskItem.jsx`: Añadido estado `showConfirm`, cambiado `onClick` del botón "Eliminar" para abrir el diálogo en lugar de eliminar directamente, integrado `ConfirmDialog`
- `frontend/src/index.css`: Añadidos estilos para `.confirm-overlay`, `.confirm-dialog`, `.confirm-actions`, `.btn-cancel`, `.btn-confirm`
- `frontend/src/__tests__/TaskItem.test.jsx`: Actualizado test de eliminación para verificar el flujo con confirmación; añadidos nuevos tests

### Ficheros Nuevos

- `frontend/src/components/ConfirmDialog.jsx`: Componente modal reutilizable con props `open`, `message`, `onConfirm`, `onCancel`
- `frontend/src/__tests__/ConfirmDialog.test.jsx`: Tests unitarios del componente `ConfirmDialog`

### Cambios Clave

- `ConfirmDialog` retorna `null` cuando `open` es `false`, evitando cualquier renderizado innecesario
- El overlay usa `position: fixed; inset: 0; z-index: 1000` para cubrir toda la pantalla y bloquear interacciones
- `TaskItem` maneja el estado `showConfirm` localmente con `useState`; al confirmar llama a `onDelete(task.id)` y cierra el diálogo; al cancelar solo cierra el diálogo
- El mensaje del diálogo incluye el título de la tarea: `¿Eliminar la tarea "${task.title}"?`
- No se añadieron nuevas dependencias npm ni gemas Ruby

## Como Usar

1. En la lista de tareas, hacer clic en el botón **"Eliminar"** de cualquier tarea
2. Aparece un modal con el mensaje `¿Eliminar la tarea "título"?`
3. Hacer clic en **"Confirmar"** para eliminar la tarea permanentemente
4. Hacer clic en **"Cancelar"** para cerrar el diálogo sin eliminar la tarea

## Configuracion

No requiere configuración adicional. El componente `ConfirmDialog` es stateless y se controla completamente mediante props.

## Testing

```bash
cd frontend && npm test -- --run
```

- `ConfirmDialog.test.jsx`: Cubre renderizado condicional, visualización del mensaje, y callbacks de los botones "Cancelar" y "Confirmar"
- `TaskItem.test.jsx`: Cubre que el clic en "Eliminar" abre el diálogo, que "Confirmar" llama a `onDelete`, y que "Cancelar" cierra el diálogo sin eliminar

## Notas

- El componente `ConfirmDialog` es reutilizable para otras acciones destructivas futuras (ej: borrar listas, limpiar completadas)
- El overlay bloquea la interacción con el resto de la página mientras el diálogo está abierto
- Los tests de `App.test.jsx` no requirieron modificación ya que el flujo de delete desde el componente padre no cambió
