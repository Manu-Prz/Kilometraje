<head>
    <script src="../anhadir/script/script.js"></script>
    <link rel="stylesheet" href="../anhadir/style/style.css">
    
</head>
<form action="" method="POST" id="formularioRegistro" class="w-100 d-flex flex-column justify-content-center bg-body-tertiary p-3 border rounded">
    <div class="form-floating mb-2">
        <input type="date" name="fecha" id="fecha" class="form-control" required>
        <label for="fecha">Fecha del desplazamiento</label>
    </div>
    <div class="form-floating mb-2">
        <input type="text" name="destino" id="destino" class="form-control" required>
        <label for="destino">Destino</label>
    </div>
    <div class="form-floating mb-2">
        <input type="number" name="numKm" id="numKm" class="form-control" min="0" required>
        <label for="numKm">Nº de kilómetros</label>
    </div>

    <div class="input-group mb-3">
        <div class="form-floating">
            <select name="trayecto" id="trayecto" class="form-select h-100" required>
                <option value="Ida">Ida</option>
                <option value="Vuelta">Vuelta</option>
                <option value="Ida y vuelta" selected>Ida y vuelta</option>
            </select>
            <label for="trayecto">Tipo de trayecto</label>
        </div>
    </div>
    <div class="form-floating mb-3">
        <textarea class="form-control" placeholder="" id="concepto"></textarea>
        <label for="concepto">Concepto</label>
    </div>
    <div class="d-flex justify-content-start mb-2">
        <div class="w-50 d-flex flex-column flex-md-row justify-content-around w-100">
            <button type="submit" class="btn btn-primary w-100 me-md-5">Registrar</button>
            <button type="reset" class="btn btn-warning w-100">Reset</button>
        </div>
    </div>
</form>