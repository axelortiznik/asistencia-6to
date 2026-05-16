
    // REEMPLAZÁ ESTA URL CON LA QUE TE DIO GOOGLE APPS SCRIPT EN EL PASO 3
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwrKCldS__kwMGCLUJqzNMIXSbVMvtRkuUqHFS2TQ3MemIhG_Yn4FB3qIeHTCUCUxnt/exec";

    document.getElementById('attendanceForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que la página se recargue
        
        const btn = document.getElementById('btnSubmit');
        const msgDiv = document.getElementById('responseMessage');
        
        // Bloquear el botón mientras carga para evitar doble clic
        btn.disabled = true;
        btn.innerText = "Enviando...";
        msgDiv.className = "message";
        msgDiv.style.display = "none";

        // Capturar los valores del formulario
        const payload = {
            nombre: document.getElementById('studentName').value,
            pc: document.getElementById('pcNumber').value,
            codigo: document.getElementById('validationCode').value
        };

        // Enviar datos al backend de Google
        fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Evita problemas de CORS con Google Scripts
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            // Como usamos 'no-cors', no podemos leer la respuesta JSON directamente,
            // pero si entra acá significa que el servidor web de Google recibió los datos.
            msgDiv.innerText = "¡Procesado! Revisá con el profesor si figura tu presente.";
            msgDiv.classList.add('success');
            document.getElementById('attendanceForm').reset();
        })
        .catch(error => {
            msgDiv.innerText = "Error de conexión. Intentá de nuevo.";
            msgDiv.classList.add('error');
            console.error(error);
        })
        .finally(() => {
            btn.disabled = false;
            btn.innerText = "Registrar Presente";
        });
    });