<?php
require_once 'modelos.php';

if(isset($_GET['tabla'])){
    $t = $_GET['tabla'];
   
    $tabla = new ModeloABM('articulos');

    if(isset($GET_["id"])){
    $tabla->set_criterio("id="$_GET['id']);
    }
    if(isset($_GET['accion'])){
        switch($_GET['accion']){
            case 'seleccionar':
                $datos = $tabla->selecionar();
                echo $datos;
                break;

            case 'insertar':
                $valores = $_POST;
                $tabla->insertar($valores);
                $mensaje .= 'datos guardados';
                echo json_encode($mensaje);
                break;
                case 'actualizar'
                $valores = $_POST;
                $tabla->actualuzar($valores);
                $mensaje .= `datos actualizados`;
                echo json_encode($mensaje);
                break;

                case 'eliminar':
                    $tabla->eliminar();
                    $mensaje = 'registro eliminado'
                    echo json_encode($mensaje);
                    break;
        }
    }
}                                                                                             