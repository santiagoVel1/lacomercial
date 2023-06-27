<?
require_once 'config.php';

class modelo {

    protected $_db;
    public function __construct() {
$this->_db = new mysqli(BD_HOST,BD_USER,BD_PASS,BD_NAME);
if( $this->_db->connect_errno){
  echo'falle al conectar a mySQL: '.$this->_db->conect_error;
  return;
}
$this->_db->set_charset(DB_CHARSET);
$this->_db->query("SET NAMES 'utf8'")
}
}
class modeloABM extends modelo{
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
}

public function obtener_tabla() {
    return $this->tabla;
}
public function obtener_id() {
    return $this->id;
}
public function obtener_criterio() {
    return $this->criterio;
}
public function obtener_order() {
    return $this->order;
}
public function obtener_limit() {
    return $this->limit;
}

public function set_tabla($tabla)
  $this->tabla = $tabla;
public function set_id($id)
  $this->id = $id;
public function set_criterio($criterio)
  $this->criterio = $criterio;
public function set_campos($campos)
  $this->campos = $campos;
public function set_order($order)
  $this->order = $order;
  public function set_limit($limit)
  $this->limit = $limit;

?>