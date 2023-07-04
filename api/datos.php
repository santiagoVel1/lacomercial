<?php
require_once 'modelos.php';

$tabla = new ModeloABM('articulos');

$datos = $tabla->seleccionar();
echo $datos;