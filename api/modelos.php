<?php
require_once 'config.php';

class Modelo {

    protected $_db;

    public function __construct() {
      $this->_db = new mysqli(BD_HOST,BD_USER,BD_PASS,BD_NAME);
      if($this->_db->connect_errno) {
        echo'falle al conectar a mySQL: '.$this->_db->conect_error;
        return;
      }
      $this->_db->set_charset(BD_CHARSET);
      $this->_db->query("SET NAMES 'utf8'");
    }
}

class ModeloABM extends Modelo {
  private $tabla;
  private $id = 0;
  private $criterio = '';
  private $campos = '*';
  private $order = 'id';
  private $limit = 0;

  public function __construct($t) {
    parent::__construct();
    $this->tabla = $t;
  }


  public function get_tabla() {
    return $this->tabla;
  }
  public function get_id() {
    return $this->id;
  }
  public function get_criterio() {
    return $this->criterio;
  }
  public function get_order() {
    return $this->order;
  }
  public function get_limit() {
    return $this->limit;
  }

  public function set_tabla($tabla) {
    $this->tabla = $tabla;
  }
  public function set_id($id) {
    $this->id = $id;
  }
  public function set_criterio($criterio) {
    $this->criterio = $criterio;
  }
  public function set_campos($campos) {
    $this->campos = $campos;
  }
  public function set_order($order) {
    $this->order = $order; 
  }
  public function set_limit($limit) {
    $this->limit = $limit;
  }

  public function seleccionar () {
    $sql = "SELECT $this->campos FROM $this->tabla";
    if($this->criterio != ''){
      $sql .= " WHERE $this->criterio";
    }
    $sql .= " ORDER BY $this->order";
    if($this->limit > 0) {
      $sql .= " LIMIT $this->$limit";
    }
    //echo $sql . '<br>';
    $resultado = $this->_db->query($sql);

    $datos = $resultado->fetch_all(MYSQLI_ASSOC);
    //print_r($datos);
    $datos_json = json_encode($datos);
    //print_r($datos_json);

    return $datos_json;
  }

}
?>