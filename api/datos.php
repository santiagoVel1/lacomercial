<?php
require_once 'modelos.php';

if(isset($_GET['tabla'])){
    $t = $_GET['tabla'];


$tabla = new ModeloABM('articulos');

$datos = $tabla->seleccionar();
echo $datos;
}                                                                                             