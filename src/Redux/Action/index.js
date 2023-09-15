import { collection, query } from 'firebase/firestore';
import { addNewTodo, stopUpdateNewTodo,deleteNewTodo } from '../Reducer/index';
import { db } from "../../firebaseDb";
import { addDoc, serverTimestamp } from "firebase/firestore";
import {  where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Add action creator Todo Function
export const addTodo = (todos) => async (dispatch) => {
    if (todos.trim() !== "") {
        if (!todos.some((todo) => todo.todos === todos.trim())) {
          try {
            await addDoc(collection(db, "item"), {
              todos: todos.trim(),
              timestamp: serverTimestamp(),
            });
            
          } catch (error) {
            console.error("Error adding item: ", error);
          }
        } else {
          console.error(`Item ${todos} already exists.`);
        }
      } else {
        console.error("New item cannot be empty.");
      }
};



// For updating todos action creator
export const updateTodo = (id, editedItem) => async (dispatch)=> {
  try{
    await updateDoc(doc(db, "Items", id), {
      todos: editedItem,
      timestamp: serverTimestamp(),
    });  
    dispatch(stopUpdateNewTodo());
  }
  catch (error){
    console.log("Error Found in Updaing Function", error);
  }
}

// For Delete Todos action creator
export const deleteTodo = (id) => async(dispatch) => {
  try {
    await deleteDoc(doc(db, "Items", id));
    dispatch(deleteNewTodo());
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
}