<?php
    include_once("../Model/Conexion.php");
    include_once("../Model/Consultas.php");

    if (isset($_POST["listar"])) {
        if (isset($_POST["todos"])) {
            echo json_encode(Consultas::listarTodos());
        }
    }

    