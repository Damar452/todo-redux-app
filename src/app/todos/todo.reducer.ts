import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, limpiarTodos, toggle, toggleAll } from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a thanos'),
  new Todo('Comprar un traje'),
  new Todo('Tomar las vitaminas'),
];

const _todoReducer = createReducer(
    estadoInicial,
    on(crear, (state, {texto}) => [...state, new Todo(texto)]),
    on(limpiarTodos, state => state.filter(todo => !todo.completado)),
    on(borrar, (state, {id}) => state.filter(todo => todo.id !== id)),
    on(toggle, (state, {id} ) => {
      return state.map( todo => {
        
        if(todo.id === id){
          return {
            ...todo,
            completado: !todo.completado
          }
        } else {
          return todo;
        }

      });
    }),

    on(editar, (state, {id, texto} ) => {
      return state.map( todo => {
        
        if(todo.id === id){
          return {
            ...todo,
            texto: texto
          }
        } else {
          return todo;
        }

      });
    }),

    on(toggleAll, (state, { completado } ) => {
      return state.map( todo => {
          return {
            ...todo,
            completado: completado
          }
      });
    }),
    
  );
   
  export function todoReducer(state: Todo[] | undefined, action: Action) {
    return _todoReducer(state, action);
  }