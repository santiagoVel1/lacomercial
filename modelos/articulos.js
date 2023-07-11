const url = './api/datos.php?tabla=articulos';

export async function obtenerArticulos(){
  let res = await fetch(`${url}`);
  let datos = await res.json();
  if(res.status !==200){
    throw error ('los datos no existen')
  }
  return datos;
}