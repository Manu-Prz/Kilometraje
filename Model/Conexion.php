<?php

    class Conexion extends PDO {
        //Propiedades XAMPP
            private $host = "localhost";
            private $dbname = "dbs10014061";
            private $name = "manuel";
            private $passwd = "abc123.";

        //Propiedades hosting
        /*
            private $host = 'db5011891539.hosting-data.io';
            private $dbname = 'dbs10014061';
            private $name = 'dbu5595842';
            private $passwd = "Qu!3NfU3R4C0Nd=7!3R0";
        */

        //Métodos

            public function __construct() {
                
                try {
                    parent::__construct("mysql:host=$this->host;dbname=$this->dbname;charset=utf8",$this->name, $this->passwd);
                    $this->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
   
                } catch (PDOException $e) {
                    return ["err" => $e->getMessage()];
                    
                }
                
            }
    }