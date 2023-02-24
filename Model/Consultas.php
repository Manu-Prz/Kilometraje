<?php

use PSpell\Config;

    class Consultas extends Conexion {
        //Propiedades

        //Métodos
        public static function introducirRegistro($arr) {
            $conexion = new Conexion();

            try {
                $query = "INSERT INTO kilometros(fecha, lugar_desplazamiento, num_km, trayecto, concepto, importe) VALUES (:fecha, :lugar_desplazamiento, :num_km, :trayecto, :concepto, :importe)";
                $prepQuery = $conexion->prepare($query);
                $arr["importe"] = $arr["num_km"] * 0.19;
                $prepQuery->execute($arr);
            } catch (PDOException $e) {
                return("Error: " . $e->getMessage());
            }

            return $resultado["resultado"] = "OK";
        }

        public static function listarTodos() {
            $conexion = new Conexion();

            try {
                $query = "SELECT fecha, lugar_desplazamiento, num_km, trayecto, concepto, importe FROM kilometros";
                $prepQuery = $conexion->prepare($query);
                $prepQuery->execute();

            } catch (PDOException $e) {
                return("Error: " . $e->getMessage());
            }

            return $prepQuery->fetchAll(PDO::FETCH_ASSOC);
            
        }
    }