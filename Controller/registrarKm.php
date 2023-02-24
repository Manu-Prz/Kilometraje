<?php
    include_once("../Model/Conexion.php");
    include_once("../Model/Consultas.php");

    if (isset($_POST["registrarKm"])) {

        $fecha = trim(strtoupper(strip_tags($_POST["fecha"])));
        $destino = trim(strtoupper(strip_tags($_POST["destino"])));
        $trayecto = trim(strtoupper(strip_tags($_POST["trayecto"])));
        $numKm = trim(strtoupper(strip_tags($_POST["numKm"])));
        $concepto = trim(strtoupper(strip_tags($_POST["concepto"])));
        
        $datosUsuario = [];

        $respuesta = ["validado" => true , "errores" => [], "mensaje" => ""];
        $flag = false;

        if ($fecha == "" || !preg_match_all("/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/", $fecha)) {
            $respuesta["validado"] = false;
        } else {
            $datosUsuario["fecha"] = $fecha;
        }

        if ($destino == "") {
            $respuesta["validado"] = false;
        } else {
            $datosUsuario["lugar_desplazamiento"] = $destino;
        }

        if ($trayecto == "") {
            $respuesta["validado"] = false;
        } else {
            $datosUsuario["trayecto"] = $trayecto;
        }

        if ($numKm == "" || $numKm < 0) {
            $respuesta["validado"] = false;
        } else {
            $datosUsuario["num_km"] = $numKm;
        }

        if ($concepto == "") {
            $respuesta["validado"] = false;
        } else {
            $datosUsuario["concepto"] = $concepto;
        }

        if ($respuesta["validado"] == false) {
            $respuesta["mensaje"] = "Se ha producido un error con la validación de los campos\nRevíselos, por favor";
            echo json_encode($respuesta);
        } else {
            Consultas::introducirRegistro($datosUsuario);
            $respuesta["mensaje"] = "Registro almacenado con éxito";
            echo json_encode($respuesta);
        }
    }